const env = {
    "accuWeatherApiKey" : "5eDcugoouXgmJfzBs0IZ5TAy4TUog2OG"
}

function getFiveDayForecast () {
    let object;
    $.ajax({
        type: "get",
        url: "http://dataservice.accuweather.com/forecasts/v1/daily/5day/298198",
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

function getCurrentConditions () {
    let object;
    $.ajax({
        type: "get",
        url: "http://dataservice.accuweather.com/currentconditions/v1/298198",
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

function displayCurrentConditions() {
    let conditions = getCurrentConditions();

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

function displayThreeDayForecast () {
    let forecast = getFiveDayForecast().DailyForecasts;

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
        p2.innerHTML = `${forecast[0].Temperature.Maximum.Value}°C`;
        p3.innerHTML = "LO";
        p4.innerHTML = `${forecast[0].Temperature.Minimum.Value}°C`;
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

function displayFullWeather() {
    displayCurrentConditions();
    displayThreeDayForecast();
}

displayFullWeather();
setInterval(() => {
    displayFullWeather()
}, 1000*60*60*4);

document.getElementById('refresh-weather').addEventListener('click', () => {displayFullWeather()});