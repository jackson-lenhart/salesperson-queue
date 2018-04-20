"use strict";

const express = require("express");
const { jsonParser } = require("body-parser");
const Acuity = require("acuityscheduling");

const app = express();

app.listen(3000, () => console.log("Listening on port 3000"));
