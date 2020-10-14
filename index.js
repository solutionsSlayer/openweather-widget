let wheather = {};
let wheatherNextDays = [];
let count = 8;
let idCity = 3031582;
let cityIds = {
    paris: 2988507,
    london: 2643743,
    marseille: 2995469,
    lyon: 2996943
}
const key = 'c54c8121399da7efb404cb303ce7cef7';
const selectors = {
    day: document.querySelector('.date-dayname'),
    date: document.querySelector('.date-day'),
    location: document.querySelector('.location'),
    temp: document.querySelector('.weather-temp'),
    weatherDesc: document.querySelector('.weather-desc'),
    wind: document.querySelector('.value-wind'),
    humidity: document.querySelector('.value-humidity'),
    pressure: document.querySelector('.value-hpa'),
    locationBtn: document.querySelector('.location-button'),
    paris: document.getElementById('paris'),
    marseille: document.getElementById('marseille'),
    lyon: document.getElementById('lyon'),
    london: document.getElementById('london'),
    tabDays: {
        0: document.querySelector('.day1'),
        1: document.querySelector('.day2'),
        2: document.querySelector('.day3'),
        3: document.querySelector('.day4')
    }
}

async function getWeatherOfTheDay(url) {
    await fetch(url)
        .then( data => data.json())
        .then( data => {
            wheather = data
        })
        .catch(error => {
            console.error(error);
        });
}

async function getWeatherOfTheDays(url) {
    await fetch(url)
        .then( data => data.json())
        .then( data => {
            let tab = [];
            let count = 0;
            let check = [8, 16, 24, 32];
            res = data.list;
            for(const property of res) {
                count += 1;
                if (check.includes(count)) {
                    tab.push({ index: count, temp: property.main.temp });
                }
            }
            wheatherNextDays = tab;
        })
        .catch(error => {
            console.error(error);
        });
}

function fillText(selectors, wheather, bool) {
    if (bool) {
        selectors.date.textContent = `Heure: ${new Date().toLocaleTimeString(wheather.dt)}`;
        selectors.day.textContent = wheather.name;
        selectors.location.textContent = `longitude : ${wheather.coord.lon} -  latitude: ${wheather.coord.lat}`;
        selectors.temp.textContent = `${temp(false)}`;
        selectors.weatherDesc.textContent = wheather.weather[0].description;
        selectors.wind.textContent = `${wheather.wind.speed} %`;
        selectors.humidity.textContent = `${wheather.main.humidity} %`;
        selectors.pressure.textContent = `${wheather.main.pressure} hPa`;
    } else {
       for(const [key, value] of Object.entries(selectors.tabDays)) {
           value.textContent = temp(true, key);
       }
    }
}

async function getWeather(id, key, bool) {
    if (bool) {
        await getWeatherOfTheDay(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}`);
    } else {
        await getWeatherOfTheDays(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${key}`);
    }
    fillText(selectors, wheather, true);
    fillText(selectors, wheather, false);
}

function temp(bool, key) {
    let temp;
    if (bool) {
        temp = wheatherNextDays[key].temp;
    } else {
        temp = wheather.main.temp;
    }

    temp -= 273.15;
    return `${temp.toFixed()} °C`;
}

selectors.paris.addEventListener('click', () => {
    getWeather(cityIds.paris, key, true);
    getWeather(cityIds.paris, key, false);
});

selectors.marseille.addEventListener('click', () => {
    getWeather(cityIds.marseille, key, true);
    getWeather(cityIds.marseille, key, false);
});

selectors.lyon.addEventListener('click', () => {
    getWeather(cityIds.lyon, key, true);
    getWeather(cityIds.lyon, key, false);
});

selectors.london.addEventListener('click', () => {
    getWeather(cityIds.london, key, true);
    getWeather(cityIds.london, key, false);
});

getWeather(idCity, key, true);
getWeather(idCity, key, false);
