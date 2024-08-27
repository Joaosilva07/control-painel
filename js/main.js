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

if (navigator.language == "en-US"){
    
    dateHome.textContent = americanDateFormat();
    clockHome.textContent = getCurrentTime();
    weekDay.textContent = getCurrentDay();
    
} else {
    dateHome.textContent = getCurrentDate();
    clockHome.textContent = getCurrentTime();
    weekDay.textContent = getCurrentDay();
}

    