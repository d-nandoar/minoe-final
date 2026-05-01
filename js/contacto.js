const contactForm = document.getElementById("whatsappForm");
const contactErrorMsg = document.getElementById("contact-error-msg");
const charCount = document.getElementById("char-count");

const inNombre = document.getElementById("nombre");
const inApellidos = document.getElementById("apellidos");
const inCiudad = document.getElementById("ciudad");
const inEmail = document.getElementById("email");
const inMotivo = document.getElementById("motivo");

const allInputs = [inNombre, inApellidos, inCiudad, inEmail, inMotivo];

// Emojis y configuración
const iconSpark = "\u2728";
const iconUser = "\uD83D\uDC64";
const iconMail = "\uD83D\uDCE7";
const iconMap = "\uD83D\uDCCD";
const iconMsg = "\uD83D\uDCAC";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Función para mostrar errores con texto dinámico
function showError(input, message) {
  input.classList.add("error-field");
  contactErrorMsg.innerText = message;
  contactErrorMsg.style.visibility = "visible";
}

function setupContactConstraints() {
  // --- RESTRICCIÓN: SOLO LETRAS ---
  // Se aplica a Nombre, Apellidos y Ciudad
  [inNombre, inApellidos, inCiudad].forEach((input) => {
    input.addEventListener("input", (e) => {
      // Reemplaza cualquier cosa que NO sea letra o espacio
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
      input.classList.remove("error-field");
    });
  });

  allInputs.forEach((input) => {
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

  // Limpiar estados de error visuales antes de validar
  allInputs.forEach((i) => i.classList.remove("error-field"));

  // 1. Validar Nombre
  if (!inNombre.value.trim()) {
    showError(inNombre, "* Campo obligatorio.");
    hasError = true;
    firstError = inNombre;
  }

  // 2. Validar Email
  if (!hasError) {
    if (!inEmail.value.trim()) {
      showError(inEmail, "* Campo obligatorio.");
      hasError = true;
      firstError = inEmail;
    } else if (!validateEmail(inEmail.value)) {
      showError(inEmail, "Correo inválido (ej. nombre@correo.com)");
      hasError = true;
      firstError = inEmail;
    }
  }

  // 3. Validar Mensaje
  if (!hasError && !inMotivo.value.trim()) {
    showError(inMotivo, "* Campo obligatorio.");
    hasError = true;
    firstError = inMotivo;
  }

  if (hasError) {
    if (firstError) firstError.focus();
    return;
  }

  // --- PREPARACIÓN DE DATOS ---
  const apellidos = inApellidos.value.trim()
    ? ` ${inApellidos.value.toUpperCase()}`
    : "";
  const ciudad = inCiudad.value.trim()
    ? inCiudad.value.toUpperCase()
    : "NO ESPECIFICADA";

  const textoMensaje =
    `${iconSpark} *MINOE - NUEVA CONSULTA*\n` +
    `--------------------------------\n` +
    `${iconUser} *Cliente:* ${inNombre.value.toUpperCase()}${apellidos}\n` +
    `${iconMap} *Ciudad:* ${ciudad}\n` +
    `${iconMail} *Email:* ${inEmail.value}\n` +
    `--------------------------------\n` +
    `${iconMsg} *Mensaje:*\n${inMotivo.value}\n` +
    `--------------------------------\n` +
    `_Enviado desde el sitio web oficial_`;

  // --- SOLUCIÓN AL BORRADO DE CAMPOS ---

  // 1. Abrimos WhatsApp
  window.open(
    `https://wa.me/593994831087?text=${encodeURIComponent(textoMensaje)}`,
    "_blank",
  );

  // 2. Borramos los campos inmediatamente
  contactForm.reset();

  // 3. Limpiamos contadores y mensajes de error residuales
  charCount.innerText = "0 / 1000";
  contactErrorMsg.style.visibility = "hidden";
  allInputs.forEach((input) => input.classList.remove("error-field"));
});

setupContactConstraints();
