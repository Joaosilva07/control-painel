const dialogPoint = document.getElementById('dialog-point');
const openDialogButton = document.getElementById('home-page-button');
const closeDialogButton = document.getElementById('close-dialog-button');
const dialogD = document.getElementById('dialog-date');
const dialogH= document.getElementById('dialog-clock');

openDialogButton.addEventListener('click', () => {
    dialogD.textContent = getCurrentDate();
    dialogH.textContent = updateDialogClock();
    dialogPoint.showModal();
});

closeDialogButton.addEventListener('click', () => {
    dialogPoint.close();
});

function updateDialogClock(){
    dialogH.textContent = getCurrentTime();
}

setInterval(updateDialogClock, 1000);


function registerPonto(){}

