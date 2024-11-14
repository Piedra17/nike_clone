// Al hacer clic en el ícono de modo
document.getElementById("mode-icon").addEventListener("click", function() {
    // Cambia el modo
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        document.getElementById("mode-icon").classList.remove("fa-moon");
        document.getElementById("mode-icon").classList.add("fa-sun");
        document.querySelector(".navbar-brand img").src = "imagenes/logo.png";
        localStorage.setItem("mode", "light"); // Guarda el modo claro
    } else {
        document.body.classList.add("dark-mode");
        document.getElementById("mode-icon").classList.remove("fa-sun");
        document.getElementById("mode-icon").classList.add("fa-moon");
        document.querySelector(".navbar-brand img").src = "imagenes/logoblanco.png";
        localStorage.setItem("mode", "dark"); // Guarda el modo oscuro
    }
});
