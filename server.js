"use strict";

const express = require("express");
const { jsonParser } = require("body-parser");

const parsableDate = require("./parsable-date");
const acuityRequest = require("./acuity-request");

const app = express();

app.listen(3000, () => console.log("Listening on port 3000"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/appointments-today", async (req, res) => {
  let todaysDate = parsableDate(new Date());
  let options = {
    qs: {
      max: 100,
      minDate: todaysDate,
      maxDate: todaysDate
    }
  };
  let appts = await acuityRequest("appointments", options);
  res.json(appts);
});

app.get("/calendars", async (req, res) => {
  let calendars = await acuityRequest("/calendars");
  res.json(calendars);
});
