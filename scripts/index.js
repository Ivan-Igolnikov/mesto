// ЗАГРУЗКА НАЧАЛЬНОГО КОНТЕНТА
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

// Куда будем вставлять
const cardContainer = document.querySelector('.cards');
// Получаем содержимое тимплейта
const cardTemplate = document.querySelector('#item-card').content;


const imagePopup = document.querySelector('.image-popup');
const imagePopupPic = document.querySelector('.image-popup__image');
const imagePopupText = document.querySelector('.image-popup__text');


// При загрузке страницы берём массив, для каждого элемента клонируем типлейт, заполняем поля и вставляем в разметку. 
// Сразу вешаем слушатель на лайк и дэлит
window.onload = function () {
  initialCards.forEach((element) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image').src = element.link;
    const cardElementText = cardElement.querySelector('.card__text').textContent = element.name;
    cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__like_active');
    });
    cardElement.querySelector('.card__trash').addEventListener('click', function() {
      cardElement.remove();
    });
    cardElement.querySelector('.card__image').addEventListener('click',function () {
      imagePopup.classList.add('popup_opened');
      imagePopupPic.src = cardElementImage;
      imagePopupText.textContent = cardElementText;
    });
    cardContainer.append(cardElement); 
})};


// ФАНТАСТИЧЕСКИЕ ПАПАПЫ, И ГДЕ ОНИ ОБИТАЮТ
const popup = document.querySelector('.popup');
const formPopup = document.querySelector('.popup__container');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.close-button');
const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popUpUserName = document.querySelector('.popup__user-name');
const popUpUserDescription = document.querySelector('.popup__user-description');

const popupHeading = document.querySelector('.popup__heading');
const popupSubmit = document.querySelector('.popup__submit');


function openPopupInfo() {
  popup.classList.add('popup_opened');
  popupHeading.textContent = 'Редактировать профиль';
  popupSubmit.textContent = 'Сохранить';
  popUpUserName.value = profileName.textContent;
  popUpUserDescription.value = profileDescription.textContent;
}

function openPopupContent() {
  popup.classList.add('popup_opened');
  popupHeading.textContent = 'Новое место';
  popupSubmit.textContent = 'Создать';
  popUpUserName.placeholder = 'Название';
  popUpUserDescription.placeholder = 'Ссылка на картинку';
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popUpUserName.placeholder = '';
  popUpUserDescription.placeholder = '';
  popUpUserName.value = '';
  popUpUserDescription.value = '';
  }

// Общая функция длля события submit. 
// Первое условие для редактирования профиля. 
// Второе для добавление карточки фото. Реализована попытка предотвратить создание пустой разметки. 
// Третье для пояснения, в случае нажатия submit при пустых полях value
function formSubmitHandler (evt) {
  if (popupHeading.textContent === 'Редактировать профиль') {
    evt.preventDefault(); 
    profileName.textContent = popUpUserName.value;
    profileDescription.textContent = popUpUserDescription.value;
    closePopup();
  }
  else if (popupHeading.textContent === 'Новое место' && popUpUserName.value !== "" && popUpUserDescription.value.includes('https://')) {
    evt.preventDefault(); 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardText = cardElement.querySelector('.card__text').textContent = popUpUserName.value;
    const cardImage = cardElement.querySelector('.card__image').src = popUpUserDescription.value;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like_active');
    });
    cardElement.querySelector('.card__trash').addEventListener('click', function () {
      cardElement.remove();
    });
    cardElement.querySelector('.card__image').addEventListener('click',function() {
      imagePopup.classList.add('popup_opened');
      imagePopupPic.src = cardImage;
      imagePopupText.textContent =  cardText;
    });
    cardContainer.prepend(cardElement); 
    closePopup();
  }
  else if (imagePopup.classList.contains('popup_opened')) {
    imagePopup.classList.remove('popup_opened');
  }
  else {
    evt.preventDefault(); 
    closePopup();
    setTimeout(function () {
      alert('Укажите название и ссылку на картинку');
    }, 70);
  }
}

editButton.addEventListener('click', openPopupInfo);
closeButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopupContent);
formPopup.addEventListener('submit', formSubmitHandler);

// Попап картинки


// Объявляем функцию добавления класса для попапа картинки. 

