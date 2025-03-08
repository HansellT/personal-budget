console.log("<------- Personal Budget -------->");

// Variable global que permite registrar las operaciones
const transacciones = [];

function registrarIngresoOEgreso() {
  while (true) {
    const transaccion = prompt("Ingrese el nombre de la transacción");

    // Validar que el nombre no esté vacío
    if (!transaccion) {
      alert("El nombre de la transacción no puede estar vacío. Inténtalo de nuevo.");
      continue;
    }

    const tipoDeTransaccion = prompt(
      "Escoja el tipo de transacción \n1) Ingreso\n2) Egreso\n\n Solo debe poner el número de la opción"
    );

    // Validar que el tipo de transacción sea válido
    if (tipoDeTransaccion !== '1' && tipoDeTransaccion !== '2') {
      alert("Tipo de transacción no válido. Debe ser 1 o 2. Inténtalo de nuevo.");
      continue;
    }

    const monto = parseFloat(prompt("Ingrese el monto de la transacción"));

    // Validar que el monto sea un número y mayor que cero
    if (isNaN(monto) || monto <= 0) {
      alert("El monto debe ser un número mayor que cero. Inténtalo de nuevo.");
      continue;
    }

    // Guardar la transacción
    transacciones.push({
      transaccion,
      tipoDeTransaccion: tipoDeTransaccion === '1' ? 'Ingreso' : 'Egreso',
      monto,
    });

    const confirmacion = confirm("¿Desea agregar otra transacción?");
    if (!confirmacion) {
      break;
    }
  }
}

// Llamar a la función para registrar transacciones
registrarIngresoOEgreso();

// Función para obtener una lista de nombres de transacciones
function obtenerListaDeTransacciones() {
  const listaDeTransacciones = transacciones.map(transaccion => transaccion.transaccion);
  console.log("Lista de transacciones:", listaDeTransacciones);
  return listaDeTransacciones;
}

// Función para obtener gastos mayores a 100
function obtenerGastosMayoresA100() {
  const gastosMayoresA100 = transacciones.filter(transaccion =>
    transaccion.tipoDeTransaccion === 'Egreso' && transaccion.monto > 100
  );
  console.log("Gastos mayores a $100:", gastosMayoresA100);
  return gastosMayoresA100;
}

// Función para buscar una transacción por su nombre
function buscarTransaccionPorNombre(nombre) {
  const transaccionEncontrada = transacciones.find(transaccion => transaccion.transaccion === nombre);

  if (!transaccionEncontrada) {
    console.log(`No se encontró una transacción con el nombre "${nombre}".`);
    return null;
  }

  console.log("Transacción encontrada:", transaccionEncontrada);
  return transaccionEncontrada;
}

// Mostrar las transacciones registradas en la consola
console.log("Transacciones registradas:", transacciones);