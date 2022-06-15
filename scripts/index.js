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
const forms = document.querySelectorAll('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const infoButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const submitButtons = document.querySelectorAll('.popup__submit');

const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const popupMainInputs = document.querySelectorAll('.popup__main-input');
const popupAdditionalInputs = document.querySelectorAll('.popup__additional-input');

const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview__image');
const previewText = document.querySelector('.preview__text');


// ФУНКЦИИ

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEditProfile () {
  popupMainInputs[0].value = profileName.textContent;
  popupAdditionalInputs[0].value = profileDescription.textContent;
  openPopup(profilePopup);
}

function openPopupAddCard () {
  popupMainInputs[1].placeholder = 'Название';
  popupAdditionalInputs[1].placeholder = 'Ссылка на картинку';
  openPopup(addPopup);
}  

function closeAllPopup(e) {
  closePopup(e.target.closest('.popup'));
  forms.forEach((elem) => {elem.reset()})
  }

function taplike(e) {
  e.target.classList.toggle('card__like_active');
}

function deleteCard(e) {
  e.target.closest('.card').remove();
}

function openPreview(elementName, elementLink) {
  preview.classList.add('popup_opened');
  previewImage.src = elementLink;
  previewText.textContent = elementName;
  previewImage.alt = elementName;
}

function createCard(elementName, elementLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = elementLink;
  cardElement.querySelector('.card__text').textContent = elementName
  cardElement.querySelector('.card__image').alt = elementName;
  cardElement.querySelector('.card__like').addEventListener('click', taplike);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openPreview(elementName, elementLink)
  });  
  return cardElement
}

function submitInfo(e) {
  e.preventDefault();
  profileName.textContent = popupMainInputs[0].value;
  profileDescription.textContent = popupAdditionalInputs[0].value;
  closeAllPopup(e);
}

function submitCard(e) {
  e.preventDefault(); 
  cardContainer.prepend(createCard(popupMainInputs[1].value, popupAdditionalInputs[1].value)); 
  closeAllPopup(e);
  forms[1].reset();
}


// ДЕЙСТВИЯ

window.onload = () => {
  initialCards.forEach((element) => {
    cardContainer.append(createCard(element.name, element.link)); 
})};

infoButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddCard);
closeButtons.forEach((elem) => {elem.addEventListener ('click', closeAllPopup)});
forms[0].addEventListener ('submit', submitInfo);
forms[1].addEventListener ('submit', submitCard);







