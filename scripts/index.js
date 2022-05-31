// PopUp

const popup = document.querySelector('.popup');
const formPopup = document.querySelector('.popup__container');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popUpUserName = document.querySelector('.popup__user-name');
const popUpUserDescription = document.querySelector('.popup__user-description');

function openPopup() {
  popup.classList.add('popup_opened');
  popUpUserName.value = profileName.textContent
  popUpUserDescription.value = profileDescription.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popUpUserName.value
    profileDescription.textContent = popUpUserDescription.value 
    closePopup()
}

formPopup.addEventListener('submit', formSubmitHandler);



// Like button

const likeButtons = document.querySelectorAll('.card__like');
const likeButton = document.querySelector('.card__like');

function classAdd(likeButton) {
  likeButton.classList.toggle('card__like_active')
}

likeButtons.forEach((item) => {
  likeButton.addEventListener('click', classAdd);
})


likeButtons.forEach((button) => button.addEventListener('click', () => classAdd(button)))