document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/estilos.json")
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById("contenedor-estilos");

      data.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
          <div class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
            </div>
            <div class="card-footer">
              <div class="row text-center">
                <div class="col">
                  <p class="price">$ ${producto.precio.toLocaleString()}</p>
                </div>
                <div class="col">
                  <input type="number" class="form-control" min="0" max="99" placeholder="0">
                </div>
              </div>
            </div>
          </div>
        `;
        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar el JSON de estilos:", error);
    });
});
