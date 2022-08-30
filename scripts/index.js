// ЗАГРУЗКА КОНТЕНТА

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


// Константа здесь для единообразия.
// Используется функциями enableSubmitButton, disableSubmitButton и clearValidation, 
const relatedToValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


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

function taplike(e) {
  e.target.classList.toggle('card__like_active');
}

function deleteCard(e) {
  e.target.closest('.card').remove();
}

function enableSubmitButton(button) {
  button.classList.remove(relatedToValidationConfig.inactiveButtonClass);
  button.removeAttribute('disabled');
}

function disableSubmitButton(button) {
  button.classList.add(relatedToValidationConfig.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function clearValidation(popup) {
  popup.querySelectorAll(relatedToValidationConfig.inputSelector).forEach((input) => {  
    input.classList.remove(relatedToValidationConfig.inputErrorClass);
  });
  popup.querySelectorAll('.popup__error').forEach((message) => {
    message.classList.remove(relatedToValidationConfig.errorClass);
    message.textContent = '';
  });
}

// Основные 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', clickOverlayToQuit);
  document.addEventListener('keydown', pressEscToQuit);
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

function createCard(elementName, elementLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__like').addEventListener('click', taplike);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__text').textContent = elementName
  cardImage.src = elementLink;
  cardImage.alt = elementName;
  cardImage.addEventListener('click', () => {
    openPreview(elementName, elementLink)
  });  
  return cardElement
}

function submitCard(e) {
  e.preventDefault(); 
  cardContainer.prepend(createCard(popupAddMainInput.value, popupAddAdditionalInput.value)); 
  closePopup();
}

function openPreview(elementName, elementLink) {
  openPopup(preview);
  previewImage.src = elementLink;
  previewText.textContent = elementName;
  previewImage.alt = elementName;
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', clickOverlayToQuit);
  document.removeEventListener('keydown', pressEscToQuit);
}


// ДЕЙСТВИЯ

// window.onload = () => {
//   initialCards.forEach((element) => {
//     cardContainer.append(createCard(element.name, element.link)); 
// })};

popupProfileMainInput.value = profileName.textContent;
popupProfileAdditionalInput.value = profileDescription.textContent;

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

buttonInfo.addEventListener('click', openPopupEditProfile,);
buttonAdd.addEventListener('click', openPopupAddCard);

formProfile.addEventListener ('submit', submitInfo);
formAdd.addEventListener ('submit', submitCard);

buttonsClose.forEach((button) => {button.addEventListener ('click',closePopup)});




