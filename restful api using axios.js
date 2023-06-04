const axios = require('axios');
const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const username = response.data[2]?.username || 'N/A';
    res.send(`Username: ${username}`);
  } catch (error) {
    res.status(500).send('Error occurred');
  }
});

app.listen(3330, () => console.log('Server started on port 3330'));
