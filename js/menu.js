/*
    selección de elementos del DOM
*/

const overlay = document.querySelector(".overlay__nav"); //overlay
const navToggle = document.querySelector(".header__hamb"); //hamb
const cartToggle = document.querySelector(".header__cart"); //cart
const navMenu = document.querySelector(".header__nav"); //nav principal
const cartAside = document.querySelector(".cart__contenedor"); //nav principal
const btnSubmenu = document.querySelector(".header__btn-submenu"); //btn sub-menú
const subMenu = document.querySelector(".header__submenu"); //ul sub-menú
const arrow = document.querySelector(".header__arrow-icon"); //arrow sub-menú
const navLinks = document.querySelectorAll(".header__a, .header__a-submenu"); //links a y sub a
const logo = document.getElementById("header__logo-a"); //logo
const inicioLink = document.getElementById("header__a"); //id inicio
const sections = document.querySelectorAll("section"); //class sections
let estaNavegandoPorClick = false;

// Al abrir el menú (click en hamb)
// Modifica el evento del navToggle
// Dentro de menu.js
navToggle.addEventListener("click", () => {
  // 1. LIMPIEZA: Si el carrito está abierto, lo cerramos antes de abrir el menú
  const sidebar = document.getElementById("sidebar");
  const cartOverlay = document.getElementById("overlay__cart");

  if (sidebar && sidebar.classList.contains("sidebar--active")) {
    sidebar.classList.remove("sidebar--active");
    cartOverlay?.classList.remove("overlay--active");
    // No quitamos no-scroll aquí porque el menú lo va a necesitar a continuación
  }

  // 2. Lógica normal de tu menú
  navMenu.classList.toggle("nav-visible");
  overlay.classList.toggle("overlay--active");

  // 3. Gestión de scroll
  if (navMenu.classList.contains("nav-visible")) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");

    document.body.style.paddingRight = "0px";
  }
});

/*
    abrir sub-menú en móvil y pantalla grande
    click en btn-submenu
*/

btnSubmenu.addEventListener("click", () => {
  //   solo para móvil
  /*
    if (window.innerWidth <= 768) {
        subemenu.classList.toggle("submenu-open");
        arrow.classList.toggle("arrow-rotae");
    }
  */

  subMenu.classList.toggle("submenu-open");
  arrow.classList.toggle("arrow-rotate");
});

/*
    cierre del menú al hacer click en cualquier link
    que no sea el de abrir sub-menú (.btn-submenu)
*/

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-visible");
    // Al cerrar el menú (en el forEach de navLinks y el click en document)
    // Asegúrate de incluir esta línea siempre que quites la clase 'nav-visible':
    document.body.classList.remove("no-scroll");
    overlay.classList.remove("overlay--active");

    // cierra el sub-menú para que esté cerrado la próxima vez
    subMenu.classList.remove("submenu-open");
    arrow.classList.remove("arrow-rotate");
  });
});

/*
    cierre del menú al hacer click en cualquier
    lugar fuera del menú principal y del hamb
*/

document.addEventListener("click", (event) => {
  const isClickInsideMenu = navMenu.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);

  //   menú y sub-menú en móvil
  if (
    !isClickInsideMenu &&
    !isClickOnToggle &&
    navMenu.classList.contains("nav-visible")
  ) {
    navMenu.classList.remove("nav-visible");
    // Al cerrar el menú (en el forEach de navLinks y el click en document)
    // Asegúrate de incluir esta línea siempre que quites la clase 'nav-visible':
    document.body.classList.remove("no-scroll");
    overlay.classList.remove("overlay--active");
    subMenu.classList.remove("submenu-open");
    arrow.classList.remove("arrow-rotate");
  }

  // sub-menú en pantalla grande
  if (
    !isClickInsideMenu &&
    !isClickOnToggle &&
    subMenu.classList.contains("submenu-open")
  ) {
    subMenu.classList.remove("submenu-open");
    arrow.classList.remove("arrow-rotate");
  }
});

// marcar los links activos

function activarLink(target) {
  if (!target) return; // Seguridad: Si no hay target, no hacemos nada

  navLinks.forEach((l) => l.classList.remove("a--active"));
  btnSubmenu.classList.remove("a--active");
  arrow.classList.remove("arrow--active");

  // console.log(target);

  target.classList.add("a--active"); //target contiene el link a activar

  if (target.classList.contains("header__a-submenu")) {
    btnSubmenu.classList.add("a--active");
    arrow.classList.add("arrow--active");
  }
}

// F5/Carga --------------------------------

// Evitar que el navegador salte a la última posición de scroll conocida

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Al cargar o recargar, forzar el inicio

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  // Si la URL tiene un #algo, lo limpiamos para que el próximo click funcione
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  activarLink(inicioLink);
});

//------------------------------------------

// links y logo ----------------------------

// Función para navegar suavemente y limpiar rastro de URL

// menu.js
function navegarA(idDestino, elementoLink) {
  // Lista de tus categorías dinámicas
  const categorias = ["#joyeria", "#studio", "#gourmet", "#regalos"];

  // Si el destino es una categoría, el objetivo real del scroll es la sección #catalogo
  let objetivoReal = idDestino;
  if (categorias.includes(idDestino)) {
    objetivoReal = "#catalogo";
  }

  const seccion = document.querySelector(objetivoReal);

  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth", block: "start" });
    activarLink(elementoLink);
    history.pushState(null, null, idDestino);
  }
}

// --- EVENTO PARA EL LOGO ---

logo.addEventListener("click", (e) => {
  e.preventDefault();
  // Navegamos al inicio (puedes usar un ID #inicio o simplemente subir al 0,0)
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Limpiamos la URL (quitamos el #contacto, etc)
  history.pushState(null, null, window.location.pathname);

  activarLink(inicioLink);
});

// --- EVENTO PARA LOS LINKS ---

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Solo si es un link interno que empieza con #
    if (href && href.startsWith("#")) {
      e.preventDefault();
      navegarA(href, link);
    }
  });
});

//------------------------------------------

window.addEventListener("scroll", () => {
  let seccionActual = "";
  const pixelesDeMargen = 150;
  const secciones = document.querySelectorAll("section[id]");

  // 1. Detección de secciones físicas (Inicio, Nosotros, Contacto, Catalogo)
  secciones.forEach((seccion) => {
    const seccionTop = seccion.offsetTop;
    if (window.pageYOffset >= seccionTop - pixelesDeMargen) {
      seccionActual = seccion.getAttribute("id");
    }
  });

  // 2. Traducción de "Catalogo" a "Categoría Específica"
  if (seccionActual === "catalogo") {
    const catalogContainer = document.getElementById("catalogo");

    // Buscamos la clase que termina en el nombre de la categoría (ej. catalog__container--joyeria)
    const claseCategoria = Array.from(catalogContainer.classList).find((cls) =>
      cls.includes("catalog__container--"),
    );

    if (claseCategoria) {
      // Extraemos "joyeria", "studio", etc.
      seccionActual = claseCategoria.split("--")[1];
    }
  }

  // 3. Gestión de Inicio
  if (window.pageYOffset < 100) {
    activarLink(inicioLink);
    return;
  }

  // 4. Activación visual del link
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    // Ahora, si seccionActual es "joyeria", coincidirá con el href="#joyeria" del submenú
    if (href === `#${seccionActual}`) {
      activarLink(link);
    }
  });
});
