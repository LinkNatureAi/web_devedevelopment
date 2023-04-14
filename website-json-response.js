<!doctype html>
<html>
  <head>
    <title>Website-json-responce</title>
  </head>
  <body>
    <div id="city-list"></div>
    <script>
      const cityList = document.getElementById('city-list');
      setInterval(async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
        const cities = data.map(user => user.address.city);
        console.log(cities[0]);
        cityList.innerHTML = cities[1];
      }, 3000);
    </script>
  </body>
</html>
