const dialogPoint = document.getElementById('dialog-point');
const openDialogButton = document.getElementById('home-page-button');
const closeDialogButton = document.getElementById('close-dialog-button');

openDialogButton.addEventListener('click', () => {
    dialogPoint.style.display = 'block';
});

closeDialogButton.addEventListener('click', () => {
    dialogPoint.style.display = 'none';
});
