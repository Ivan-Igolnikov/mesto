class Card {
  constructor(data, templateSelector, previewFunction) {
    this._image = data.link;
    this._text = data.name; 
    this._templateSelector = templateSelector;
    this._openPreview = previewFunction;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like');
    
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
    this._likeButton.classList.toggle('card__like_active');
  }

  _remove() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(cardImage) {
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._remove();
    });

    this._likeButton.addEventListener('click', () => {
      this._like();
    });

    cardImage.addEventListener('click', () => {
      this._openPreview(this._text, this._image);
    });

  }
  
  generateCard() {

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



