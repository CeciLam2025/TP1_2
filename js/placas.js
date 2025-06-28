document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/placas.json")
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById("contenedor-placas");

      data.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col";

        card.innerHTML = `
          <div class="card h-100">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
            </div>
            <div class="card-footer">
              <div class="row text-center mb-2">
                <div class="col">
                  <p class="price">$ ${producto.precio.toLocaleString()}</p>
                </div>
                <div class="col">
                  <input type="number" class="form-control cantidad-input" min="1" max="99" placeholder="1" value="1">
                </div>
              </div>
              <div class="d-grid">
                <button class="btn btn-warning agregar-carrito" 
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}" 
                        data-imagen="${producto.imagen}">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        `;

        contenedor.appendChild(card);

        // Capturar botón y campo cantidad dentro de la card
        const boton = card.querySelector(".agregar-carrito");
        const inputCantidad = card.querySelector(".cantidad-input");

        boton.addEventListener("click", () => {
          const nombre = boton.dataset.nombre;
          const precio = parseFloat(boton.dataset.precio);
          const imagen = boton.dataset.imagen;
          const cantidad = parseInt(inputCantidad.value) || 1;

          const producto = { nombre, precio, imagen, cantidad };

          // Obtener carrito actual del localStorage
          let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

          // Ver si ya está y actualizar cantidad
          const index = carrito.findIndex(item => item.nombre === nombre);
          if (index !== -1) {
            carrito[index].cantidad += cantidad;
          } else {
            carrito.push(producto);
          }

          // Guardar carrito actualizado
          localStorage.setItem("carrito", JSON.stringify(carrito));

          alert(`${nombre} agregado al carrito (${cantidad})`);
        });
      });
    })
    .catch(error => {
      console.error("Error al cargar el JSON de placas:", error);
    });
});

