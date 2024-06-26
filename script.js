function getWeather() {
    const apiKey = 'd855b2bb6ca56e1f0e5e85b2f1b6788a';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const currentWeatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    //error handling for faiiled api requests
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {displayWeather(data);
    }).catch(error => {
        console.error('Error fetching live weather data', error);
        alert('Failed to fetch live weather data. Please try again.');
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching forecast data', error);
        alert('Failed to fetch forecast data. Please try again.');
    });
}

    function displayWeather(data) {
        const tempDivInfo = document.getElementById('temp-div');
        const weatherInfoDiv = document.getElementById('weather-info');
        const weatherIcon = document.getElementById('weather-icon');
        const hourlyForecastDiv = document.getElementById('hourly-forecast');

        //clearing all previous data for new display
        weatherInfoDiv.innerHTML = '';
        hourlyForecastDiv.innerHTML = '';
        tempDivInfo.innerHTML = '';

        if (data.cod=='404') {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            const cityName = data.name;
            const temp = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

            const temperatureHTML = `<p>${temp}°C</p>`;
            const weatherHTML = `<p>${cityName}</p>
            <p>${description}</p>`;

            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHTML;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;
            
            showImage();
        }
    }

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(element => {
        const dateTime = new Date(element.dt * 1000);
        const hour = dateTime.getHours();
        const temp = Math.round(element.main.temp - 273.15);
        const iconCode = element.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
        <div class="hourly-item">
            <p>${hour}:00</p>
            <img src="${iconUrl}" alt="Weather icon">
            <span>${temp}°C</span>
            </div>`;
            hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}