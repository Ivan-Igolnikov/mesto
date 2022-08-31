// // ФУНКЦИИ ВАЛИДАЦИИ ФОРМ

// function showInputError (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) {
//    //выбрать span ошибки
//    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//    //добавить текст в span
//    errorElement.textContent = errorMessage;
//    //отобразить стилизацию input'а
//    inputElement.classList.add(inputErrorClass);
//    //отобразить span
//    errorElement.classList.add(errorClass);
// }

// function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// }


// function isValid(formElement, inputElement, {...rest}) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, rest);
//   } else {
//     hideInputError(formElement, inputElement, rest);  
//   }
// }
 
// function hasInvalidInput(inputsList) {
//   return inputsList.some((inputElement) => {
//    return !inputElement.validity.valid;
//   })
// }

// function toggleButtonState(inputsList, buttonElement, {inactiveButtonClass}) {
//   if (hasInvalidInput(inputsList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
//   }
// }

// function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...rest}) {
//   const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputsList, buttonElement, rest)
//   inputsList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, rest);
//       toggleButtonState(inputsList, buttonElement, rest);
//     });
//   });
// }

// function enableValidation({formSelector, ...rest}) {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, rest);
//   })
// }

