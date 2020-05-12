let popup = document.querySelector('.popup')
let profile = document.querySelector('.profile')

let popupForm = document.querySelector('.popup__form')
let popupCloseButton = document.querySelector('.popup__close')
let popupInputName = popupForm.querySelector('.popup__input_name')
let popupInputDescription = popupForm.querySelector('.popup__input_description')

let profileEditButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

function openPopup() {
  popupInputName.value = profileName.textContent
  popupInputDescription.value = profileDescription.textContent
  popup.classList.add('popup_open')
}

function closePopup() {
  popup.classList.remove('popup_open')
}

function applyСhanges(event) {
  event.preventDefault()
  profileName.textContent = popupInputName.value
  profileDescription.textContent = popupInputDescription.value
  closePopup()
}

profileEditButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', applyСhanges)
