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

// Muestra una pequeña notificación que se borra sola después de 2.5 segundos.
function showToast(msg) {
  toastContainer.innerHTML = ""; // Limpiamos notificaciones viejas
  const t = document.createElement("div"); // Creamos un nuevo elemento DIV
  t.className = "navbar__toast-item"; // Le ponemos la clase de CSS para que se vea bien
  t.innerText = msg; // Escribimos el mensaje (ej: "AÑADIDO")
  toastContainer.appendChild(t); // Lo metemos al contenedor en la pantalla
  setTimeout(() => t.remove(), 2500); // Esperamos 2500 milisegundos y lo borramos
}

// Quita las marcas rojas de error de los campos del formulario.

// function resetFormErrors() {
//   errorMsg.style.display = "none"; // Escondemos el mensaje de texto de error
//   [inId, inNm, inLn].forEach((input) => {
//     input.classList.remove("error-field"); // Quitamos el borde rojo a cada input
//   });
// }

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
/*
function toggleCart() {
  // 1. Si el menú de navegación está abierto, NO abras el carrito, solo cierra el menú
  const navMenu = document.querySelector(".header__nav");
  if (navMenu && navMenu.classList.contains("nav-visible")) {
    return; // Salimos de la función sin hacer nada con el carrito
  }

  const isActive = sidebar.classList.contains("sidebar--active");
  if (!isActive && cart.length === 0) {
    showToast("LA BOLSA ESTÁ VACÍA");
    return;
  }

  sidebar.classList.toggle("sidebar--active");
  cartOverlay.classList.toggle("overlay--active");
  document.body.classList.toggle("no-scroll");
}*/
/*
function toggleCart() {
  const navMenu = document.querySelector(".header__nav");
  const navOverlay = document.querySelector(".overlay__nav");

  // --- EL CAMBIO ESTÁ AQUÍ ---
  // Si el menú está abierto, lo cerramos pero NO detenemos la ejecución (quitamos el return)
  if (navMenu?.classList.contains("nav-visible")) {
    navMenu.classList.remove("nav-visible");
    navOverlay?.classList.remove("overlay--active");
    // Al no poner 'return', la función sigue y abre el carrito de inmediato
  }

  const isActive = sidebar.classList.contains("sidebar--active");

  if (!isActive && cart.length === 0) {
    showToast("Carrito vacío");
    document.body.classList.remove("no-scroll");

    document.body.style.paddingRight = "0px";
    return;
  }
  resetFormErrors();
  sidebar.classList.toggle("sidebar--active");

  cartOverlay.classList.toggle("overlay--active");

  if (sidebar.classList.contains("sidebar--active")) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");

    document.body.style.paddingRight = "0px";
  }
}*/

function toggleCart() {
  const navMenu = document.querySelector(".header__nav");
  const navOverlay = document.querySelector(".overlay__nav");

  // 1. Si el menú de navegación móvil está abierto, lo cerramos
  if (navMenu?.classList.contains("nav-visible")) {
    navMenu.classList.remove("nav-visible");
    navOverlay?.classList.remove("overlay--active");
    // No ponemos return para que pueda abrir el carrito inmediatamente
  }

  // 2. Limpiamos errores previos del formulario de facturación
  if (typeof resetFormErrors === "function") {
    resetFormErrors();
  }

  // 3. Alternamos las clases de activación del sidebar y el overlay
  sidebar.classList.toggle("sidebar--active");
  cartOverlay.classList.toggle("overlay--active");

  // 4. Lógica de bloqueo de scroll y ajuste de ancho de pantalla
  if (sidebar.classList.contains("sidebar--active")) {
    // Calculamos el ancho de la barra de scroll para evitar el "salto" visual
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add("no-scroll");

    // LLAMADA CLAVE: Forzamos la actualización de la interfaz
    // para que aparezca el mensaje de "Bolsa vacía" si el carrito está en 0.
    updateUI();
  } else {
    // Al cerrar, devolvemos el scroll y el padding a la normalidad
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = "0px";
  }
}

