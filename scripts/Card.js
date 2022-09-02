import {openPopup, preview, previewImage, previewText} from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._image = data.link;
    this._text = data.name; 
    this._templateSelector = templateSelector;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement
  }

  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _remove() {
    this._element.remove();
  }

  _openPreview() {
    openPopup(preview);
    previewImage.src = this._image;
    previewText.textContent = this._text;
    previewImage.alt = this._text;
  }

  _setEventListeners(cardImage) {
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._remove();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like();
    });

    cardImage.addEventListener('click', () => {
      this._openPreview() 
    });

  }
  
  generateCard() {
      // Запишем разметку в приватное поле _element. 
    this._element = this._getTemplate();

      // Добавим данные
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._image;
    cardImage.alt = this._text;
    this._element.querySelector('.card__text').textContent = this._text;

      //Добавим слушатели
    this._setEventListeners(cardImage);
    
      // Вернём элемент наружу
    return this._element;
  } 
}
  
export {Card}; 



