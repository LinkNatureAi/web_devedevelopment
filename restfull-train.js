const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/:num', (req, res) => {
  const num = req.params.num; // Get the value of 'num' from the request parameters

  request.get(`https://runningstatus.in/status/${num}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const trainName = $('.table-success').text().trim(); // Trim whitespace from trainName
      const data = {
        trainName: trainName
      };
      res.json(data);
    } else {
      res.status(500).send('Error retrieving data'); // Use a generic 500 status code for any error
    }
  });
});

app.listen(3330, () => console.log('Server started on port 3330'));
