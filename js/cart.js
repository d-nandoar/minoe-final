// Constante con el número de teléfono para el mensaje de WhatsApp.
const WHATSAPP_NUM = "593994831087";

// 3. REFERENCIAS AL DOM
// Usamos 'document.getElementById' para "atrapar" los elementos del HTML y poder controlarlos con JS.
const cartList = document.getElementById("cart-list"); // Lista de ítems dentro del carrito
const cartTotal = document.getElementById("cart-total"); // El precio total acumulado
const cartCount = document.getElementById("cart-count"); // El circulito rojo con el número de productos
const sidebar = document.getElementById("sidebar"); // El panel lateral del carrito
const cartOverlay = document.getElementById("overlay__cart"); // El fondo oscuro detrás del carrito
console.log(cartOverlay);

const toastContainer = document.getElementById("toast-container"); // Para mostrar notificaciones rápidas

// Referencias a los inputs del formulario de facturación
const inId = document.getElementById("cust-id");
const inNm = document.getElementById("cust-name");
const inLn = document.getElementById("cust-lastname");
const errorMsg = document.getElementById("form-error-msg"); // El texto de error que aparece si falta algo

// --- UTILIDADES ---
// Funciones pequeñas que realizan tareas repetitivas o específicas.

// Esta función toma un número y lo convierte a formato de dinero (ej: 1250 -> $1,250.00)
function formatCurrency(num) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

// Quita las marcas rojas de error de los campos del formulario.

function resetFormErrors() {
  // Restaurar Placeholders originales
  inId.placeholder = "Cédula (10) / RUC (13)";
  inNm.placeholder = "Nombre";
  inLn.placeholder = "Apellido";

  // Quitar clases de error
  [inId, inNm, inLn].forEach((input) => {
    input.classList.remove("error-field");
  });

  // Ocultar el div ruidoso (ya no lo necesitaremos)
  if (errorMsg) errorMsg.style.display = "none";
}

// Limpia el texto escrito en los inputs del formulario.
function clearFormValues() {
  [inId, inNm, inLn].forEach((input) => (input.value = "")); // Vaciamos cada campo
  resetFormErrors(); // También reseteamos los errores visuales
}

// --- RESTRICCIONES DE INPUT (TIEMPO REAL) ---
// Estas funciones evitan que el usuario escriba cosas que no debe mientras teclea.

function setupInputConstraints() {
  // Para la Cédula/RUC:
  inId.addEventListener("input", (e) => {
    // Reemplaza cualquier cosa que NO sea número (0-9) por nada.
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    // Si escribe más de 13 caracteres, corta el texto para que solo queden los primeros 13.
    if (e.target.value.length > 13)
      e.target.value = e.target.value.slice(0, 13);
  });

  // Para Nombres y Apellidos:
  const lettersOnly = (e) => {
    // Solo permite letras (incluyendo tildes y ñ) y espacios. Borra lo demás (números, símbolos).
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
  };
  inNm.addEventListener("input", lettersOnly);
  inLn.addEventListener("input", lettersOnly);
}

// Abre o cierra el carrito lateral.

// - Localiza esta función en tu cart.js
function toggleCart() {
  const navMenu = document.querySelector(".header__nav");
  const navOverlay = document.querySelector(".overlay__nav");

  if (navMenu?.classList.contains("nav-visible")) {
    navMenu.classList.remove("nav-visible");
    navOverlay?.classList.remove("overlay--active");
  }

  if (typeof resetFormErrors === "function") {
    resetFormErrors();
  }

  const isActive = sidebar.classList.toggle("sidebar--active");
  cartOverlay.classList.toggle("overlay--active");

  if (isActive) {
    // --- CAMBIO AQUÍ PARA EVITAR EL SALTO ---
    // En lugar de resetear el scroll, solo bloqueamos el overflow
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Asegúrate de que en tu CSS, .no-scroll NO tenga "position: fixed"
    // Si tu CSS tiene position: fixed, el salto es inevitable a menos que uses JS para compensar.
    document.body.classList.add("no-scroll");

    updateUI();
  } else {
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = "0px";
  }
}

// Cambia la cantidad de un producto (delta puede ser 1 o -1).

