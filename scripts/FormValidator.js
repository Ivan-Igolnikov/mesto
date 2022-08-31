const data = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {
  constructor(data, form) {
    this._formElement = form;
    this._inputSelector = data.inputSelector; 
    this._submitButtonSelector = data.submitButtonSelector; 
    this._inactiveButtonClass = data.inactiveButtonClass; 
    this._inputErrorClass = data.inputErrorClass; 
    this._errorClass = data.errorClass; 
  }

  // OK
  _findWrongInput(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  // OK
  _showInputError(inputElement, errorMessage) {
 
    const errorElement = this._findWrongInput(inputElement);

      //отобразить стилизацию input'а
    inputElement.classList.add(this._inputErrorClass);
      //отобразить span
    errorElement.classList.add(this._errorClass);
      //добавить текст ошибки в span
    errorElement.textContent = errorMessage;
 }
 
 _hideInputError(inputElement) {
    const errorElement = this._findWrongInput(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
 }
 
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);  
    }
  }

  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => {
     return !inputElement.validity.valid;
    })
  }
 
  _toggleButtonState(inputsList) {
    
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput(inputsList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //ОК
  _setEventListeners() {
    const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputsList);
      });
    });
  }
 
  // OK
  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

}

const formList = Array.from(document.querySelectorAll('.popup__container'));

formList.forEach((form) => {
    const formForValidation = new FormValidator(data, form);
    formForValidation.enableValidation();
})
