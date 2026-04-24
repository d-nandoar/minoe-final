/**
 * LÓGICA PARA EL ENVÍO DE FORMULARIO A WHATSAPP
 * 
 * Este script escucha el evento de envío del formulario, recolecta los datos,
 * los formatea en un mensaje legible y redirige al usuario a la API de WhatsApp.
 */

// 1. Seleccionamos el formulario por su ID y añadimos un "escuchador de eventos" (EventListener)
// El evento 'submit' ocurre cuando el usuario hace clic en el botón de enviar.
document.getElementById('whatsappForm').addEventListener('submit', function(event) {
    
    // 2. Prevenimos el comportamiento por defecto del formulario.
    // Por defecto, un formulario recarga la página al enviarse. 'preventDefault' evita esto
    // para que podamos manejar el envío con nuestra propia lógica de JavaScript.
    event.preventDefault();

    /**
     * 3. RECOLECCIÓN DE DATOS
     * Usamos document.getElementById('id').value para obtener el texto que el usuario escribió.
     */
    const nombre = document.getElementById('nombre').value;       // Captura el nombre
    const apellidos = document.getElementById('apellidos').value; // Captura los apellidos
    const telefono = document.getElementById('telefono').value;   // Captura el número de contacto
    const email = document.getElementById('email').value;         // Captura el correo electrónico
    const motivo = document.getElementById('motivo').value;       // Captura el mensaje del textarea

    /**
     * 4. CONFIGURACIÓN DEL DESTINATARIO
     * Aquí se define el número de teléfono que recibirá el mensaje.
     * IMPORTANTE: Debe incluir el código de país (ej: 34 para España, 52 para México) 
     * y NO debe incluir el signo '+' ni espacios.
     */
    const numeroWhatsApp = "+593994831087"; // <-- REEMPLAZAR CON TU NÚMERO REAL

    /**
     * 5. FORMATEO DEL MENSAJE
     * Creamos una cadena de texto (string) con el formato deseado.
     * - Usamos asteriscos (*) para que WhatsApp ponga el texto en negrita.
     * - '%0A' es el código de codificación URL para un "salto de línea" (Enter).
     */
    const mensaje = `*Nuevo Contacto*%0A%0A` +
                    `*Nombre:* ${nombre} ${apellidos}%0A` +
                    `*Teléfono:* ${telefono}%0A` +
                    `*Email:* ${email}%0A` +
                    `*Motivo:* ${motivo}`;

    /**
     * 6. CONSTRUCCIÓN DE LA URL DE WHATSAPP
     * La API de WhatsApp utiliza una URL con parámetros:
     * - 'wa.me/numero' indica a quién enviar.
     * - '?text=mensaje' indica el contenido del mensaje.
     */
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    /**
     * 7. REDIRECCIÓN
     * window.open abre la URL generada. 
     * El parámetro '_blank' asegura que se abra en una nueva pestaña o ventana,
     * permitiendo que el usuario no pierda de vista tu sitio web original.
     */
    window.open(url, '_blank');
});