function updateQty(id, delta) {
  const item = cart.find((i) => i.id === id); // Busca el producto en el carrito

  if (item) {
    const nuevaCantidad = item.qty + delta;

    // --- VALIDACIÓN DE LÍMITES ---
    if (nuevaCantidad >= 1 && nuevaCantidad <= 99) {
      // Si está en el rango permitido (1-99), actualizamos
      item.qty = nuevaCantidad;
    } else if (nuevaCantidad <= 0) {
      // Si el usuario logra bajar de 1 (por ejemplo, con el tacho de basura o lógica extra),
      // lo eliminamos directamente.
      cart = cart.filter((i) => i.id !== id);
    } else if (nuevaCantidad > 99) {
      // Si intenta subir de 99, no hacemos nada (el botón ya debería estar disabled)
      return;
    }
  }

  // --- LÓGICA DE CIERRE AUTOMÁTICO ---
  if (cart.length === 0) {
    clearFormValues();
    // Si el carrito se vació y está abierto, lo cerramos
    if (sidebar.classList.contains("sidebar--active")) {
      toggleCart();
    }
  }

  // Persistimos el cambio en el almacenamiento local para que no se pierda al dar F5
  // localStorage.setItem("MINOE_CART", JSON.stringify(cart));

  resetFormErrors();
  updateUI(); // Refrescamos lo que ve el usuario (aquí se activará el "99+" y los disabled)
}

// Elimina un producto específico del carrito sin importar la cantidad.
function removeFromCart(id) {
  // 'filter' crea una nueva lista excluyendo al producto que tenga ese ID.
  cart = cart.filter((i) => i.id !== id);

  // --- NUEVA LÓGICA DE CIERRE AUTOMÁTICO ---
  if (cart.length === 0) {
    clearFormValues();
    // Si el carrito se vació y está abierto, lo cerramos
    if (sidebar.classList.contains("sidebar--active")) {
      toggleCart();
    }
  }

  resetFormErrors();
  updateUI();
}

// Añade un producto a la lista del carrito.
function addToCart(id, name, price) {
  const exist = cart.find((i) => i.id === id); // ¿Ya estaba en el carrito?
  // Si existe, le sumamos 1 a la cantidad. Si no, lo agregamos como un objeto nuevo.
  exist ? exist.qty++ : cart.push({ id, name, price, qty: 1 });
  updateUI();
  triggerCartAnimation();
}

// Esta función es el corazón visual: actualiza los totales, el contador y la lista del carrito.

function updateUI() {
  cartList.innerHTML = "";
  let total = 0;
  let count = 0;

  const cartFooter = document.querySelector(".sidebar__footer");

  // 1. LÓGICA DE CARRITO VACÍO
  if (cart.length === 0) {
    clearFormValues();
    if (typeof resetFormErrors === "function") resetFormErrors();

    cartList.innerHTML = `
      <div class="cart-empty">
        <p class="cart-empty__message">Tu carrito está vacío</p>
        <a href="#catalogo" class="cart-empty__link" onclick="toggleCart()">Explorar catálogo</a>
      </div>
    `;

    // OCULTAMOS AQUÍ SI ESTÁ VACÍO
    cartCount.style.display = "none";
    if (cartFooter) cartFooter.style.display = "none";

    // Guardamos el estado vacío en LocalStorage
    localStorage.setItem("MINOE_CART", JSON.stringify(cart));
    return;
  }

  // 2. LÓGICA CUANDO HAY PRODUCTOS
  if (cartFooter) cartFooter.style.display = "block";

  cart.forEach((i) => {
    total += i.price * i.qty;
    count += i.qty; // Aquí es donde 'count' deja de ser 0

    const btnMinusDisabled = i.qty <= 1 ? "disabled" : "";
    const btnPlusDisabled = i.qty >= 99 ? "disabled" : "";

    cartList.innerHTML += `
      <div class="cart-item">
        <div class="cart-item__info">
          <p class="cart-item__name">${i.name}</p>
          <p class="cart-item__price">${formatCurrency(i.price)}</p>
        </div>
        <div class="cart-item__controls">
          <div class="qty-selector">
            <button class="qty-selector__btn" onclick="updateQty('${i.id}', -1)" ${btnMinusDisabled}>−</button>
            <span class="qty-selector__value">${i.qty}</span>
            <button class="qty-selector__btn" onclick="updateQty('${i.id}', 1)" ${btnPlusDisabled}>+</button>
          </div>
          <button class="cart-item__remove" onclick="removeFromCart('${i.id}')">
            <span class="cart__trash-item cart__trash-item--url"></span>
          </button>
        </div>
      </div>`;
  });

  // 3. ACTUALIZACIÓN FINAL DEL CONTADOR (Movélo aquí abajo)
  if (count > 0) {
    cartCount.style.display = "flex"; // Mostramos el círculo

    if (count > 99) {
      cartCount.innerText = "99+";
      cartCount.style.fontSize = "0.75em";
    } else {
      cartCount.innerText = count;
      cartCount.style.fontSize = "0.9em";
    }
  } else {
    cartCount.style.display = "none"; // Por si acaso llega a 0 aquí
  }

  cartTotal.innerText = formatCurrency(total);
  localStorage.setItem("MINOE_CART", JSON.stringify(cart));
}

