const weekDay = document.getElementById('day-week');
const dateHome = document.getElementById('date-home');
const clockHome = document.getElementById('clock-day');

const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

function getCurrentDate() {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function getCurrentTime() {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

function getCurrentDay() {
    return daysOfWeek[new Date().getDay()];
}

function updateClock() {
    dateHome.textContent = getCurrentDate();
    weekDay.textContent = getCurrentDay();
    clockHome.textContent = getCurrentTime();
}

setInterval(updateClock, 1000);
