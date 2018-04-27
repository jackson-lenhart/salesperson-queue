"use strict";

const express = require("express");
const { jsonParser } = require("body-parser");
const Acuity = require("acuityscheduling");

const { userId, apiKey } = require("./api-credentials");
const parsableDate = require("./parsable-date");
const acuityRequest = require("./acuity-request");

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

app.get("/startday", async (req, res) => {
  let calendars = await acuityRequest(acuity, "/calendars");
  calendars = calendars.filter(x => x.id !== 1874294);
  let todaysDate = parsableDate(new Date());
  let workingToday = [];
  let offToday = [];
  for (let c of calendars) {
    let times;
    if (c.id === 2061897) {
      times = await acuityRequest(
        acuity,
        `/availability/times?date=${todaysDate}&appointmentTypeID=6229043&calendarID=${c.id}&timezone=America%2FNew_York`
      );
    } else {
      times = await acuityRequest(
        acuity,
        `/availability/times?date=${todaysDate}&appointmentTypeID=6078595&calendarID=${c.id}&timezone=America%2FNew_York`
      );
    }
    let data = {
      id: c.id,
      name: c.name
    };
    if (times.length === 0) {
      offToday.push(data);
    } else {
      workingToday.push(data);
    }
  }
  res.json({
    workingToday,
    offToday
  });
});