// Cambia la cantidad de un producto (delta puede ser 1 o -1).
/*
function updateQty(id, delta) {
  const item = cart.find((i) => i.id === id); // Busca el producto en el carrito
  if (item) {
    item.qty += delta; // Suma o resta la cantidad
    // Si la cantidad llega a 0 o menos, borramos el producto del carrito.
    if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  }
  // --- NUEVA LÓGICA DE CIERRE AUTOMÁTICO ---
  if (cart.length === 0) {
    clearFormValues();
    // Si el carrito se vació y está abierto, lo cerramos
    if (sidebar.classList.contains("sidebar--active")) {
      toggleCart();
    }
  }

  resetFormErrors();
  updateUI(); // Refrescamos lo que ve el usuario
}*/

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
/*
function updateUI() {
  cartList.innerHTML = ""; // Reseteamos la visual de la lista
  let total = 0;
  let count = 0;

  // Si el carrito está vacío:
  if (cart.length === 0) {
    // Si estaba el panel abierto, lo cerramos por fuerza.
    if (sidebar.classList.contains("sidebar--active")) {
      sidebar.classList.remove("sidebar--active");
      cartOverlay.classList.remove("overlay--active");
      document.body.classList.remove("no-scroll");
      showToast("Carrito vacío");
    }
    clearFormValues(); // Limpiamos el formulario
  }

  // Dibujamos cada ítem que esté en la variable 'cart'
  cart.forEach((i) => {
    total += i.price * i.qty; // Calculamos el precio total acumulado
    count += i.qty; // Sumamos la cantidad total de piezas
    cartList.innerHTML += `
      <div class="cart-item">
        <div class="cart-item__info">
          <p class="cart-item__name">${i.name}</p>
          <p class="cart-item__price">${formatCurrency(i.price)}</p>
        </div>
        <div class="cart-item__controls">
          <div class="qty-selector">
            <button class="qty-selector__btn" onclick="updateQty('${i.id}', -1)">−</button>
            <span class="qty-selector__value">${i.qty}</span>
            <button class="qty-selector__btn" onclick="updateQty('${i.id}', 1)">+</button>
          </div>
          <button class="cart-item__remove" onclick="removeFromCart('${i.id}')">
            <span class="cart__trash-item cart__trash-item--url"></span>
          
            </button>
        </div>
      </div>`;
  });

  // Actualizamos los textos finales en la pantalla
  cartTotal.innerText = formatCurrency(total);
  cartCount.innerText = count;
  // Guardamos la lista actualizada en el navegador para que no se pierda al recargar.
  localStorage.setItem("MINOE_CART", JSON.stringify(cart));
}*/

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
        <p class="cart-empty__message">Tu carrito de compras está vacío</p>
        <a href="#catalogo" class="cart-empty__link" onclick="toggleCart()">Explorar Colección</a>
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
      cartCount.style.fontSize = "0.85em";
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
  /*
  resetFormErrors();
  const idVal = inId.value.trim(); // .trim() quita espacios accidentales al inicio/final
  const nameVal = inNm.value.trim();
  const lastVal = inLn.value.trim();

  // Validación de Identificación: Debe ser Cédula (10) o RUC (13).
  if (idVal.length !== 10 && idVal.length !== 13) {
    inId.classList.add("error-field"); // Ponemos borde rojo
    errorMsg.innerText = "ID debe tener 10 o 13 dígitos";
    errorMsg.style.display = "block";
    inId.focus(); // Ponemos el cursor automáticamente aquí para que el usuario corrija
    return; // Detenemos la función aquí (no se envía nada)
  }

  // Validación de Nombre: Mínimo 2 letras.
  if (nameVal.length < 2) {
    inNm.classList.add("error-field");
    errorMsg.innerText = "Complete nombre";
    errorMsg.style.display = "block";
    inNm.focus();
    return;
  }

  // Validación de Apellido: Mínimo 2 letras.
  if (lastVal.length < 2) {
    inLn.classList.add("error-field");
    errorMsg.innerText = "Complete apellido";
    errorMsg.style.display = "block";
    inLn.focus();
    return;
  }*/
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
  showToast("¡Pedido Enviado!");
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
/*
// Cerrar carrito al hacer click fuera (incluyendo el header)
document.addEventListener("click", (event) => {
  const isCartActive = sidebar.classList.contains("sidebar--active");

  // Si el carrito no está abierto, no hacemos nada
  if (!isCartActive) return;

  // Verificamos si el click fue fuera del sidebar Y fuera del botón que lo abre
  const clickInsideCart = sidebar.contains(event.target);
  const clickOnCartBtn = document
    .getElementById("open-cart")
    .contains(event.target);

  if (!clickInsideCart && !clickOnCartBtn) {
    toggleCart(); // Esto cerrará el carrito y limpiará el overlay/scroll
  }
});*/

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
