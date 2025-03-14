console.log("<------- Personal Budget -------->");

// Seleccionar elementos del DOM
const form = document.querySelector("#transaction-form");
const transactionList = document.querySelector("#transaction-list");
const balanceEl = document.querySelector("#balance");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const submitButton = document.querySelector("#transaction-form button");

// Arreglo de transacciones
const transacciones = [];
let editIndex = null; // Índice de la transacción en edición

class Movimiento {
  constructor(tipo, monto, descripcion) {
    this.tipo = tipo; // 'income' o 'expense'
    this.monto = parseFloat(monto).toFixed(2); // Se fuerza a 2 decimales
    this.descripcion = descripcion;
    this.fecha = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  validarMovimiento() {
    if (!this.descripcion.trim()) {
      return { ok: false, message: "La descripción no puede estar vacía." };
    }
    if (isNaN(this.monto) || this.monto <= 0) {
      return { ok: false, message: "El monto debe ser un número mayor que cero." };
    }
    return { ok: true };
  }

  render(index) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">
        <span class="px-2 py-1 rounded-lg ${this.tipo === "income" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}">
          ${this.descripcion}
        </span>
      </td>
      <td class="px-6 py-4 ${this.tipo === "income" ? "text-green-600" : "text-red-600"}">
        $${this.monto}
      </td>
      <td class="px-6 py-4">${this.fecha}</td>
      <td class="px-6 py-4 text-right">
        <button onclick="editarTransaccion(${index})" class="text-blue-500 mr-2">Editar</button>
        <button onclick="eliminarTransaccion(${index})" class="text-red-500">Eliminar</button>
      </td>
    `;
    transactionList.appendChild(row);
  }
}

function actualizarBalance() {
  const ingresos = transacciones
    .filter(t => t.tipo === "income")
    .reduce((sum, t) => sum + parseFloat(t.monto), 0);
  const egresos = transacciones
    .filter(t => t.tipo === "expense")
    .reduce((sum, t) => sum + parseFloat(t.monto), 0);
  const balance = ingresos - egresos;

  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${ingresos.toFixed(2)}`;
  expenseEl.textContent = `$${egresos.toFixed(2)}`;
}

function actualizarLista() {
  transactionList.innerHTML = "";
  transacciones.forEach((mov, index) => mov.render(index));
  actualizarBalance();
}

function registrarIngresoOEgreso(event) {
  event.preventDefault();

  const descripcion = document.querySelector("#description").value;
  const monto = parseFloat(document.querySelector("#amount").value);
  const tipo = document.querySelector("input[name='type']:checked").value;

  const movimiento = new Movimiento(tipo, monto, descripcion);
  const validacion = movimiento.validarMovimiento();

  if (!validacion.ok) {
    alert(validacion.message);
    return;
  }

  if (editIndex !== null) {
    transacciones[editIndex] = movimiento;
    editIndex = null;
    submitButton.textContent = "Añadir Transacción";
  } else {
    transacciones.push(movimiento);
  }

  actualizarLista();
  form.reset();
}

function editarTransaccion(index) {
  const movimiento = transacciones[index];
  document.querySelector("#description").value = movimiento.descripcion;
  document.querySelector("#amount").value = movimiento.monto;
  document.querySelector(`input[name='type'][value='${movimiento.tipo}']`).checked = true;
  editIndex = index;
  submitButton.textContent = "Guardar Cambios";
}

function eliminarTransaccion(index) {
  transacciones.splice(index, 1);
  actualizarLista();
}

form.addEventListener("submit", registrarIngresoOEgreso);
