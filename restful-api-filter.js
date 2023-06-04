const express = require('express');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
  request.get('https://jsonplaceholder.typicode.com/users', (error, response, body) => {
    if (response.statusCode === 200) {
      const data = JSON.parse(body);
      const cities = data.map(user => user.address.city);
      res.send(`Cities: ${cities.join(', ')}`);
    } else {
      res.send('Error retrieving data');
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
