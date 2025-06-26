/*document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("carrito-container");
  const totalDiv = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciarCarrito");
  const finalizarBtn = document.getElementById("finalizarCompra");

  function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = `<p class="text-light fs-4">El carrito está vacío.</p>`;
      totalDiv.textContent = "";
      return;
    }

    let html = `<div class="list-group">`;

    carrito.forEach((producto, index) => {
      html += `
        <div class="list-group-item d-flex align-items-center justify-content-between bg-dark text-light mb-2 rounded">
          <div class="d-flex align-items-center gap-3">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
            <div>
              <h5>${producto.nombre}</h5>
              <p class="mb-1">${producto.cantidad} x $${producto.precio.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    contenedorCarrito.innerHTML = html;

    // Calcular total
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalDiv.textContent = `Total: $${total.toLocaleString()}`;

    // Agregar eventos eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.dataset.index);
        eliminarProducto(idx);
      });
    });
  }

  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
  }

  vaciarBtn.addEventListener("click", () => {
    if (confirm("¿Querés vaciar todo el carrito?")) {
      localStorage.removeItem("carrito");
      cargarCarrito();
    }
  });

  finalizarBtn.addEventListener("click", () => {
    if (!localStorage.getItem("carrito") || JSON.parse(localStorage.getItem("carrito")).length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("Gracias por tu compra. Próximamente implementaremos el proceso de pago.");
    localStorage.removeItem("carrito");
    cargarCarrito();
  });

  cargarCarrito();
});*/

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("carrito-container");
  const totalDiv = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciarCarrito");
  const btnFinalizar = document.getElementById("finalizarCompra");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = `<p class="text-light">El carrito está vacío.</p>`;
      totalDiv.textContent = "";
      return;
    }

    carrito.forEach((producto, index) => {
      const productoDiv = document.createElement("div");
      productoDiv.className = "card mb-3 p-2 bg-dark text-light";
      productoDiv.innerHTML = `
        <div class="row g-0 align-items-center">
          <div class="col-md-2">
            <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
          </div>
          <div class="col-md-6">
            <h5>${producto.nombre}</h5>
            <p>${producto.cantidad} x $${producto.precio.toLocaleString()}</p>
          </div>
          <div class="col-md-2 text-center">
            <p><strong>$${(producto.precio * producto.cantidad).toLocaleString()}</strong></p>
          </div>
          <div class="col-md-2 text-center">
            <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
          </div>
        </div>
      `;
      contenedorCarrito.appendChild(productoDiv);
    });

    actualizarTotal();
    agregarEventosEliminar();
  }

  function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalDiv.textContent = `Total: $${total.toLocaleString()}`;
  }

  btnVaciar.addEventListener("click", () => {
    if (confirm("¿Querés vaciar todo el carrito?")) {
      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
    }
  });

  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra!");
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });

  function agregarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
      boton.addEventListener("click", () => {
        const index = boton.getAttribute("data-index");
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      });
    });
  }

  mostrarCarrito();
});


