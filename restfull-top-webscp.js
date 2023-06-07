const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3330;

app.get('/:num', async (req, res) => {
  try {
    const num = req.params.num;
    const response = await axios.get(`https://www.confirmtkt.com/train-running-status/${num}`);
    const modifiedData = modifyJSON(response.data); // Call a function to modify the JSON data
    res.json(modifiedData); // Send the modified JSON as the response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Function to modify the JSON data
function modifyJSON(data) {
  const modifiedData = {
    modified: true,
    divCount: 0,
    title: '',
    station: []
  };

  // Parse the HTML response using Cheerio
  const $ = cheerio.load(data);
  $('.circle.blink').each((index, element) => {
    const stationName = $(element).next('.rs__station-name').text();
    modifiedData.station.push(stationName);

    const col2 = $(element).parent().nextAll('.col-xs-2');
    const col2Text = col2.map((index, el) => $(el).text().trim()).get().join(' ');

    modifiedData.divCount = $('div').length;
    modifiedData.title = col2Text;
  });

  return modifiedData;
}
