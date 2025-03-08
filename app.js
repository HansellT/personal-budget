console.log("<------- Personal Budget -------->");

/**
 * "Como usuario, quiero registrar el nombre, tipo(ingreso ó egreso) y monto 
 * de una compra o ingreso, para llevar un control de mi dinero."
 * Criterios de Aceptación:
 * El sistema solicita el nombre y duración.
 * Si el nombre está vacío o la duración es menor o igual a cero, muestra un mensaje de error.
 * Si los datos son válidos, se guarda la actividad.
 */

// variable global que permite registrar las operaciones
const transacciones = [];

function registrarIngresoOEgreso() {
  while (true) {
    const transaccion = prompt("Ingrese el nombre de la transacción");
    
    // Validar que el nombre no esté vacío
    if (!transaccion) {
      alert("El nombre de la transacción no puede estar vacío. Inténtalo de nuevo.");
      continue; // Volver a solicitar la transacción
    }

    const tipoDeTransaccion = prompt(
      "Escoja el tipo de transacción \n1) Ingreso\n2) Egreso\n\n Solo debe poner el número de la opción"
    );

    // Validar que el tipo de transacción sea válido
    if (tipoDeTransaccion !== '1' && tipoDeTransaccion !== '2') {
      alert("Tipo de transacción no válido. Debe ser 1 o 2. Inténtalo de nuevo.");
      continue; // Volver a solicitar el tipo de transacción
    }

    const monto = parseFloat(prompt("Ingrese el monto de la transacción"));

    // Validar que el monto sea un número y mayor que cero
    if (isNaN(monto) || monto <= 0) {
      alert("El monto debe ser un número mayor que cero. Inténtalo de nuevo.");
      continue; // Volver a solicitar el monto
    }

    // Guardar la transacción
    transacciones.push({
      transaccion,
      tipoDeTransaccion: tipoDeTransaccion === '1' ? 'Ingreso' : 'Egreso', // Convertir a texto
      monto,
    });

    const confirmacion = confirm("¿Desea agregar otra transacción?");
    // Detener el while si el usuario no quiere agregar más transacciones
    if (!confirmacion) {
      break;
    }
  }
}

// Llamar a la función para registrar transacciones
registrarIngresoOEgreso();

// Mostrar las transacciones registradas
console.log("Transacciones registradas:", transacciones);