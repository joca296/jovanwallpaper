const env = {
    "accuWeatherApiKey" : "4Nag1SBt1HMQoXNrTPYmb775Z7XTsVdv"
}

function getLocation() {
    let ipAddress = "";
    let userLocation = {
        "key" : "",
        "location" : "",
        "region" : ""
    };
    
    $.ajax({
        type: "get",
        url: "https://www.cloudflare.com/cdn-cgi/trace",
        async : false,
        success: (response) => {
            ipAddress = response.match("ip=(.*)\n")[1];
        },
        error: (error) => {
            console.log(error);
        }
    });

    $.ajax({
        type: "get",
        url: "https://dataservice.accuweather.com/locations/v1/cities/ipaddress",
        async : false,
        data: {
            "q" : ipAddress,
            "apikey" : env.accuWeatherApiKey
        },
        dataType: "json",
        success: (response) => {
            userLocation.key = response.Key;
            userLocation.location = response.EnglishName;
            userLocation.region = response.Country.EnglishName;
        },
        error: (error) => {
            console.log(error);
        }
    });

    return userLocation;
}

function getFiveDayForecast (location) {
    let object;
    $.ajax({
        type: "get",
        url: `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}`,
        async : false,
        data: {
            "details" : false,
            "metric" : true,
            "apikey" : env.accuWeatherApiKey
        },
        dataType: "json",
        success: (response) => {
            object = response;
        },
        error: (error) => {
            console.log(error);
        }
    });
    return object;
}

function getCurrentConditions (location) {
    let object;
    $.ajax({
        type: "get",
        url: `https://dataservice.accuweather.com/currentconditions/v1/${location.key}`,
        async : false,
        data: {
            "details" : false,
            "language" : "en-us",
            "apikey" : env.accuWeatherApiKey
        },
        dataType: "json",
        success: (response) => {
            object = response[0];
        },
        error: (error) => {
            console.log(error);
        }
    });
    return object;
}

function displayCurrentConditions(location) {
    let conditions = getCurrentConditions(location);

    let mainElement = document.getElementById('current');
    mainElement.innerHTML = "";

    let temp = document.createElement('div');
    temp.className = "col";
    let tempH1 = document.createElement('h1');
    tempH1.id = "temp";
    tempH1.innerHTML = `${conditions.Temperature.Metric.Value}°C`;
    temp.appendChild(tempH1);

    let condition = document.createElement('div');
    condition.className = "col";
    let conditionP1 = document.createElement('p');
    conditionP1.id = "condition-1";
    conditionP1.innerHTML = conditions.WeatherText;
    condition.appendChild(conditionP1);

    mainElement.appendChild(temp);
    mainElement.appendChild(condition);
}

function displayThreeDayForecast (location) {
    let forecast = getFiveDayForecast(location).DailyForecasts;

    let mainElement = document.getElementById('three-days');
    mainElement.innerHTML = "";

    for (var i = 0; i < 3; i++) {
        let card = document.createElement('div');
        card.className = "col s4 weather-card";

        let dateP = document.createElement("p");
        dateP.className = "day";
        let date = new Date(forecast[i].EpochDate*1000);
        let day = date.getDate() < 10? `0${date.getDate()}` : date.getDate();
        let month = date.getMonth()+1 < 10? `0${date.getMonth()+1}` : date.getMonth()+1;
        dateP.innerHTML = `${day}.${month}`;

        let conditionP = document.createElement('p');
        conditionP.className = "condition-2";
        conditionP.innerHTML = forecast[i].Day.IconPhrase;

        let hiLoDiv = document.createElement('div');
        hiLoDiv.className = "hi-lo-temp";
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        p1.innerHTML = "HI";
        p2.innerHTML = `${forecast[i].Temperature.Maximum.Value}°C`;
        p3.innerHTML = "LO";
        p4.innerHTML = `${forecast[i].Temperature.Minimum.Value}°C`;
        hiLoDiv.appendChild(p1);
        hiLoDiv.appendChild(p2);
        hiLoDiv.appendChild(p3);
        hiLoDiv.appendChild(p4);

        card.appendChild(dateP);
        card.appendChild(conditionP);
        card.appendChild(hiLoDiv);

        mainElement.appendChild(card);
    }
}

function displayFullWeather(userLocation) {
    displayCurrentConditions(userLocation);
    displayThreeDayForecast(userLocation);

    document.getElementById("location-name").innerHTML = `${userLocation.location}, ${userLocation.region}`;
}

//let userLocation = getLocation();
let userLocation = {
    "key" : 298198,
    "location" : "Belgrade",
    "region" : "Serbia"
}

displayFullWeather(userLocation);
setInterval(() => {
    displayFullWeather(userLocation)
}, 1000*60*60*4);

document.getElementById('refresh-weather').addEventListener('click', () => {
    //userLocation = getLocation();
    displayFullWeather(userLocation);
});