import 'dotenv/config'
import Acuity from 'acuityscheduling'

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USERID,
  apiKey: process.env.ACUITY_APIKEY
})

export default (endpoint, options) =>
  new Promise((resolve, reject) =>
    acuity.request(endpoint, options, (err, res, data) =>
      err ? reject(err) : resolve(data)))
