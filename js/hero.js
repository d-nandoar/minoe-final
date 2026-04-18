/**
 * =================================================MAESTRO HERO SLIDER (VERSIÓN PRECISIÓN DE TEXTO)=================================================
 * El control de pausa (hover) ahora actúa únicamente sobre el bloque de texto (.hero__comtent-list).
 */

// 1. SELECCIÓN DE ELEMENTOS
let items = document.querySelectorAll(".hero__item-list");
let next = document.getElementById("hero__next-arow");
let prev = document.getElementById("hero__prev-arow");
let thumbnails = document.querySelectorAll(".hero__item-thumbnail");

// SELECCIÓN DE LAS CAJAS DE TEXTO: Aplicamos el hover a todas las cajas de contenido
const cajasDeTexto = document.querySelectorAll(".hero__comtent-list");

// 2. CONFIGURACIÓN
let countItem = items.length;
let itemActive = 0;
let tiempoLectura = 10000;
let refreshInterval;

/**
 * 3. MOTOR DEL TIEMPO (AutoRun)
 */
function iniciarAutoRun() {
  clearInterval(refreshInterval);

  // Verificamos si alguna de las cajas de texto tiene el mouse encima
  // Usamos Array.from para poder usar "some", que devuelve true si al menos una caja tiene hover
  const mouseSobreTexto = Array.from(cajasDeTexto).some((caja) =>
    caja.matches(":hover"),
  );

  if (!mouseSobreTexto) {
    refreshInterval = setInterval(() => {
      moverSiguiente();
    }, tiempoLectura);
  }
}

function detenerAutoRun() {
  clearInterval(refreshInterval);
}

/**
 * 4. FUNCIONES DE MOVIMIENTO
 */
function moverSiguiente() {
  itemActive = (itemActive + 1) % countItem;
  showSlider();
}

function moverAnterior() {
  itemActive = (itemActive - 1 + countItem) % countItem;
  showSlider();
}

/**
 * 5. CONTROL DE EVENTOS DE MOUSE (ESPECÍFICO PARA TEXTO)
 * Recorremos todas las cajas de texto para asignarles la pausa individualmente.
 */
cajasDeTexto.forEach((caja) => {
  caja.addEventListener("mouseenter", () => {
    detenerAutoRun();
    // console.log("Pausa: Mouse sobre el texto.");
  });

  caja.addEventListener("mouseleave", () => {
    iniciarAutoRun();
    // console.log("Reanudado: Mouse fuera del texto.");
  });
});

/**
 * 6. EVENTOS DE CLIC
 */
next.onclick = () => moverSiguiente();
prev.onclick = () => moverAnterior();

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

/**
 * 7. ACTUALIZACIÓN VISUAL (showSlider)
 */
function showSlider() {
  // Quitar estados activos
  let itemActiveOld = document.querySelector(".hero__item-list--active");
  let thumbnailActiveOld = document.querySelector(
    ".hero__item-thumbnail--active",
  );

  if (itemActiveOld) itemActiveOld.classList.remove("hero__item-list--active");
  if (thumbnailActiveOld)
    thumbnailActiveOld.classList.remove("hero__item-thumbnail--active");

  // Activar nuevos estados
  items[itemActive].classList.add("hero__item-list--active");
  thumbnails[itemActive].classList.add("hero__item-thumbnail--active");

  // Al cambiar, intentamos reiniciar el automático
  iniciarAutoRun();
}

// 8. ARRANQUE INICIAL
// iniciarAutoRun();

// 8. ARRANQUE EN ESPERA
// El slider no se moverá hasta que el preloader le de la orden
window.addEventListener("paginaRevelada", () => {
  console.log("Minoe Luxury: Iniciando Slider...");
  // iniciarAutoRun();

  // 1. Seleccionamos el contenedor principal del hero
  const heroContainer = document.querySelector(".hero");

  // 2. Le ponemos la clase que quita la invisibilidad
  if (heroContainer) {
    heroContainer.classList.add("hero-revelado");
  }

  // 3. Iniciamos el movimiento automático después de que termine de aparecer
  setTimeout(() => {
    iniciarAutoRun();
  }, 2000);
});
