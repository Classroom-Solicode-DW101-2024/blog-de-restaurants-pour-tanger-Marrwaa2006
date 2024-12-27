let restaurants = []; 

async function getData() {
  try {
    const response = await fetch('http://localhost:3000');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    restaurants = await response.json(); 
    display(restaurants);
  } catch (error) {
    console.error('Error fetching data:', error);
    document.querySelector('.container').innerHTML = '<p>Failed to load restaurant data.</p>';
  }
}

function display(restaurants) {
  const content = document.querySelector('.container');
  content.innerHTML = '';
  restaurants.forEach((restaurant, index) => {
    const rests = document.createElement('div');
    rests.className = 'rests';

    rests.innerHTML = `
        <img src="${restaurant.cover}" alt="${restaurant.name}">
        <h2>${restaurant.name}</h2>
        <p>${restaurant.specialty}</p>
        <p>Rating: ${restaurant.rating}</p>
        <p>Contact: ${restaurant.contact}</p>
        <button value="detail" onclick="window.location.href='details.html?name=${restaurant.name}'">Details</button>
        <input type="hidden" value="${index}">
    `;

    content.appendChild(rests);
  });
}

function search() {
  const inputSearch = document.getElementById('inputSearch').value.toLowerCase();
  const section = document.querySelector('.sectionSearch');
  const content = document.querySelector('.container');
  section.innerHTML = ''; 
  content.innerHTML = '';
  if (!inputSearch) {
    section.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(inputSearch)
  );

  if (filteredRestaurants.length === 0) {
    section.innerHTML = '<p>No restaurants found.</p>';
    return;
  }

  filteredRestaurants.forEach((restaurant, index) => {
    const restDiv = document.createElement('div');
    restDiv.className = "restsdiv";
    restDiv.innerHTML = `
        <img src="${restaurant.cover}" alt="${restaurant.name}">
        <h2>${restaurant.name}</h2>
        <p>${restaurant.specialty}</p>
        <p>Rating: ${restaurant.rating}</p>
        <p>Contact: ${restaurant.contact}</p>
        <button value="detail" onclick="window.location.href='details.html?name=${restaurant.name}'">Details</button>
        <input type="hidden" value="${index}">
    `;
    section.appendChild(restDiv);
  });
}

function detail(button){
    let index = button.parentElement.querySelector("input").value;
    window.location.href="details.html"
}
getData();