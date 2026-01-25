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

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const resetValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.modal__input'));
  const buttonElement = formElement.querySelector('.modal__submit-btn');

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
};


const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener('input', () => {
      const inputs = form.querySelectorAll(config.inputSelector);
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