const express = require("express");
const mongoose = require("mongoose");
const mainRoutes = require("./api-routes/index");
const { creatadminUser } = require("./Module/user/controller");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);  

const connection = process.env.DB_CONNECTION;
mongoose.connect(connection).then(async () => {
  console.log("Db is connect")
  await creatadminUser();
});
const Api = process.env.MAIN_API_ROUTE;
app.use("/api", mainRoutes);

const Port = process.env.PORT;
app.listen(Port,console.log("Server is runung"));
