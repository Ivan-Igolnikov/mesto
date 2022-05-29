// Открыть и закрыть popup

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popUpTitle = document.querySelector('.popup__title');
let popUpSubtitle = document.querySelector('.popup__subtitle');
let formPopup = document.querySelector('.popup__container')


function openPopup() {
  popup.classList.add('popup-opened');
  popUpTitle.value = profileTitle.textContent
  popUpSubtitle.value = profileSubtitle.textContent
}

function closePopup() {
  popup.classList.remove('popup-opened');
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = popUpTitle.value
    profileSubtitle.textContent = popUpSubtitle.value 
    closePopup()
}

formPopup.addEventListener('submit', formSubmitHandler);









