const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3300;

app.get('/', async (req, res) => {
  try {
    const url = `https://www.google.com/search?q=18234+train+running+status`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const modifiedData = modifyJSON(data);
    res.json(modifiedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function modifyJSON(data) {
  const $ = cheerio.load(data);
  const trainName = $('div .ROYhg div').text().trim();
  const liveStatus = $('div.dK1Bub .rUtx7d').eq(1).text();
  const delayTime = $('div.Rjvkvf.MB86Dc').eq(1).text().trim();

  return { trainName, liveStatus, delayTime };
}
