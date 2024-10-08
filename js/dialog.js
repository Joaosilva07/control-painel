const dialogPoint = document.getElementById('dialog-point');
const openDialogButton = document.getElementById('home-page-button');
const closeDialogButton = document.getElementById('close-dialog-button');
const dialogD = document.getElementById('dialog-date');
const dialogH= document.getElementById('dialog-clock');
const DialogHistory = document.getElementById('register-history');

openDialogButton.addEventListener('click', () => {
    dialogD.textContent = getCurrentDate();
    dialogH.textContent = updateDialogClock();
    DialogHistory.textContent = displayHistory();
    dialogPoint.showModal();
});

closeDialogButton.addEventListener('click', () => {
    dialogPoint.close();
});

function updateDialogClock(){
    dialogH.textContent = getCurrentTime();
}

setInterval(updateDialogClock, 1000);




