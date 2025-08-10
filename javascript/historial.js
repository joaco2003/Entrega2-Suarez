
const divHistorial = document.getElementById('historial-prestamos');
const botonBorrarHistorial = document.getElementById('Borrar-historial');

// La función para préstamos en una tabla.
function TablaHistorial(prestamos) {
    if (prestamos.length === 0) {
        divHistorial.innerHTML = '<p> historial vacio</p>';
        return;
    }

    let filasHTML = '';
    //ciclo for
    for (let i = 0; i < prestamos.length; i++) {
        const prestamo = prestamos[i];
        filasHTML += `
            <tr>
                <td>${prestamo.nombre}</td>
                <td>$${parseFloat(prestamo.monto).toFixed(2)}</td>
                <td>${prestamo.cuotas}</td>
                <td>$${prestamo.totalAPagar}</td>
                <td>$${prestamo.cuotaMensual}</td>
                <td>${prestamo.fecha}</td>
            </tr>
        `;
    }

    // HTML que genera en el ciclo.
    const tablaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Monto</th>
                    <th>Cuotas</th>
                    <th>Total a pagar</th>
                    <th>Cuota mensual</th>
                    <th>fecha</th>
                </tr>
            </thead>
            <tbody>
                ${filasHTML}
            </tbody>
        </table>
    `;
    divHistorial.innerHTML = tablaHTML;
}

// Esta función vacía todo el historial.
function BorrarHistorial() {
    // Usamos SweetAlert2 para preguntar al usuario si está seguro.
    Swal.fire({
        title: '¿lo desea borrar?',
        text: '¡No podrás volver a ver el historial!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrarlo',
        cancelButtonColor: '#d33',
        
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear(); 
            historialPrestamos.length = 0;
            TablaHistorial(historialPrestamos);
            Swal.fire('El historial se borro correctamente.');
        }
    });
}

// borra el historial.
botonBorrarHistorial.addEventListener('click', BorrarHistorial);

// Cuando la página se carga, llamamos a TablarHistorial para mostrar lo que haya guardado.
document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos el historial del localStorage al cargar la página
    const historialGuardado = JSON.parse(localStorage.getItem('historialPrestamos')) || [];
    TablaHistorial(historialGuardado);
});