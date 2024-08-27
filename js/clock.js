const weekDay = document.getElementById('day-week');
const dateHome = document.getElementById('date-home');
const clockHome = document.getElementById('clock-day');

const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

function getCurrentDate(){
    const date = new Date();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function getCurrentTime(){
    const date = new Date();
    if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes() + ":" + date.getSeconds();
    } if (date.getSeconds() < 10) {
        return date.getHours() + ":" + date.getMinutes() + ":0" + date.getSeconds();        
    }
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function getCurrentDay(){
    const date = new Date();
    return daysOfWeek[date.getDay()];
}

function americanDateFormat(){
    const date = new Date();
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

if (navigator.language == "en-US") {
    dateHome.textContent = americanDateFormat();
    weekDay.textContent = getCurrentDay();

}else{

dateHome.textContent = getCurrentDate();
weekDay.textContent = getCurrentDay();

}

function updateClock(){
    clockHome.textContent = getCurrentTime();

}

setInterval(updateClock, 1000);



