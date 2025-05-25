document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    // Validación simple (usuario y contraseña fijas)
    if (usuario === "lambertuccicecilia@gmail.com" && contraseña === "1234") {
        localStorage.setItem("logueado", "true");
        window.location.href = "../index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
