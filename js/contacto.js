const contactForm = document.getElementById("whatsappForm");
const contactErrorMsg = document.getElementById("contact-error-msg");
const charCount = document.getElementById("char-count");

const inPhone = document.getElementById("telefono");
const inEmail = document.getElementById("email");
const contactInputs = [
  document.getElementById("nombre"),
  document.getElementById("apellidos"),
  inPhone,
  inEmail,
  document.getElementById("motivo"),
];

// Emojis en formato Unicode (igual que usas en el carrito)
const iconSpark = "\u2728";
const iconUser = "\uD83D\uDC64";
const iconMail = "\uD83D\uDCE7";
const iconPhone = "\uD83D\uDCDE";
const iconMsg = "\uD83D\uDCAC";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupContactConstraints() {
  inPhone.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 10);
    inPhone.classList.remove("error-field");
  });

  contactInputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error-field");
      if (input.id === "motivo") {
        charCount.innerText = `${input.value.length} / 1000`;
      }
      if (!document.querySelector(".error-field")) {
        contactErrorMsg.style.visibility = "hidden";
      }
    });
  });
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let firstError = null;
  let hasError = false;

  contactInputs.forEach((input) => {
    let isInvalid = false;
    if (!input.value.trim()) isInvalid = true;
    if (input === inPhone && input.value.length < 10) isInvalid = true;
    if (input === inEmail && !validateEmail(input.value)) isInvalid = true;

    if (isInvalid) {
      input.classList.add("error-field");
      hasError = true;
      if (!firstError) firstError = input;
    }
  });

  if (hasError) {
    contactErrorMsg.style.visibility = "visible";
    if (firstError) firstError.focus();
    return;
  }

  const textoMensaje =
    `${iconSpark} *MINOE - NUEVA CONSULTA*\n` +
    `--------------------------------\n` +
    `${iconUser} *Cliente:* ${contactInputs[0].value.toUpperCase()} ${contactInputs[1].value.toUpperCase()}\n` +
    `${iconPhone} *WhatsApp:* ${inPhone.value}\n` +
    `${iconMail} *Email:* ${inEmail.value}\n` +
    `--------------------------------\n` +
    `${iconMsg} *Mensaje:*\n${contactInputs[4].value}\n` +
    `--------------------------------\n` +
    `_Enviado desde el sitio web oficial_`;

  window.open(
    `https://wa.me/593994831087?text=${encodeURIComponent(textoMensaje)}`,
    "_blank",
  );

  setTimeout(() => {
    contactForm.reset();
    charCount.innerText = "0 / 1000";
    contactErrorMsg.style.visibility = "hidden";
  }, 1000);
});

setupContactConstraints();
