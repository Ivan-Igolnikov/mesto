// Модули

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// ДАННЫЕ

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// ОБЪЯВЛЕНИЯ

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#item-card').content;

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.add-popup');
const preview = document.querySelector('.preview');

const previewImage = document.querySelector('.preview__image');
const previewText = document.querySelector('.preview__text');

const buttonInfo = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonSubmitProfile = popupProfile.querySelector('.popup__submit');
const buttonSubmitAdd = popupAdd.querySelector('.popup__submit');

const formProfile = document.querySelector('.popup__container_profile');
const formAdd = document.querySelector('.popup__container_add');

const popupProfileMainInput = popupProfile.querySelector('.popup__main-input_profile');
const popupProfileAdditionalInput = popupProfile.querySelector('.popup__additional-input_profile');
const popupAddMainInput = popupAdd.querySelector('.popup__main-input_add');
const popupAddAdditionalInput = popupAdd.querySelector('.popup__additional-input_add');


// ФУНКЦИИ

// Вспомогательные

function clearForm(form) {
  form.reset();
}

function clickOverlayToQuit(e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
}

function pressEscToQuit(e) {
  if (e.key === 'Escape') {
    closePopup();
  };
}

function enableSubmitButton(button) {
  button.classList.remove(validationData.inactiveButtonClass);
  button.removeAttribute('disabled');
}

function disableSubmitButton(button) {
  button.classList.add(validationData.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function clearValidation(popup) {
  popup.querySelectorAll(validationData.inputSelector).forEach((input) => {  
    input.classList.remove(validationData.inputErrorClass);
  });
  popup.querySelectorAll('.popup__error').forEach((message) => {
    message.classList.remove(validationData.errorClass);
    message.textContent = '';
  });
}

// Основные 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', clickOverlayToQuit);
  document.addEventListener('keydown', pressEscToQuit);
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', clickOverlayToQuit);
  document.removeEventListener('keydown', pressEscToQuit);
}

function openPreview(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewText.textContent = name;
  openPopup(preview);
}

function openPopupEditProfile() {
  clearValidation(popupProfile);
  enableSubmitButton(buttonSubmitProfile);
  popupProfileMainInput.value = profileName.textContent;
  popupProfileAdditionalInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function submitInfo(e) {
  e.preventDefault();
  profileName.textContent = popupProfileMainInput.value;
  profileDescription.textContent = popupProfileAdditionalInput.value;
  closePopup();
}

function openPopupAddCard() {
  clearForm(formAdd);
  clearValidation(popupAdd);
  disableSubmitButton(buttonSubmitAdd);
  popupAddMainInput.placeholder = 'Название';
  popupAddAdditionalInput.placeholder = 'Ссылка на картинку';
  openPopup(popupAdd);
}  

function createUserCard(name, link) {
  const card = new Card({name, link}, '#item-card', openPreview);
  return card.generateCard();
}

function submitCard(e) {
  e.preventDefault(); 
  console.log(popupAddMainInput.value, popupAddAdditionalInput.value)
  cardContainer.prepend(createUserCard(popupAddMainInput.value, popupAddAdditionalInput.value)); 
  closePopup();
}



// ДЕЙСТВИЯ

initialCards.forEach((item) => {
  const card = new Card(item, '#item-card', openPreview);
  const cardElement = card.generateCard();
  cardContainer.append(cardElement);
}); 

const formList = Array.from(document.querySelectorAll('.popup__container'));
formList.forEach((form) => {
    const formForValidation = new FormValidator(validationData, form);
    formForValidation.enableValidation();
});

popupProfileMainInput.value = profileName.textContent;
popupProfileAdditionalInput.value = profileDescription.textContent;

buttonInfo.addEventListener('click', openPopupEditProfile,);
buttonAdd.addEventListener('click', openPopupAddCard);

formProfile.addEventListener ('submit', submitInfo);
formAdd.addEventListener ('submit', submitCard);

buttonsClose.forEach((button) => {button.addEventListener ('click',closePopup)});




