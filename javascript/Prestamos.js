// Constantes y arrays
const tasaInteres = 0.1;

// localStorage
const historialPrestamos = JSON.parse(localStorage.getItem('historialPrestamos')) || [];

// DOM
const formularioPrestamo = document.getElementById('prestamo-form');
const inputNombre = document.getElementById('nombre');
const inputMonto = document.getElementById('monto');
const selectCuotas = document.getElementById('cuotas');
const divResultado = document.getElementById('resultado-prestamo');

// --- Funciones del simulador ---

/**
 * Calcula el préstamo y muestra el resultado en el DOM.
 * @param {string} nombre - Nombre del solicitante.
 * @param {number} monto - Monto del préstamo.
 * @param {number} cuotas - Número de cuotas.
 */
function calcularYMostrarPrestamo(nombre, monto, cuotas) {
    const interesTotal = monto * tasaInteres * cuotas;
    const totalAPagar = monto + interesTotal;
    const cuotaMensual = totalAPagar / cuotas;

    // Crea un nuevo objeto de préstamo
    const nuevoPrestamo = {
        nombre: nombre,
        monto: monto,
        cuotas: cuotas,
        totalAPagar: totalAPagar.toFixed(2),
        cuotaMensual: cuotaMensual.toFixed(2),
        fecha: new Date().toLocaleString()
    };

    // Agrega el nuevo préstamo al historial
    historialPrestamos.push(nuevoPrestamo);

    // Guarda el historial actualizado en localStorage
    guardarHistorial();

    // Muestra el resultado en la página
    divResultado.innerHTML = `
        <p><strong>Préstamo para:</strong> ${nombre}</p>
        <p><strong>Monto solicitado:</strong> $${monto.toFixed(2)}</p>
        <p><strong>Cuotas:</strong> ${cuotas}</p>
        <p><strong>Interés total:</strong> $${interesTotal.toFixed(2)}</p>
        <p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>
        <p><strong>Valor de cada cuota:</strong> $${cuotaMensual.toFixed(2)}</p>
    `;
}

/**
 * Guarda el historial de préstamos en el almacenamiento local.
 */
function guardarHistorial() {
    localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
    console.log('Historial de préstamos guardado:', historialPrestamos);
}

/**
 * Limpia los campos del formulario.
 */
function limpiarFormulario() {
    formularioPrestamo.reset();
}

// --- Event Listeners ---

formularioPrestamo.addEventListener('submit', function(evento) {
    // Evita que el formulario se envíe y recargue la página
    evento.preventDefault();

    // Obtiene los valores de los campos del formulario
    const nombre = inputNombre.value;
    const monto = parseFloat(inputMonto.value);
    const cuotas = parseInt(selectCuotas.value);

    // función para calcular y mostrar el préstamo
    calcularYMostrarPrestamo(nombre, monto, cuotas);

    // Limpia el formulario
    limpiarFormulario();
});