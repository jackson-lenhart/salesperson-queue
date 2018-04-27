"use strict";

module.exports = (acuity, endpoint) => {
  return new Promise((resolve, reject) => {
    acuity.request(endpoint, (err, res, data) => {
      if (err)
        reject(err);
      resolve(data);
    });
  });
};
