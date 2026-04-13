/**
 * MINOE LUXURY CATALOG 2026
 * Módulo: Carrito de Compras Completo
 * Ajustes: Corrección de validación con focus automático y catálogo expandido.
 */

// 1. BASE DE DATOS DE PRODUCTOS (10 por categoría)
// Creamos un objeto llamado 'inventory' que actúa como un almacén de datos.
// Cada "llave" (joyeria, studio, etc.) contiene un "arreglo" (lista) de objetos.
const inventory = {
  joyeria: [
    {
      id: "JW-01", // Un identificador único para que el código no se confunda de producto
      name: "Anillo Diamante Real", // Nombre que verá el usuario
      price: 1250, // Precio numérico para poder hacer cálculos matemáticos
      img: "assets/img/jewelry.png", // La ruta de la imagen para mostrarla en el HTML
    },
    {
      id: "JW-02",
      name: "Collar Oro 18k",
      price: 890,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-03",
      name: "Aretes Perla Lux",
      price: 340,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-04",
      name: "Pulsera Tenis Diamantes",
      price: 2100,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-05",
      name: "Reloj Gold Classic",
      price: 560,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-06",
      name: "Anillo Esmeralda",
      price: 950,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-07",
      name: "Gargantilla Plata",
      price: 120,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-08",
      name: "Broche Vintage",
      price: 280,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-09",
      name: "Reloj Black Limited",
      price: 720,
      img: "assets/img/jewelry.png",
    },
    {
      id: "JW-10",
      name: "Pendientes Zafiro",
      price: 1100,
      img: "assets/img/jewelry.png",
    },
  ],
  studio: [
    {
      id: "ST-01",
      name: "Cartera Cuero Grained",
      price: 280,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-02",
      name: "Zapatos Oxford Piel",
      price: 195,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-03",
      name: "Bolso Tote Black",
      price: 150,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-04",
      name: "Cinturón Executive",
      price: 85,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-05",
      name: "Portafolio Minimal",
      price: 210,
      img: "assets/img/studio.png  ",
    },
    {
      id: "ST-06",
      name: "Gafas de Sol Urban",
      price: 120,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-07",
      name: "Clutch Gala Gold",
      price: 320,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-08",
      name: "Sombrero Fedora Piel",
      price: 95,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-09",
      name: "Mocasines Italianos",
      price: 180,
      img: "assets/img/studio.png",
    },
    {
      id: "ST-10",
      name: "Bufanda Cashmere",
      price: 140,
      img: "assets/img/studio.png",
    },
  ],
  licores: [
    {
      id: "LC-01",
      name: "Rompope Vainilla Real",
      price: 35,
      img: "assets/img/gourmet.png ",
    },
    {
      id: "LC-02",
      name: "Rompope Café Espresso",
      price: 35,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-03",
      name: "Whisky Single Malt",
      price: 120,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-04",
      name: "Vino Tinto Reserva",
      price: 45,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-05",
      name: "Ginebra Premium Blue",
      price: 65,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-06",
      name: "Licor de Cacao Lux",
      price: 28,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-07",
      name: "Vodka Artesanal",
      price: 50,
      img: "assets/img/gourmet.png ",
    },
    {
      id: "LC-08",
      name: "Espumante Rosé",
      price: 55,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-09",
      name: "Tequila Añejo Crystal",
      price: 90,
      img: "assets/img/gourmet.png",
    },
    {
      id: "LC-10",
      name: "Ron Añejo 12 años",
      price: 75,
      img: "assets/img/gourmet.png",
    },
  ],
  regalos: [
    {
      id: "RG-01",
      name: "Cesta Gourmet Minoe",
      price: 180,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-02",
      name: "Caja de Bombones Gold",
      price: 45,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-03",
      name: "Kit de Escritorio Piel",
      price: 95,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-04",
      name: "Vela Aromática Black",
      price: 30,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-05",
      name: "Set de Té Imperial",
      price: 110,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-06",
      name: "Agenda Cuero 2026",
      price: 40,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-07",
      name: "Caja de Té de Madera",
      price: 65,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-08",
      name: "Kit Sommelier Silver",
      price: 130,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-09",
      name: "Difusor Ultrasónico",
      price: 75,
      img: "assets/img/fondo.png",
    },
    {
      id: "RG-10",
      name: "Manta de Alpaca",
      price: 220,
      img: "assets/img/fondo.png",
    },
  ],
};

