const navElements = [
  { title: "Home", link: "/index.html" },
  { title: "Placas", link: "/pags/categoria1.html" },
  { title: "Herrajes", link: "/pags/categoria2.html" },
  { title: "Maderas", link: "/pags/categoria3.html" },
  { title: "Comprar", link: "/pags/login.html" }
];


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
                   ${
                    navElements.map(e =>{
                        return `
                        <li class="nav-item">
                        <a class="nav-link" href=${e.link}>${e.title}</a>
                        </li>
                        `
                    }).join('')
                   }
                </ul>
                
            </div>
            
        </div>
           
       </nav>
`

let navContainer = document.querySelector('header')

window.addEventListener('load', ()=>{
    navContainer.innerHTML = navBar
})


