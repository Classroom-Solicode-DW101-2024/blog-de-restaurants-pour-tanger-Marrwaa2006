const params = new URLSearchParams(window.location.search);
const name = params.get('name')
let section = document.getElementsByClassName('cards')[0];

function detail(restaurant) {
  console.log(restaurant); 
  if (restaurant) {
    let restElement = document.createElement('div');
    restElement.className = "restodiv";

    restElement.innerHTML = `
      <img src="${restaurant.pic}" alt="${restaurant.name}">
      <div class="Div">
      <h2>${restaurant.name}</h2>
      <p>${restaurant.specialty}</p>
      <p>Rating: ${restaurant.rating}</p>
      <a href="${restaurant.contact}"><p>Contact: ${restaurant.contact}</p></a>
      <p>Some reviews: ${restaurant.review}</p>
      </div>
    `;

    section.appendChild(restElement);
  } else {
    section.innerHTML = '<p>Failed to load restaurant details.</p>';
  }
}
async function getData(name) {
    try {
      const response = await fetch('http://localhost:3000/restaurants/'+name);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      restaurants = await response.json(); 
      detail(restaurants);
    } catch (error) {
      console.error('Error fetching data:', error);
      document.querySelector('.container').innerHTML = '<p>Failed to load restaurant data.</p>';
    }
  }
getData(name);