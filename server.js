const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: "Hello from CI/CD Demo!"
    }));
    return;
  }

  // Added in the second change
  if (req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: "healthy",
      timestamp: new Date().toISOString()
    }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    error: "Not Found"
  }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = server;