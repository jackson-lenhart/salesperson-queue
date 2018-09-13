import express from 'express';
import { jsonParser } from 'body-parser';

import parsableDate from './parsable-date';
import acuityRequest from './acuity-request';

const app = express()

app.listen(3000, () => console.log('Listening on port 3000'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});

app.get('/api/appointments-today', (req, res) => {
  const todaysDate = parsableDate(new Date())
  const options = {
    qs: {
      max: 100,
      minDate: todaysDate,
      maxDate: todaysDate
    }
  }
  acuityRequest('/appointments', options)
  .then(appts => res.json(appts))
  .catch(err => console.error(err));
});

app.get('/api/calendars', (req, res) => {
  acuityRequest('/calendars')
  .then(cs => res.json(cs))
  .catch(err => console.error(err))
});

// this is a placeholder. I want to write the backend service in python eventually
app.post('/api/customer-helped', (req, res) => {
  res.sendStatus(200);
});
