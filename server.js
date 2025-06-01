const mongoose = require("mongoose");
const  dotenv = require ("dotenv");
dotenv.config();

const app = require  ("./app.js");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database error:", err.message);
    process.exit(1);
  });