// animación del carrito (añadir)
function triggerCartAnimation() {
  const wrapper = document.getElementById("open-cart");
  if (!wrapper) return; // Seguridad por si el elemento no existe

  wrapper.classList.remove("animate-sparkles");
  void wrapper.offsetWidth; // Truco técnico para reiniciar la animación
  wrapper.classList.add("animate-sparkles");

  setTimeout(() => {
    wrapper.classList.remove("animate-sparkles");
  }, 600);
}

// --- VALIDACIÓN Y ENVÍO (CORREGIDO FOCUS) ---

// Esta función se activa al dar click en "FINALIZAR PEDIDO".
function sendWhatsApp() {
  resetFormErrors();

  const idVal = inId.value.trim();
  const nameVal = inNm.value.trim();
  const lastVal = inLn.value.trim();

  let hayErrores = false;
  let primerCampoConError = null;

  // 1. Validación de Identificación
  if (idVal.length !== 10 && idVal.length !== 13) {
    inId.value = ""; // Limpiamos para que se vea el placeholder
    inId.placeholder = "ID debe tener 10 o 13 dígitos";
    inId.classList.add("error-field");
    hayErrores = true;
    if (!primerCampoConError) primerCampoConError = inId;
  }

  // 2. Validación de Nombre
  if (nameVal.length < 2) {
    inNm.value = "";
    inNm.placeholder = "Mínimo 2 letras";
    inNm.classList.add("error-field");
    hayErrores = true;
    if (!primerCampoConError) primerCampoConError = inNm;
  }

  // 3. Validación de Apellido
  if (lastVal.length < 2) {
    inLn.value = "";
    inLn.placeholder = "Mínimo 2 letras";
    inLn.classList.add("error-field");
    hayErrores = true;
    if (!primerCampoConError) primerCampoConError = inLn;
  }

  if (hayErrores) {
    if (primerCampoConError) primerCampoConError.focus();
    return; // Detenemos el envío
  }

  // Definición de Emojis para que el mensaje de WhatsApp se vea elegante.
  const iconSpark = "\u2728"; // ✨
  const iconUser = "\uD83D\uDC64"; // 👤
  const iconId = "\u{1FAAA}"; // 🪪 (Icono de tarjeta de ID)
  const iconBag = "\uD83D\uDECD"; // 🛍️
  const iconMoney = "\uD83D\uDCB0"; // 💰
  const iconPray = "\u{1F478}\u{1F3FB}"; // 👸🏻 (Representando la marca de lujo)

  // Construcción del mensaje de texto que llegará al celular.
  let msg = "-------------------------------\n";
  msg += `${iconSpark} *NUEVO PEDIDO MINOE* ${iconSpark}\n`;
  msg += "-------------------------------\n\n";
  msg += `${iconUser} *CLIENTE:* ${nameVal.toUpperCase()} ${lastVal.toUpperCase()}\n`;
  msg += `${iconId} *ID/RUC:* ${idVal}\n\n`;
  msg += "-------------------------------\n";
  msg += `${iconBag} *DETALLE DEL PEDIDO:*\n`;
  msg += "-------------------------------\n\n";

  // Agregamos cada producto del carrito al mensaje
  cart.forEach((i) => {
    msg += `• *${i.name}*\n`;
    msg += `  ${i.id} | x${i.qty} | ${formatCurrency(i.price)} | ${formatCurrency(i.price * i.qty)}\n\n`;
  });

  msg += "\n-------------------------------\n";
  msg += `${iconMoney} *TOTAL A PAGAR: ${cartTotal.innerText}*\n`;
  msg += "-------------------------------\n\n";
  msg += `*_Gracias por su preferencia._* ${iconPray}${iconSpark}`;

  // 'encodeURIComponent' transforma el mensaje en un formato que el navegador entiende como dirección web.
  const finalMsg = encodeURIComponent(msg);
  // Abre una nueva pestaña con el chat de WhatsApp listo para enviar el mensaje.
  window.open(
    `https://api.whatsapp.com/send?phone=${WHATSAPP_NUM}&text=${finalMsg}`,
    "_blank",
  );

  // Una vez enviado, vaciamos el carrito y notificamos.
  cart = [];
  updateUI();
  // showToast("¡Pedido Enviado!");
}

