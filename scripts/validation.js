const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error_visible",
};


const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${errorMsgID}`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add('modal__input_type_error');
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${errorMsgID}`);
  errorMsgEl.textContent = '';
  inputEl.classList.remove('modal__input_type_error');
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('modal__submit-btn_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('modal__submit-btn_disabled');
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


const setEventListeners = () => {
  const inputList = Array.from(document.querySelectorAll('.modal__input'));
  const buttonElement = document.querySelector('.modal__submit-btn');

toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const forms = document.querySelectorAll('.modal__form');

  forms.forEach((form) => {
    form.addEventListener('input', () => {
      const inputs = form.querySelectorAll('.modal__input');
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