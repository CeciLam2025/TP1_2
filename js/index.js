const navElements = [
  { title: "Home", link: "/index.html" },
  { title: "Placas", link: "/pags/categoria1.html" },
  { title: "Herrajes", link: "/pags/categoria2.html" },
  { title: "Estilos", link: "/pags/categoria3.html" },  
  { title: "🛒 Carrito", link: "/pags/carrito.html" }
];

// Función global para cerrar sesión
window.cerrarSesion = function () {
  sessionStorage.removeItem("logueado");
  window.location.href = "/pags/login.html";
};

window.addEventListener('load', () => {
  const navBar = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../images/logo jl.png" alt="Logo" width="100">    
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav">
            ${navElements.map(e => `
              <li class="nav-item">
                <a class="nav-link" href="${e.link}">${e.title}</a>
              </li>`).join('')}
          </ul>
          <button onclick="cerrarSesion()" class="btn btn-outline-warning ms-auto">Cerrar sesión</button>
        </div>
      </div>
    </nav>
  `;

  let navContainer = document.querySelector('header');
  navContainer.innerHTML = navBar;
});



