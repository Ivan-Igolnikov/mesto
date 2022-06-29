// ФУНКЦИИ ВАЛИДАЦИИ ФОРМ

// Общие параметры 
const settings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError (formElement, inputElement, errorMessage) {
   //выбрать span ошибки
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   //добавить текст в span
   errorElement.textContent = errorMessage;
   //отобразить стилизацию input'а
   inputElement.classList.add(settings.inputErrorClass);
   //отобразить span
   errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}


function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
 
function hasInvalidInput(inputsList) {
  return inputsList.some((inputElement) => {
   return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputsList, buttonElement) {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(formElement) {
  const inputsList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputsList, buttonElement)
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputsList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  })
}


// Вызываем валидацию 
enableValidation(); 