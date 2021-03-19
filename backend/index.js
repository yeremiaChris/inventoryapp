const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/api");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// middleware untuk cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// router
app.use("/api", router);
// middleware kalo ada error
app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

// connect database
mongoose.connect("mongodb://localhost/inventoryDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", () => {
  console.log("db is connected");
});
app.listen(process.env.port || 4000, () => {
  console.log("ada di port 4000");
});
