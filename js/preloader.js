window.addEventListener("load", () => {
  // 5 segundos de espera para la coreografía lenta (logo/textos)
  setTimeout(() => {
    document.body.classList.add("loaded");

    // Tiempo que tarda el cierre verde en expandirse y retirarse
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
      document.body.classList.add("loaded-complete");

      // ENVIAR SEÑAL AL HERO
      const eventoRevelado = new CustomEvent("paginaRevelada");
      window.dispatchEvent(eventoRevelado);
    }, 1500); // Sincronizado con la transición de 2.2s del CSS
  }, 8000);
});
