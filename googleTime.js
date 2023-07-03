const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3330;
const googleUrl = 'https://www.google.com/search?q=time';

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);
    const googleTime = $('div.sL6Rbf').text().replace(/\(IST\).*/, '').trim();
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false, hour: 'numeric', minute: 'numeric' });

    res.json({ googleTime, currentTime });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
