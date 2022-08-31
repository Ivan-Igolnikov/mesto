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

    _setEventListeners() {
      this._element.querySelector('.card__trash').addEventListener('click', () => {
        this._remove();
      });

      this._element.querySelector('.card__like').addEventListener('click', () => {
        this._like();
      });

    }
  
    generateCard() {
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
    
      // Добавим данные
      this._element.querySelector('.card__image').src = this._image;
      this._element.querySelector('.card__text').textContent = this._text;

      //Добавим слушатели
      this._setEventListeners();
    
      // Вернём элемент наружу
      return this._element;
  
    } 
  }
  
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, '#item-card');
  
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    cardContainer.append(cardElement);
  }); 
  




