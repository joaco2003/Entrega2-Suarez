// Constantes y arrays
const tasaInteres = 0.1;
const cuotasDisponibles = [3, 6, 12,];

//solicitar datos al usuario
function solicitarDatos() {
  const nombre = prompt("Ingrese su nombre y apellido:");
  const monto = parseFloat(prompt("Ingrese el monto del préstamo que desea:"));
  return { nombre, monto };
}

// elegir cuotas
function elegirCuotas() {
  let mensaje = "Seleccione la cantidad de cuotas:\n";
  cuotasDisponibles.forEach((cuota, i) => {
    mensaje += `${i + 1}. ${cuota} cuotas\n`;
  });

  let opcion = parseInt(prompt(mensaje));
  while (isNaN(opcion) || opcion < 1 || opcion > cuotasDisponibles.length) {
    opcion = parseInt(prompt("Opción no válida. Intente nuevamente:\n" + mensaje));
  }

  return cuotasDisponibles[opcion - 1];
}

// calcular total e informar
function calcularPrestamo(nombre, monto, cuotas) {
  const interesTotal = monto * tasaInteres * cuotas;
  const totalPagar = monto + interesTotal;
  const cuotaMensual = totalPagar / cuotas;

  alert(`Préstamo confirmado para ${nombre}.\n` +
        `Monto solicitado: $${monto.toFixed(2)}\n` +
        `Cuotas: ${cuotas}\n` +
        `Interés total: $${interesTotal.toFixed(2)}\n` +
        `Total a pagar: $${totalPagar.toFixed(2)}\n` +
        `Valor de cada cuota: $${cuotaMensual.toFixed(2)}`);

  console.log("---- DETALLE DEL PRÉSTAMO ----");
  console.log("Cliente:", nombre);
  console.log("Monto solicitado:", monto);
  console.log("Cuotas:", cuotas);
  console.log("Interés total:", interesTotal);
  console.log("Total a pagar:", totalPagar);
  console.log("Valor de cada cuota:", cuotaMensual);
}

//Principal
function iniciarSimulador() {
  alert("Bienvenido al simulador de préstamos.");
  let continuar = true;

  while (continuar) {
    const { nombre, monto } = solicitarDatos();
    const cuotas = elegirCuotas();
    calcularPrestamo(nombre, monto, cuotas);

    continuar = confirm("¿Desea simular otro préstamo?");
  }

  alert("Gracias por utilizar el simulador.");
}

// Iniciar
iniciarSimulador();

