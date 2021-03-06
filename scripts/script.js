//Исходный массив с местами для карточек
const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Создаем элементы профиля
const userProfile = document.querySelector('.profile');
const userProfileName = userProfile.querySelector('.profile__name');
const userProfileDescription = userProfile.querySelector('.profile__description');
const userProfileEditButton = userProfile.querySelector('.profile__edit-button');
const userProfileAddButton = userProfile.querySelector('.profile__add-button');

// Создаем попапы
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_image');
const popupButtonClose = document.querySelectorAll('.popup__close');
const formProfile = popupProfile.querySelector('.popup__form');
const formInputProfileName = formProfile.querySelector('.popup__input_profile-name');
const formInputProfileDescription = formProfile.querySelector('.popup__input_profile-description');
const formPlace = popupPlace.querySelector('.popup__form');
const formInputPlaceName = formPlace.querySelector('.popup__input_place-name');
const formInputPlacePhoto = formPlace.querySelector('.popup__input_place-photo');

// Создаем попап Image
const imagePhoto = popupImage.querySelector('.popup__image-photo');
const imageName = popupImage.querySelector('.popup__image-name');

// Шаблон для создания карточек
const templatePlaceCard = document.querySelector('#element').content;

const places = document.querySelector('.elements');

// Запуск события на элементе формы
const ShowForm = new Event('showForm', { bubbles: false });

// Закрывать попап по клавише Esc
function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_open');
    closePopup(openPopup)
  }
}

// Закрыть попап по клику на оверлее
function closePopupOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
}

// Функция: Показать попап
function showPopup(popup) {
  document.addEventListener('keydown', closePopupEsc)
  popup.addEventListener('mousedown', closePopupOverlay)
  popup.classList.add('popup_open')
  if (popup.querySelector('.popup__form')) {
    popup.querySelector('.popup__form').dispatchEvent(ShowForm)
  }
}

// Формируем карточки
function createPlaceCard({ name, link }) {
  const placeCard = templatePlaceCard.cloneNode(true)
  const placeName = placeCard.querySelector('.element__name')
  const placeImage = placeCard.querySelector('.element__photo')
  const placeLike = placeCard.querySelector('.element__like')
  const placeDelete = placeCard.querySelector('.element__delete')
  placeImage.style.backgroundImage = (`url('${link}')`)
  placeName.textContent = name

  placeImage.addEventListener('click', () => {
    imagePhoto.src = link
    imagePhoto.alt = `Изображение с местом ${name}`
	  imageName.textContent = name
	  showPopup(popupImage)
  });

  placeLike.addEventListener('click', (evt) => {
	  evt.target.classList.toggle('element__like_active')
  });

  placeDelete.addEventListener('click', (evt) => {
	  evt.target.closest('.element').remove()
  });

  return placeCard
}

// Функция закрытия попапа
function closePopup (popup) {
  if (popup.target) {
   popup = popup.target.closest('.popup')
  }
//удаляем обработчики при закрытии
  if (!popup.classList.contains('popup_open')) return
   popup.classList.remove('popup_open')
   popup.removeEventListener('mousedown', closePopupOverlay)
   document.removeEventListener('keydown', closePopupEsc)
}

// Заносим в форму профиля данные
function showPopupProfile() {
  formInputProfileName.value = userProfileName.textContent
  formInputProfileDescription.value = userProfileDescription.textContent
  showPopup(popupProfile)
}

// Заносим в форму места данные
function showPopupPlace() {
  //сначала обнуляем значения
  formInputPlaceName.value = ''
  formInputPlacePhoto.value = ''
  showPopup(popupPlace)
}

// Записываем изменения в профиль
function applyChangesProfile(evt) {
  evt.preventDefault()
  userProfileName.textContent = formInputProfileName.value
  userProfileDescription.textContent = formInputProfileDescription.value
  closePopup(popupProfile)
}

// Создаем новую карточку
function addPlaceCard(evt) {
  evt.preventDefault()
  const place = {
    name: formInputPlaceName.value,
    link: formInputPlacePhoto.value
  }
  const card = createPlaceCard(place)
  places.prepend(card)
  closePopup(popupPlace)
}

// Отслеживаем события
userProfileEditButton.addEventListener('click', showPopupProfile);
userProfileAddButton.addEventListener('click', showPopupPlace);
formProfile.addEventListener('submit', applyChangesProfile);
formPlace.addEventListener('submit', addPlaceCard);
popupButtonClose.forEach(evt => evt.addEventListener('click', closePopup));

//Вызов функции вывода карточек на экран
initialPlaces.forEach(evt => {
	const card = createPlaceCard(evt)
	places.append(card)
});
