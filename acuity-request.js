"use strict";

const Acuity = require("acuityscheduling");

const { userId, apiKey } = require("./api-credentials");

const acuity = Acuity.basic({
  userId,
  apiKey
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
