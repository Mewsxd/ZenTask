const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

app.listen(process.env.PORT || 8001, () => {
  console.log("Connected...");
});
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => console.error("Could not connect to DB, error ", err));
