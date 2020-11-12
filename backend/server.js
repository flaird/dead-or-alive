const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');

const config = {
  name: 'dead-or-alive',
  port: 1337,
  host: '0.0.0.0',
};

const app = express();

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  console.log('Processing request for: ' + req.body.url + ' ...');
  const url = req.body.url;

  let isHttp = false;
  if (url.includes('http://')) {
    isHttp = true;
  } else if (url.includes('https://')) {
    isHttp = false;
  } else {
    throw new Error('Invalid HTTP protocol');
  }

  let alive = false;

  if (isHttp) {
    console.log('Protocol verified: HTTP');
    http
      .get(url, (res) => {
        const { statusCode } = res;
        console.log('Received status code: ' + statusCode);
        alive = verifyStatusCode(statusCode);
        res.resume();
      })
      .on('error', (e) => {
        console.log('Backend: GET failed on host ' + url);
      });
    res.json({ alive: alive });
  } else {
    console.log('Protocol verified: HTTPS');
    https
      .get(url, (res) => {
        const { statusCode } = res;
        console.log('Received status code: ' + statusCode);
        alive = verifyStatusCode(statusCode);
        res.resume();
      })
      .on('error', (e) => {
        console.log('Backend: GET failed on host ' + url);
      });
    res.json({ alive: alive });
  }
});

const verifyStatusCode = (statusCode) => {
  if (statusCode !== 200 || statusCode !== 201) {
    return false;
  }
  return true;
};

app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  console.log('Dead or Alive backend running on port ' + config.port);
});
