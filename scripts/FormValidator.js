class FormValidator {
  constructor(validationData, form) {
    this._formElement = form;
    this._inputSelector = validationData.inputSelector; 
    this._submitButtonSelector = validationData.submitButtonSelector; 
    this._inactiveButtonClass = validationData.inactiveButtonClass; 
    this._inputErrorClass = validationData.inputErrorClass; 
    this._errorClass = validationData.errorClass; 
  }

  _findWrongInput(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

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

  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);  
    }
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

  _setEventListeners() {
    const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputsList);
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputsList);
      });
    });
  }
 
  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

export {FormValidator}; 

