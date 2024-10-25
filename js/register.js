document.addEventListener('DOMContentLoaded', () => {
    const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");

    // Evento para criar um novo registro
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

    displayHistory();
});

// Funções utilitárias
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

function updateRegisterLocalStorage(index, updatedRegister) {
    const registers = getRegisterLocalStorage();
    registers[index] = updatedRegister; // Atualiza o registro com o novo conteúdo
    localStorage.setItem("register", JSON.stringify(registers));
}

function displayHistory() {
    const historyElement = document.getElementById('register-history');
    historyElement.innerHTML = ""; 

    const registerLocalStorage = getRegisterLocalStorage();
    registerLocalStorage.forEach((register, index) => {
        const historyItem = document.createElement('div');
        historyItem.innerHTML = `
            <p>${register.tipo} em ${register.data}, às ${register.hora}</p>
            <button class="edit-btn" data-index="${index}">Editar</button>
            <button class="delete-btn" data-index="${index}">Excluir</button>
        `;
        historyElement.appendChild(historyItem);
    });

    // Eventos de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            openEditDialog(index); // Abre o diálogo de edição
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            deleteRegisterLocalStorage(index); // Exclui o registro
            displayHistory(); // Atualiza o histórico após a exclusão
        });
    });
}

function deleteRegisterLocalStorage(index) {
    const registers = getRegisterLocalStorage();
    registers.splice(index, 1); // Remove o registro do array
    localStorage.setItem("register", JSON.stringify(registers));
}

// Função para abrir o diálogo de edição
function openEditDialog(index) {
    const registers = getRegisterLocalStorage();
    const register = registers[index];

    // Preenche os campos com os dados do registro selecionado
    document.getElementById("edit-tipos-ponto").value = register.tipo;
    document.getElementById("edit-register-date").value = register.data;
    document.getElementById("edit-comentario").value = register.comentario;

    // Abre o diálogo de edição
    const editDialog = document.getElementById('dialog-edit-point');
    editDialog.showModal();

    // Salva a edição
    document.getElementById("btn-save-edit").onclick = () => {
        const updatedRegister = {
            data: document.getElementById("edit-register-date").value,
            hora: register.hora,
            localizacao: register.localizacao,
            tipo: document.getElementById("edit-tipos-ponto").value,
            comentario: document.getElementById("edit-comentario").value,
            arquivo: register.arquivo
        };

        updateRegisterLocalStorage(index, updatedRegister);
        displayHistory(); // Atualiza o histórico após a edição
        editDialog.close(); // Fecha o diálogo após salvar
    };
}

function getCurrentDate() {
    const date = new Date();
    return date.toISOString().split('T')[0];
}

function getCurrentTime() {
    const date = new Date();
    return date.toTimeString().split(' ')[0];
}
