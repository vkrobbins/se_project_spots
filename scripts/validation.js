const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error_visible",
};


const showInputError = (formEl, inputEl, errorMsg, settings) => {
  const errorMsgEl = inputEl.nextElementSibling;
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hideInputError = (formEl, inputEl, settings) => {
  const errorMsgEl = inputEl.nextElementSibling;
  errorMsgEl.textContent = '';
  errorMsgEl.classList.remove(settings.errorClass);
  inputEl.classList.remove(settings.inputErrorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const resetValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  toggleButtonState(inputList, buttonElement, settings);
};


const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

toggleButtonState(inputList, submitButton, settings);
inputList.forEach((inputElement) => {
  inputElement.addEventListener("input", () => {
    checkInputValidity(formElement, inputElement, settings);
    toggleButtonState(inputList, submitButton, settings);
  });
});
};

const enableValidation = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, settings);
  });
};

enableValidation(settings);