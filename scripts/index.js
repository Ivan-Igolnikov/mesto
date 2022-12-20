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
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formValidators = {}


// ОБЪЯВЛЕНИЯ

const cardContainer = document.querySelector('.cards');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

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
  
  popupProfileMainInput.value = profileName.textContent;
  popupProfileAdditionalInput.value = profileDescription.textContent;
  formValidators['profile-form'].resetErrors()
  //resetButton добавлена, чтобы при верном изначальном значении "Жак-Ив Кусто" можно было сохранить его без изменений
  formValidators['profile-form'].resetButton()
  openPopup(popupProfile);
}

function submitInfo(e) {
  e.preventDefault();
  profileName.textContent = popupProfileMainInput.value;
  profileDescription.textContent = popupProfileAdditionalInput.value;
  closePopup();
}

function openPopupAddCard() {
  formValidators['card-form'].resetForm()
  formValidators['card-form'].resetErrors()
  formValidators['card-form'].resetButton()
  openPopup(popupAdd);
}  

function createUserCard(name, link) {
  const card = new Card({name, link}, '#item-card', openPreview);
  return card.generateCard();
}

function submitCard(e) {
  e.preventDefault(); 
  cardContainer.prepend(createUserCard(popupAddMainInput.value, popupAddAdditionalInput.value)); 
  closePopup();
}

// Включение валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};








// ДЕЙСТВИЯ

initialCards.forEach(({name, link}) => {
  const cardElement = createUserCard(name, link); 
  cardContainer.append(cardElement);
}); 




enableValidation(validationData);


popupProfileMainInput.value = profileName.textContent;
popupProfileAdditionalInput.value = profileDescription.textContent;

buttonInfo.addEventListener('click', openPopupEditProfile,);
buttonAdd.addEventListener('click', openPopupAddCard);

formProfile.addEventListener ('submit', submitInfo);
formAdd.addEventListener ('submit', submitCard);

buttonsClose.forEach((button) => {button.addEventListener ('click',closePopup)});




