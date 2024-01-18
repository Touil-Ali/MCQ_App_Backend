// backend/src/server.js
const app = require("./app");
const config = require("./config");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
