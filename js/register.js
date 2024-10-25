document.addEventListener('DOMContentLoaded', () => {
    const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");

    btnDialogBaterPonto.addEventListener("click", async () => {
        const typeRegister = document.getElementById("tipos-ponto").value;
        const selectedDate = document.getElementById("register-date").value || getCurrentDate();
        const comentario = document.getElementById("comentario").value;
        const uploadArquivo = document.getElementById("upload-arquivo").files[0];
        let position = await getCurrentPosition();

        const ponto = {
            data: selectedDate,
            hora: getCurrentTime(),
            localizacao: position.coords ? `${position.coords.latitude}, ${position.coords.longitude}` : "Posição não disponível",
            tipo: typeRegister,
            comentario: comentario,
            arquivo: uploadArquivo ? uploadArquivo.name : null
        };

        if (new Date(ponto.data) > new Date()) {
            alert("Não é permitido registrar ponto em data futura.");
            return;
        }

        saveRegisterLocalStorage(ponto);
        displayHistory();

        // Exibe o alerta de sucesso
        const alertElement = document.getElementById('alert');
        alertElement.classList.add('show');
        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 3000);

        // Fecha o diálogo após o registro
        document.getElementById('dialog-point').close();
    });
});

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function getRegisterLocalStorage() {
    return JSON.parse(localStorage.getItem("register")) || [];
}

function saveRegisterLocalStorage(register) {
    const registers = getRegisterLocalStorage();
    registers.push(register);
    localStorage.setItem("register", JSON.stringify(registers));
}

function displayHistory() {
    const historyElement = document.getElementById('register-history');
    historyElement.innerHTML = ""; 

    const registerLocalStorage = getRegisterLocalStorage();
    registerLocalStorage.forEach((register) => {
        const historyItem = document.createElement('div');
        historyItem.innerHTML = `<p>${register.tipo} em ${register.data}, às ${register.hora}</p>`;
        historyElement.appendChild(historyItem);
    });
}