// --- EVENTOS ---
// Aquí asignamos las funciones a los botones físicos de la página.

// Escuchamos clicks en el contenedor de productos (técnica de delegación de eventos)
productContainer.addEventListener("click", (e) => {
  // Solo si el click fue en un botón de añadir
  if (e.target.classList.contains("product-card__btn-add")) {
    const d = e.target.dataset; // Leemos los atributos 'data-' que pusimos en el HTML
    addToCart(d.id, d.name, parseFloat(d.price));
  }
});

// Botón para abrir el carrito
// document.getElementById("open-cart").addEventListener("click", toggleCart);
document.getElementById("open-cart").addEventListener("click", (e) => {
  e.preventDefault();
  toggleCart();
});

// Click en el fondo oscuro para cerrar el carrito
cartOverlay.addEventListener("click", toggleCart);

// Botón de "Vaciar Bolsa" (el icono del tacho de basura grande)
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = []; // Vaciamos la lista

  // SOBREESCRIBIMOS EL GUARDADO CON UN ARREGLO VACÍO
  // localStorage.setItem("MINOE_CART", JSON.stringify(cart));

  updateUI(); // Refrescamos la pantalla
  toggleCart();
});

// Botón de finalizar pedido
document.getElementById("whatsapp-btn").addEventListener("click", sendWhatsApp);

// Al terminar de cargar la página:
window.onload = () => {
  updateUI(); // Cargamos el carrito de la sesión anterior si existe
  renderProducts("joyeria"); // Mostramos joyería al inicio por defecto
  setupInputConstraints(); // Activamos las restricciones de escritura en los inputs
};

document.addEventListener("click", (event) => {
  const isCartActive = sidebar.classList.contains("sidebar--active");
  if (!isCartActive) return;

  // --- SOLUCIÓN AQUÍ ---
  // Si el elemento que tocaste ya no tiene "padre" (porque updateUI lo borró)
  // significa que fue un clic en un botón interno del carrito.
  if (!event.target.isConnected) {
    return; // No hacemos nada, dejamos el carrito abierto
  }

  const clickInsideCart = sidebar.contains(event.target);
  const clickOnCartBtn = document
    .getElementById("open-cart")
    .contains(event.target);

  // También verificamos si el clic fue en los botones que disparan funciones
  const isActionButton =
    event.target.closest(".qty-selector__btn") ||
    event.target.closest(".cart-item__remove");

  if (!clickInsideCart && !clickOnCartBtn && !isActionButton) {
    toggleCart();
  }
});

// Arreglo con tus inputs para automatizar la limpieza
[inId, inNm, inLn].forEach((input) => {
  input.addEventListener("input", () => {
    // Si el input tiene la clase de error, se la quitamos al escribir
    if (input.classList.contains("error-field")) {
      input.classList.remove("error-field");
    }

    // Si ya no hay campos con errores, ocultamos el mensaje general
    const hayErroresActivos =
      document.querySelectorAll(".error-field").length > 0;
    if (!hayErroresActivos) {
      errorMsg.style.display = "none";
    }
  });
});
