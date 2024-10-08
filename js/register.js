let registerLocalStorage = getRegisterLocalStorage();

const dialogData = document.getElementById("dialog-date");
const dialogHora = document.getElementById("dialog-clock");

weekDay.textContent = getCurrentDate();
dateHome.textContent = getCurrentDate();

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", async () => {

    let typeRegister = document.getElementById("tipos-ponto").value;

    let position = await getCurrentPosition();

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentTime(),
        "localizacao": position,
        "id": 1,
        "tipo": typeRegister
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);
    displayHistory();

    localStorage.setItem("lastTypeRegister", typeRegister);

    const alertElement = document.getElementById('alert');
    const date = new Date();
    const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const yearString = `${date.getFullYear()}`;

    alertElement.textContent = `Ponto batido com sucesso! Data: ${dateString}, Hora: ${timeString}, Ano: ${yearString}`;
    alertElement.classList.add('show');

    setTimeout(() => {
        alertElement.classList.remove('show');
    }, 6000);
});


function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register);
    console.log('Saving to localStorage', registerLocalStorage);
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    console.log('Saved to localStorage');
}

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if(!registers) {
        return [];
    }

    return JSON.parse(registers);
}

function formatRegisterType(type) {
    
    let words = type.replace('_', ' ').split(' ');

    
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    
    return words.join(' ');
}

function displayHistory() {
    var registers = getRegisterLocalStorage();
    var historyElement = document.getElementById('register-history');

    while (historyElement.firstChild) {
        historyElement.removeChild(historyElement.firstChild);
    }
    registers.reverse();

    for (var i = 0; i < registers.length; i++) {
        var historyItem = document.createElement('p');
        
        var tipo = formatRegisterType(registers[i].tipo === registers.tipo ? localStorage.getItem("lastTypeRegister") : registers[i].tipo);
        var time = registers[i].hora;
        var date = registers[i].data;
        historyItem.textContent = `${tipo} às ${time} no dia ${date}`;
        

        historyItem.addEventListener('click', function() {
            
            
        });
        
        historyElement.appendChild(historyItem);
    }
}

document.getElementById('home-page-button').addEventListener('click', displayHistory);

displayHistory();