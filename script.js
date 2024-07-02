// Replace with your OpenWeatherMap API key
const apiKey = '56b3b15ba4cef9317244dd628b3b1330';

// Function to fetch weather data based on the location
async function getWeatherData(location) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Location not found: ${response.statusText}`);
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }
}

// Function to fetch weather data based on geographic coordinates
async function getWeatherDataByCoords(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Unable to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }
}

// Function to display weather data on the page
function displayWeatherData(data) {
    const weatherSection = document.getElementById('weather-section');
    weatherSection.innerHTML = `
        <div class="weather-info"><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
        <div class="weather-info"><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div class="weather-info"><strong>Conditions:</strong> ${data.weather[0].description}</div>
        <div class="weather-info"><strong>Humidity:</strong> ${data.main.humidity}%</div>
        <div class="weather-info"><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    `;
    weatherSection.style.display = 'block';
}

// Event listener for 'Get Weather' button
document.getElementById('fetch-weather').addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

// Event listener for 'Use My Location' button
document.getElementById('fetch-weather-location').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherDataByCoords(lat, lon);
            },
            error => {
                console.error('Error getting geolocation:', error);
                alert('Unable to retrieve your location.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
