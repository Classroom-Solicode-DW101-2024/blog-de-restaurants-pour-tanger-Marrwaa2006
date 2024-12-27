const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const fetch = require('node-fetch');  

app.use(express.json());
const cors = require('cors'); 
app.use(cors());
let restaurants = require('./data.json');


function saveData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
  res.json(restaurants);
});

app.get('/restaurants/:name', (req, res) => {
  const restaurant = restaurants.find(r => r.name === req.params.name);
  if (!restaurant) return res.status(404).send('Restaurant not found');
  res.json(restaurant);
});

app.post('/restaurants', (req, res) => {
  const newRestaurant = {
    id: restaurants.length + 1,
    name: req.body.name,
    address: req.body.address || "Non spécifiée",
    specialty: req.body.specialty || "Non spécifiée",
    ranking: req.body.ranking || null,
    review: req.body.review || null,
    contact: req.body.contact || null,
    cover: req.body.cover || null,
    pic: req.body.pic || null, 
  };
  restaurants.push(newRestaurant);
  saveData(restaurants);
  res.status(201).json(newRestaurant);
});


app.put('/restaurants/:name', (req, res) => {
  const restaurant = restaurants.find(r => r.name === req.params.name);
  if (!restaurant) return res.status(404).send('Restaurant not found');

  restaurant.name = req.body.name || restaurant.name;
  restaurant.adress = req.body.adress || restaurant.adress;
  restaurant.specialty = req.body.specialty || restaurant.specialty;
  restaurant.ranking = req.body.ranking || restaurant.ranking;
  restaurant.review = req.body.review || restaurant.review;
  restaurant.contact = req.body.contact || restaurant.contact;
  restaurant.cover = req.body.cover || restaurant.cover;
  restaurant.pic = req.body.pic || restaurant.pic;
  saveData(restaurants);
  res.json(restaurant);
});

app.delete('/restaurants/:name', (req, res) => {
  const index = restaurants.findIndex(r => r.name === req.params.name);
  if (index === -1) return res.status(404).send('Restaurant not found');

  restaurants.splice(index, 1);
  saveData(restaurants);
  res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

async function getData() {
  try {
    const response = await fetch('http://localhost:3000/restaurants');
    const data = await response.json();
    console.log("Fetched data:", data); 

    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

app.get('/fetch-restaurants', async (req, res) => {
  const data = await getData();
  if (data) {
    res.json(data); 
  } else {
    res.status(500).send('Failed to fetch restaurants');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});