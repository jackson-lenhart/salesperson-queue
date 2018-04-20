"use strict";

const express = require("express");
const { jsonParser } = require("body-parser");
const Acuity = require("acuityscheduling");

const { userId, apiKey } = require("./api-credentials");

const app = express();
const acuity = Acuity.basic({
  userId,
  apiKey
});

app.listen(3000, () => console.log("Listening on port 3000"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/salespeople", (req, res) => {
  acuity.request("calendars", (err, _res, calendars) => {
    if (err) {
      console.error(err);
    }

    res.json(calendars);
  });
});
