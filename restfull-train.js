fix and shorter unnecessary remove modify
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
  request.get('https://runningstatus.in/status/06619', (error, response, body) => {
    if (response.statusCode === 200) {
      const $ = cheerio.load(body);
      const data = {
        // Modify the following lines to extract the desired data from the HTML
        // For example, let's assume we want to extract the train name
        trainName: $('.table-success').text()
      };
      res.json(data);
    } else {
      res.status(response.statusCode).send('Error retrieving data');
    }
  });
});

app.listen(3330, () => console.log('Server started on port 3330'));
