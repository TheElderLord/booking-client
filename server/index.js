const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static("dist"));

// Handle SPA fallback after static and API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const appPort = 4000;
app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
