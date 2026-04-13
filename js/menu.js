/*
    selección de elementos del DOM
*/

const overlay = document.querySelector(".overlay"); //overlay
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

/*
    abrir el menú principal en móvil
    click en hamb
*/

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-visible");
  overlay.classList.toggle("overlay-active");
});

/*
    abrir el carrito
    click en cart
*/

cartToggle.addEventListener("click", () => {
  cartAside.classList.toggle("cart-visible");
  overlay.classList.toggle("overlay-active");
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
    overlay.classList.remove("overlay-active");

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
    overlay.classList.remove("overlay-active");
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

/*
    cierre del carrito al hacer click en cualquier
    lugar fuera del carrito y del cart
*/

document.addEventListener("click", (event) => {
  const isClickInsideCart = cartAside.contains(event.target);
  const isClickOnToggle = cartToggle.contains(event.target);

  //   menú y sub-menú en móvil
  if (
    !isClickInsideCart &&
    !isClickOnToggle &&
    cartAside.classList.contains("cart-visible")
  ) {
    cartAside.classList.remove("cart-visible");
    overlay.classList.remove("overlay-active");
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

function navegarA(idDestino, elementoLink) {
  const seccion = document.querySelector(idDestino);

  if (seccion) {
    // 1. Scroll suave
    seccion.scrollIntoView({ behavior: "smooth", block: "start" });

    // 2. Marcar visualmente (tu función actual)
    activarLink(elementoLink);

    // 3. Actualizar URL de forma limpia
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
  const pixelesDeMargen = 150; // Ajusta este número según el alto de tu menú (header)

  // 1. Detectar qué sección está cruzando la línea de visión
  const secciones = document.querySelectorAll("section[id]"); // Busca todas las secciones con ID

  secciones.forEach((seccion) => {
    const seccionTop = seccion.offsetTop;
    // Si el scroll bajó más allá del inicio de la sección (menos el margen del header)
    if (window.pageYOffset >= seccionTop - pixelesDeMargen) {
      seccionActual = seccion.getAttribute("id");
    }
  });

  // 2. Si estamos muy arriba, marcar siempre "Inicio"
  if (window.pageYOffset < 100) {
    activarLink(inicioLink);
    // Opcional: Limpiar el hash de la URL si el usuario sube manualmente
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
    return;
  }

  // 3. Buscar el link que coincide con la sección detectada y activarlo
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${seccionActual}`) {
      activarLink(link);
    }
  });
});
