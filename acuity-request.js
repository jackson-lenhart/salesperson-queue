"use strict";

const Acuity = require("acuityscheduling");

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USERID,
  apiKey: process.env.ACUITY_APIKEY
});

module.exports = (endpoint, options) => {
  return new Promise((resolve, reject) => {
    acuity.request(endpoint, options, (err, res, data) => {
      if (err)
        reject(err);
      resolve(data);
    });
  });
};
