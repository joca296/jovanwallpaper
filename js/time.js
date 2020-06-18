setInterval(() => {
    let hour = document.querySelector("#hour");
    let minute = document.querySelector("#minute");
    let second = document.querySelector("#second");
    let fullDate = document.querySelector("#full-date");

    date = new Date();

    let curHour = date.getHours();
    let curMinute = date.getMinutes();
    let curSecond = date.getSeconds();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    hour.innerHTML = curHour<10 ? `0${curHour}` : curHour;
    minute.innerHTML = curMinute<10 ? `0${curMinute}` : curMinute;
    second.innerHTML = curSecond<10 ? `0${curSecond}` : curSecond;
    fullDate.innerHTML = date.toLocaleDateString("en-US", options);
}, 1000);