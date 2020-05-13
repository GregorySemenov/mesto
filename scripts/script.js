//Создаем объекты поп-ап и профиля
const popup = document.querySelector('.popup')
const profile = document.querySelector('.profile')

//Создаем элементы для всплывающего окна
const popupForm = document.querySelector('.popup__form')
const popupCloseButton = document.querySelector('.popup__close')
const popupInputName = popupForm.querySelector('.popup__input_name')
const popupInputDescription = popupForm.querySelector('.popup__input_description')

//Создаем элементы для окна с профилем
const profileEditButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

//Функция открытия и закрытия окна поп-ап
//Если при проверке создано окно, то заносим данные
function openClosePopup() {
  popup.classList.toggle('popup_open');
  if (popup.classList.contains('popup_open')) {
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
  }
}

//Фукнция применения изменений для профиля
function applyСhanges(event) {
  event.preventDefault()
  profileName.textContent = popupInputName.value
  profileDescription.textContent = popupInputDescription.value
  openClosePopup()
}

//Отслеживаем события на кнопки
profileEditButton.addEventListener('click', openClosePopup)
popupCloseButton.addEventListener('click', openClosePopup)
popupForm.addEventListener('submit', applyСhanges)
