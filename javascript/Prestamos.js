// variables
const tasaInteres = 0.1;

const historialPrestamos = JSON.parse(localStorage.getItem('historialPrestamos')) || [];

const formularioPrestamo = document.getElementById('prestamo-form');
const inputNombre = document.getElementById('nombre');
const inputMonto = document.getElementById('monto');
const selectCuotas = document.getElementById('cuotas');
const divResultado = document.getElementById('resultado-prestamo');
// funcion para mostar el prestamo
function calcularYMostrarPrestamo(nombre, monto, cuotas) {
    if (!nombre || monto <= 0 || cuotas <= 0) {
        // Bloque 'if': Se ejecuta si los datos no son correctos
        divResultado.innerHTML = `completa todos los campos correctamente.</p>`;
    } else {
        // Bloque 'else': Se ejecuta si los datos son corrrectos
        const interesTotal = monto * tasaInteres * cuotas;
        const totalAPagar = monto + interesTotal;
        const cuotaMensual = totalAPagar / cuotas;

        const nuevoPrestamo = {
            nombre: nombre,
            monto: monto,
            cuotas: cuotas,
            totalAPagar: totalAPagar.toFixed(2),
            cuotaMensual: cuotaMensual.toFixed(2),
            fecha: new Date().toLocaleString()
        };

        historialPrestamos.push(nuevoPrestamo);
        guardarHistorial();

        divResultado.innerHTML = `
            <p>Préstamo para: ${nombre}</p>
            <p>Monto: $${monto.toFixed(2)}</p>
            <p>Cuotas: ${cuotas}</p>
            <p>Total a pagar: $${totalAPagar.toFixed(2)}</p>
            <p>Cuota mensual: $${cuotaMensual.toFixed(2)}</p>
        `;

        TablaHistorial(historialPrestamos);
    }
}
// guardar historial
function guardarHistorial() {
    try {
        localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
    } catch (error) {
        console.error('Ocurrió un error al guardar el historial:', error);
    } finally {
        console.log('El intento de guardar el historial ha finalizado.');
    }
}
//limpia el historial
function limpiarFormulario() {
    formularioPrestamo.reset();
}

formularioPrestamo.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value;
    const monto = parseFloat(inputMonto.value);
    const cuotas = parseInt(selectCuotas.value);

    calcularYMostrarPrestamo(nombre, monto, cuotas);
    limpiarFormulario();
});