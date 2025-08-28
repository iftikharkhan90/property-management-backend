const express = require("express");
const mongoose = require("mongoose");
const mainRoutes = require("./api-routes/index");
const { creatUser } = require("./Module/user/controller");
require("dotenv").config(); 

const app = express();
app.use(express.json())

const connection = process.env.DB_CONNECTION;
mongoose
  .connect(connection)
  .then(async () => {
    console.log("DB is runing");
    await creatUser();
  })
  .catch((err) => console.log("An err in DB runing" + err));

const Api = process.env.MAIN_API_ROUTE;
app.use(Api, mainRoutes);

const Port = process.env.PORT;
app.listen(Port, console.log("Server is runing"));
