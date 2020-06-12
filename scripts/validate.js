// Подключаем валидацию
const enableValidation = (options) => {
  const formElements = Array.from(document.querySelectorAll(options.formSelector))
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector))
    inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        handleInput(input, options)
        checkValidityForm(formElement, options)
      })
    })
    formElement.addEventListener('showForm', (evt) => {
      inputElements.forEach(input => {
        hideInputError(input, options)
        checkValidityForm(formElement, options)
      })
    })
  })
}

// Получаем span для вывода ошибки
const getErrorSpan = (input) => {
  return document.querySelector(`#${input.id}-error`)
}

// Отображаем ошибки валидации поля
const showInputError = (input, options) => {
  const error = getErrorSpan(input)
  error.textContent = input.validationMessage
  error.classList.add(options.errorClass)
  input.classList.add(options.inputErrorClass)
}

// Скрываем ошибки валидации поля
const hideInputError = (input, options) => {
  const error = getErrorSpan(input)
  error.textContent = ''
  error.classList.remove(options.errorClass)
  input.classList.remove(options.inputErrorClass)
}

// Неактивная кнопка submit
const disableSubmitButton = (buttonElement, options) => {
  buttonElement.disabled = true
  buttonElement.classList.add(options.inactiveButtonClass)
}

// Активная кнопку submit
const enableSubmitButton = (buttonElement, options) => {
  buttonElement.disabled = false
  buttonElement.classList.remove(options.inactiveButtonClass)
}

//Проверяем состояние валидации формы
const checkValidityForm = (form, options) => {
  const buttonElement = form.querySelector(options.submitButtonSelector)
  if (form.checkValidity()) enableSubmitButton(buttonElement, options)
  else disableSubmitButton(buttonElement, options)
}

// Следим за полем ввода
const handleInput = (input, options) => {
  if (input.checkValidity()) hideInputError(input, options)
  else showInputError(input, options)
}

//Функция ответственная за включение валидации всех форм.
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
