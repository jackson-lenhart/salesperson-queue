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

app.get("/appointments-today", (req, res) => {
  let todaysDate = parsableDate(new Date());
  let options = {
    qs: {
      max: 100,
      minDate: todaysDate,
      maxDate: todaysDate
    }
  };
  acuityRequest("appointments", options)
    .then(appts => res.json(appts))
    .catch(err => console.error(err));
});

app.get("/calendars", (req, res) => {
  acuityRequest("/calendars")
    .then(cs => {
      res.json(cs);
    })
    .catch(err => console.error(err));
});
