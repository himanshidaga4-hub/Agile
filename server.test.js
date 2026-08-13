const test = require("node:test");
const assert = require("node:assert");
const http = require("http");

const server = require("../src/server");

test("GET / returns success", async () => {
  await new Promise((resolve) => {
    server.listen(0, async () => {
      const port = server.address().port;

      http.get(`http://localhost:${port}/`, (res) => {
        assert.strictEqual(res.statusCode, 200);

        res.resume();
        res.on("end", () => {
          server.close();
          resolve();
        });
      });
    });
  });
});

test("GET /health returns healthy status", async () => {
  await new Promise((resolve) => {
    server.listen(0, async () => {
      const port = server.address().port;

      http.get(`http://localhost:${port}/health`, (res) => {
        assert.strictEqual(res.statusCode, 200);

        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          const response = JSON.parse(body);

          assert.strictEqual(response.status, "healthy");

          server.close();
          resolve();
        });
      });
    });
  });
});