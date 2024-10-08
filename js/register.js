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

function editRegister(index, tipoElement, dateElement) {
    var registers = getRegisterLocalStorage();
    var register = registers[index];

    var newTipo = prompt("Enter a new tipo:", register.tipo);
    if (newTipo) {
        register.tipo = newTipo;
        tipoElement.textContent = newTipo;
    }

    var newDate = prompt("Enter a new date:", register.data);
    if (newDate) {
        register.data = newDate;
        dateElement.textContent = newDate;
    }

    registers[index] = register;
    localStorage.setItem("register", JSON.stringify(registers));
}
function displayHistory() {
    var registers = getRegisterLocalStorage();
    var historyElement = document.getElementById('register-history');

    while (historyElement.firstChild) {
        historyElement.removeChild(historyElement.firstChild);
    }
    registers.reverse();

    for (var i = 0; i < registers.length; i++) {
        var historyItem = document.createElement('div');
        
        var tipo = document.createElement('span');
        tipo.textContent = formatRegisterType(registers[i].tipo === registers.tipo ? localStorage.getItem("lastTypeRegister") : registers[i].tipo);
        var time = document.createElement('span');
        time.textContent = registers[i].hora;
        var date = document.createElement('span');
        date.textContent = registers[i].data;
        var text = document.createElement('p'); 
        text.textContent = `${tipo.textContent} às ${time.textContent} no dia ${date.textContent}`;
        
       
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            editRegister(i, tipo, date); 
        });

        historyItem.appendChild(text);
        historyItem.appendChild(editButton);
        historyElement.appendChild(historyItem);
    }
}
document.getElementById('home-page-button').addEventListener('click', displayHistory);

displayHistory();