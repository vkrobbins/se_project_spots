const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error_visible",
};


const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = inputEl.nextElementSibling;
  errorMsgEl.textContent = inputEl.validationMessage;
  inputEl.classList.add(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = inputEl.nextElementSibling;
  errorMsgEl.textContent = '';
  errorMsgEl.classList.remove(config.errorClass);
  inputEl.classList.remove(config.inputErrorClass);
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
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

const enableValidation = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);

  forms.forEach((form) => {
    form.addEventListener('input', () => {
      const inputs = form.querySelectorAll(settings.inputSelector);
      let isFormValid = true;
      inputs.forEach((input) => {
        const errorElement = input.nextElementSibling;
        if (input.validity.valid) {
          errorElement.textContent = '';
        } else {
          errorElement.textContent = input.validationMessage;
        }
      });
    });
  });
};

enableValidation(settings);