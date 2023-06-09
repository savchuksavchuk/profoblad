import "./src/styles/main.scss";

// function initTabs() {
//   const tabs = document.querySelectorAll('.benefits__tab');
//   const cards = document.querySelectorAll('.benefits__card');

//   tabs.forEach((tab, index) => {
//     tab.addEventListener('click', () => {
//         tabs.forEach(tab => tab.classList.remove('benefits__tab--selected'));
//         cards.forEach(card => card.classList.remove('benefits__card--selected'));

//         tab.classList.add('benefits__tab--selected');
//         cards[index].classList.add('benefits__card--selected');
//     })
//   })
// }

// initTabs();

const headerForm: HTMLFormElement | null =
  document.querySelector(".header__form");
const orderForm: HTMLFormElement | null =
  document.querySelector(".order__form");

handlerFormSubmit(headerForm);
handlerFormSubmit(orderForm);

function handlerFormSubmit(formToSubmit: HTMLFormElement | null) {
  if (!formToSubmit) {
    return;
  }

  formToSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formIsValid = validateForm(e.target);

    if (!formIsValid) {
      return;
    }

    const formData = new FormData(formToSubmit);
    let response = await fetch("send.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("ok");
      formToSubmit.reset();
    }
  });
}

function validateForm(form) {
  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const typeInput = form.querySelector('[name="type"]');

  const nameIsValid = nameInput.value.trim();
  const phoneIsValid = validatePhone(phoneInput.value);

  nameInput.classList.remove("form--required");
  phoneInput.classList.remove("form--required");

  if (!nameIsValid) {
    nameInput.classList.add("form--required");
  }

  if (!phoneIsValid) {
    phoneInput.classList.add("form--required");
  }

  if (!nameIsValid && !phoneIsValid) {
    return false;
  }

  return true;
}

function validatePhone(phone) {
  return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(phone);
}
