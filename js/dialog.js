document.addEventListener('DOMContentLoaded', () => {
    const openDialogButton = document.getElementById('home-page-button');
    const dialogPoint = document.getElementById('dialog-point');
    const closeDialogButton = document.getElementById('close-dialog-button');
    const dialogD = document.getElementById('dialog-date');
    const dialogH = document.getElementById('dialog-clock');

    // Abre o diálogo ao clicar no botão "Bater Ponto"
    openDialogButton.addEventListener('click', () => {
        dialogD.textContent = getCurrentDate();
        dialogH.textContent = getCurrentTime();
        dialogPoint.showModal();
    });

    // Fecha o diálogo
    closeDialogButton.addEventListener('click', () => {
        dialogPoint.close();
    });

    // Atualiza o relógio no diálogo
    setInterval(() => {
        dialogH.textContent = getCurrentTime();
    }, 1000);
});

function getCurrentDate() {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function getCurrentTime() {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}
