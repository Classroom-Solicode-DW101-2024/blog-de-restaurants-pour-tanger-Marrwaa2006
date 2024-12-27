 const apiUrl = 'http://localhost:3000/restaurants'; 
let currentEditingRestaurant = null;

function fetchRestaurants(query = '') {
    fetch('http://localhost:3000')
        .then(response => response.json())
        .then(data => {
            const restaurantsList = document.getElementById('list');
            restaurantsList.innerHTML = '';

            data.forEach(restaurant => {
                const card = document.createElement('div');
                card.className = 'restaurantCards';
                card.innerHTML = `
                    <img src="${restaurant.cover}" alt="${restaurant.name}">
                    <h2>${restaurant.name}</h2>
                     <a href="${restaurant.contact}"><p>Contact: ${restaurant.contact}</p></a>
                    <p><strong>Address:</strong> ${restaurant.address}</p>
                    <p><strong>Type:</strong> ${restaurant.specialty}</p>
                    <p><strong>Rating:</strong> ${restaurant.rating}</p>
                    <button onclick="editRestaurant('${restaurant.name}')">Edit</button>
                    <button onclick="deleteRestaurant('${restaurant.name}')">Delete</button>
                `;
                restaurantsList.appendChild(card);
            });
        });
}

function editRestaurant(name) {
    fetch(`${apiUrl}/${name}`)
        .then(response => response.json())
        .then(restaurant => {
            document.getElementById('form-title').innerText = 'Update Restaurant';
            document.getElementById('name').value = restaurant.name;
            document.getElementById('address').value = restaurant.address;
            document.getElementById('contact').value = restaurant.contact;
            document.getElementById('specialty').value = restaurant.specialty;
            document.getElementById('rating').value = restaurant.rating;
            document.getElementById('cover').value = restaurant.cover;
            document.getElementById('submit-button').innerText = 'Update Restaurant';
            currentEditingRestaurant = restaurant;
        });
}

function deleteRestaurant(nom) {
    fetch(`${apiUrl}/${nom}`, {
        method: 'DELETE'
    })
    .then(() => fetchRestaurants())
    .catch(error => console.log('Error deleting restaurant:', error));
}

document.getElementById('restaurant-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const restaurantData = {
        name: document.getElementById('name').value,
        adress: document.getElementById('address').value,
        contact: document.getElementById('contact').value,
        specialty: document.getElementById('specialty').value,
        rating: document.getElementById('rating').value,
        cover: document.getElementById('cover').value
    };

    const method = currentEditingRestaurant ? 'PUT' : 'POST';
    const url = currentEditingRestaurant ? `${apiUrl}/${currentEditingRestaurant.name}` : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurantData)
    })
    .then(() => {
        fetchRestaurants();
        resetForm();
    })
    .catch(error => console.log('Error saving restaurant:', error));
});

function resetForm() {
    document.getElementById('restaurant-form').reset();
    document.getElementById('form-title').innerText = 'Add New Restaurant';
    document.getElementById('submit-button').innerText = 'Add Restaurant';
    currentEditingRestaurant = null;
}

fetchRestaurants();
function search() {
    const inputSearch = document.getElementById('inputSearch').value.toLowerCase();
    const section = document.querySelector('.sectionSearch');
    const content = document.querySelector('.container');
    const restaurantsList = document.getElementById('list');
    restaurantsList.innerHTML = '';
    content.innerHTML = '';
    section.innerHTML = '';

    if (!inputSearch) {
        section.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    fetch('http://localhost:3000')
        .then(response => response.json())
        .then(restaurants => {
            const filteredRestaurants = restaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(inputSearch.toLowerCase())
            );
            
            if (filteredRestaurants.length === 0) {
                section.innerHTML = '<p>No restaurants found.</p>';
                return;
            }

            filteredRestaurants.forEach((restaurant, index)  => {
                const restDiv = document.createElement('div');
               
                restDiv.className = "restaurantCards";
                restDiv.innerHTML = `
            <img src="${restaurant.cover}" alt="${restaurant.name}">
            <h2>${restaurant.name}</h2>
            <a href="${restaurant.contact}"><p>Contact: ${restaurant.contact}</p></a>
            <p><strong>Address:</strong> ${restaurant.address}</p>
            <p><strong>Type:</strong> ${restaurant.specialty}</p>
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
            <button onclick="editRestaurant('${restaurant.name}')">Edit</button>
            <button onclick="deleteRestaurant('${restaurant.name}')">Delete</button> 
            <input type="hidden" value="${index}">
                `;
               return restaurantsList.appendChild(restDiv);
            });
        })
        .catch(error => {
            console.log('Error fetching restaurants:', error);
            section.innerHTML = '<p>Error fetching restaurants.</p>';
        });
}

fetchRestaurants();