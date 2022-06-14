// ОБЪЯВЛЕНИЯ

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#item-card').content;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const infoButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const submitButtons = document.querySelectorAll('.popup__submit');

const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const popupMainInput = document.querySelectorAll('.popup__main-input');
const popupAdditionalInput = document.querySelectorAll('.popup__additional-input');

const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview__image');
const previewText = document.querySelector('.preview__text');


// ФУНКЦИИ

function openPopupInfo() {
  profilePopup.classList.add('popup_opened');
  popupMainInput[0].value = profileName.textContent;
  popupAdditionalInput[0].value = profileDescription.textContent;
}

function openPopupAdd() {
  addPopup.classList.add('popup_opened');
  popupMainInput[1].placeholder = 'Название';
  popupAdditionalInput[1].placeholder = 'Ссылка на картинку';
}

function closePopup(e) {
  e.target.closest('.popup').classList.remove('popup_opened');
  popupMainInput[0].value = '';
  popupMainInput[1].placeholder = '';
  popupAdditionalInput[0].value = '';
  popupAdditionalInput[1].placeholder = '';
  }

function taplike(e) {
  e.target.classList.toggle('card__like_active');
}

function deleteCard(e) {
  e.target.closest('.card').remove();
}

function submitInfo(e) {
  e.preventDefault();
  profileName.textContent = popupMainInput[0].value;
  profileDescription.textContent = popupAdditionalInput[0].value;
  closePopup(e);
}

function submitCard(e) {
  e.preventDefault(); 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image').src = popupAdditionalInput[1].value;
  const cardElementText = cardElement.querySelector('.card__text').textContent = popupMainInput[1].value;
  cardElement.querySelector('.card__like').addEventListener('click', taplike);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    preview.classList.add('popup_opened');
    previewImage.src = cardElementImage;
    previewText.textContent = cardElementText;
  });  
  cardContainer.prepend(cardElement); 
  popupMainInput[1].value = '';
  popupAdditionalInput[1].value = '';
  closePopup(e);
}


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

// При загрузке страницы берём массив, для каждого элемента клонируем тимплейт, заполняем поля, 
// вешаем слушатель на лайк, дэлит и картинку, вставляем в разметку. 
window.onload = () => {
  initialCards.forEach((element) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image').src = element.link;
    const cardElementText = cardElement.querySelector('.card__text').textContent = element.name;
    cardElement.querySelector('.card__like').addEventListener('click', taplike);
    cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__image').addEventListener('click', () => {
      preview.classList.add('popup_opened');
      previewImage.src = cardElementImage;
      previewText.textContent = cardElementText;
    });  
    cardContainer.append(cardElement); 
})};


// ДЕЙСТВИЯ

infoButton.addEventListener('click', openPopupInfo);
addButton.addEventListener('click', openPopupAdd);
closeButtons.forEach((elem) => {elem.addEventListener ('click', closePopup)});
submitButtons[0].addEventListener ('click', submitInfo);
submitButtons[1].addEventListener ('click', submitCard);

