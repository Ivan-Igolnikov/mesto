
// ОБЪЯВЛЕНИЯ

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#item-card').content;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const infoButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.close-button');

const form = document.querySelector('.form');
const formHeading = document.querySelector('.form__heading');
const formMainInput = document.querySelector('.form__main-input');
const formAdditionalInput = document.querySelector('.form__additional-input');
const formSubmit = document.querySelector('.form__submit');

const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview__image');
const previewText = document.querySelector('.preview__text');

const formContainer = document.querySelector('.form__container');


// ФУНКЦИИ

function openPopupInfo() {
  form.classList.add('popup_opened');
  formHeading.textContent = 'Редактировать профиль';
  formMainInput.value = profileName.textContent;
  formAdditionalInput.value = profileDescription.textContent;
  formSubmit.textContent = 'Сохранить';
}

function openPopupAdd() {
  form.classList.add('popup_opened');
  formHeading.textContent = 'Новое место';
  formMainInput.placeholder = 'Название';
  formAdditionalInput.placeholder = 'Ссылка на картинку';
  formSubmit.textContent = 'Создать';
}

function closePopup(e) {
  e.target.closest('.popup').classList.remove('popup_opened');
  formMainInput.value = '';
  formMainInput.placeholder = '';
  formAdditionalInput.value = '';
  formAdditionalInput.placeholder = '';
  }

function like(e) {
  e.target.classList.toggle('card__like_active');
}

function cardDelete(e) {
  e.target.closest('.card').remove();
}

// Submit 
// if - Первое условие для формы редактирования профиля,
// else if - Второе для добавления новой карточки. В условии реализована попытка защиты от создания пустой карточки. 
// else - Пояснение на случай создание пустой карточки. 
function Submit(e) {
  if (formHeading.textContent === 'Редактировать профиль') {
    e.preventDefault(); 
    profileName.textContent = formMainInput.value;
    profileDescription.textContent = formAdditionalInput.value;
    closePopup(e);
  }
  else if (formHeading.textContent === 'Новое место' && formMainInput.value !== "" && formAdditionalInput.value.includes('https://')) {
    e.preventDefault(); 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image').src = formAdditionalInput.value;
    const cardElementText = cardElement.querySelector('.card__text').textContent = formMainInput.value;
    cardElement.querySelector('.card__like').addEventListener('click', like);
    cardElement.querySelector('.card__trash').addEventListener('click', cardDelete);
    cardElement.querySelector('.card__image').addEventListener('click', () => {
      preview.classList.add('popup_opened');
      previewImage.src = cardElementImage;
      previewText.textContent = cardElementText;
    });  
    cardContainer.prepend(cardElement); 
    closePopup(e);
  }
  else {
    e.preventDefault(); 
    closePopup(e);
    setTimeout(function () {
      alert('Укажите название и ссылку на картинку');
    }, 70);
  }
}


// ЗАГРУЗКА КОНТЕНТА

// Массив первоночальных фото
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
    cardElement.querySelector('.card__like').addEventListener('click', like);
    cardElement.querySelector('.card__trash').addEventListener('click', cardDelete);
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
formSubmit.addEventListener('click', Submit);