// 2. VARIABLES DE ESTADO
// 'cart' almacena los productos que el usuario elige.
// Intentamos cargar lo que hay en localStorage (memoria del navegador); si está vacío, usamos una lista vacía [].
let cart = JSON.parse(localStorage.getItem("MINOE_CART")) || [];
// Constante con el número de teléfono para el mensaje de WhatsApp.
const WHATSAPP_NUM = "593994831087";

// 3. REFERENCIAS AL DOM
// Usamos 'document.getElementById' para "atrapar" los elementos del HTML y poder controlarlos con JS.
const productContainer = document.getElementById("product-container"); // Donde se muestran los productos
const cartList = document.getElementById("cart-list"); // Lista de ítems dentro del carrito
const cartTotal = document.getElementById("cart-total"); // El precio total acumulado
const cartCount = document.getElementById("cart-count"); // El circulito rojo con el número de productos
const sidebar = document.getElementById("sidebar"); // El panel lateral del carrito
const overlay = document.getElementById("overlay"); // El fondo oscuro detrás del carrito
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
function resetFormErrors() {
  errorMsg.style.display = "none"; // Escondemos el mensaje de texto de error
  [inId, inNm, inLn].forEach((input) => {
    input.classList.remove("error-field"); // Quitamos el borde rojo a cada input
  });
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

// --- LÓGICA DEL CARRITO ---

// Esta función dibuja las tarjetas de productos en el catálogo según la categoría elegida.
function renderProducts(cat) {
  productContainer.innerHTML = ""; // Vaciamos el catálogo antes de mostrar los nuevos
  // Actualizamos el título de la sección (ej: "COLECCIÓN JOYERÍA")
  document.getElementById("category-display").innerText =
    `Colección ${cat.toUpperCase()}`;

  // Si la categoría no existe en nuestro 'inventory', no hacemos nada más.
  if (!inventory[cat]) return;

  // Recorremos la lista de productos de esa categoría
  inventory[cat].forEach((p) => {
    // Por cada producto, inyectamos un bloque de código HTML al contenedor
    productContainer.innerHTML += `
      <article class="product-card">
        <img src="${p.img}" class="product-card__img" alt="${p.name}">
        <div class="product-card__content">
          <p class="product-card__sku">SKU: ${p.id}</p>
          <h4 class="product-card__name">${p.name}</h4>
          <p class="product-card__price">${formatCurrency(p.price)}</p>
          <button class="product-card__btn-add" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">AÑADIR A BOLSA</button>
        </div>
      </article>`;
  });
}

// Abre o cierra el carrito lateral.
function toggleCart() {
  const isActive = sidebar.classList.contains("sidebar--active");
  // Si el carrito está cerrado y está vacío, no permitimos que se abra.
  if (!isActive && cart.length === 0) {
    showToast("LA BOLSA ESTÁ VACÍA");
    return;
  }
  resetFormErrors(); // Limpia errores antes de abrir/cerrar
  // 'toggle' pone la clase si no la tiene, y la quita si ya la tiene.
  sidebar.classList.toggle("sidebar--active");
  overlay.classList.toggle("overlay--active");
  document.body.classList.toggle("no-scroll"); // Evita que la página de atrás se mueva
}

// Cambia la cantidad de un producto (delta puede ser 1 o -1).
function updateQty(id, delta) {
  const item = cart.find((i) => i.id === id); // Busca el producto en el carrito
  if (item) {
    item.qty += delta; // Suma o resta la cantidad
    // Si la cantidad llega a 0 o menos, borramos el producto del carrito.
    if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  }
  resetFormErrors();
  updateUI(); // Refrescamos lo que ve el usuario
}

// Elimina un producto específico del carrito sin importar la cantidad.
function removeFromCart(id) {
  // 'filter' crea una nueva lista excluyendo al producto que tenga ese ID.
  cart = cart.filter((i) => i.id !== id);
  resetFormErrors();
  updateUI();
}

// Añade un producto a la lista del carrito.
function addToCart(id, name, price) {
  const exist = cart.find((i) => i.id === id); // ¿Ya estaba en el carrito?
  // Si existe, le sumamos 1 a la cantidad. Si no, lo agregamos como un objeto nuevo.
  exist ? exist.qty++ : cart.push({ id, name, price, qty: 1 });
  updateUI();
  showToast("AÑADIDO");
}

// Esta función es el corazón visual: actualiza los totales, el contador y la lista del carrito.
function updateUI() {
  cartList.innerHTML = ""; // Reseteamos la visual de la lista
  let total = 0;
  let count = 0;

  // Si el carrito está vacío:
  if (cart.length === 0) {
    // Si estaba el panel abierto, lo cerramos por fuerza.
    if (sidebar.classList.contains("sidebar--active")) {
      sidebar.classList.remove("sidebar--active");
      overlay.classList.remove("overlay--active");
      document.body.classList.remove("no-scroll");
      showToast("BOLSA VACÍA");
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
            <svg class="cart-item__remove-svg" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </div>`;
  });

  // Actualizamos los textos finales en la pantalla
  cartTotal.innerText = formatCurrency(total);
  cartCount.innerText = count;
  // Guardamos la lista actualizada en el navegador para que no se pierda al recargar.
  localStorage.setItem("MINOE_CART", JSON.stringify(cart));
}

// --- VALIDACIÓN Y ENVÍO (CORREGIDO FOCUS) ---

// Esta función se activa al dar click en "FINALIZAR PEDIDO".
function sendWhatsApp() {
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
  showToast("¡PEDIDO ENVIADO!");
}

// --- EVENTOS ---
// Aquí asignamos las funciones a los botones físicos de la página.

// Escuchamos clicks en el menú de categorías
document.getElementById("category-filters").addEventListener("click", (e) => {
  // Si el elemento clickeado tiene un ID que empieza con "filter-"
  if (e.target.id && e.target.id.startsWith("filter-")) {
    e.preventDefault(); // Evitamos que la página recargue o salte
    // Sacamos la palabra después del guion (ej: de "filter-joyeria" sacamos "joyeria")
    renderProducts(e.target.id.split("-")[1]);
  }
});

// Escuchamos clicks en el contenedor de productos (técnica de delegación de eventos)
productContainer.addEventListener("click", (e) => {
  // Solo si el click fue en un botón de añadir
  if (e.target.classList.contains("product-card__btn-add")) {
    const d = e.target.dataset; // Leemos los atributos 'data-' que pusimos en el HTML
    addToCart(d.id, d.name, parseFloat(d.price));
  }
});

// Botón para abrir el carrito
document.getElementById("open-cart").addEventListener("click", toggleCart);
// Click en el fondo oscuro para cerrar el carrito
overlay.addEventListener("click", toggleCart);
// Botón de "Vaciar Bolsa" (el icono del tacho de basura grande)
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = []; // Vaciamos la lista
  updateUI(); // Refrescamos la pantalla
});
// Botón de finalizar pedido
document.getElementById("whatsapp-btn").addEventListener("click", sendWhatsApp);

// Al terminar de cargar la página:
window.onload = () => {
  updateUI(); // Cargamos el carrito de la sesión anterior si existe
  renderProducts("joyeria"); // Mostramos joyería al inicio por defecto
  setupInputConstraints(); // Activamos las restricciones de escritura en los inputs
};
