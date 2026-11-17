
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

module.exports = app;
