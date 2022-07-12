const floatingButton = document.querySelector('.floating-btn');
const closeButton = document.querySelector('.close-btn');
const socialPanelContainer = document.querySelector('.social-panel-container');

floatingButton.addEventListener('click', () => {
    socialPanelContainer.classList.toggle('visible');
});

closeButton.addEventListener('click', () => {
    socialPanelContainer.classList.remove('visible');
});
