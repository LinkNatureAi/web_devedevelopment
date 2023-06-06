const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
const PORT = 3330;

app.get('/:num', (req, res) => {
  const num = req.params.num;
//          https://spotyourtrain.com/trainstatus?train=${num}         
  request.get(`https://runningstatus.in/status/${num}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const trainName = $('head').text().replace('Live Train Running Status', '').trim();
      const currentStation = $('.table-success').text().trim();
      const data = {
        Name: trainName,
        currentStation: currentStation
      };
      res.json(data);
    } else {
      res.status(500).send('Error retrieving data');
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
