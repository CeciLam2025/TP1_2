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


