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
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }
 
  _hideInputError(inputElement) {
    const errorElement = this._findWrongInput(inputElement); 
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
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
 
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
 
  resetForm() {  
    this._formElement.reset();
  }

  resetButton() {
    this._toggleButtonState();
  }

  resetErrors() {
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);      
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export {FormValidator}; 

