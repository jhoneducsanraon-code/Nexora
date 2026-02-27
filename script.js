window.onload = function() {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (userData) {
        mostrarPerfil(userData);
    }
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Completa los campos");
        return;
    }

    let rol = "Usuario";

    if (username === "admin" && password === "1234") {
        rol = "Administrador";
    }

    const userData = { nombre: username, rol: rol };

    localStorage.setItem("usuario", JSON.stringify(userData));

    mostrarPerfil(userData);
}

function mostrarPerfil(user) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("perfil").classList.remove("hidden");

    document.getElementById("perfilNombre").textContent = user.nombre;
    document.getElementById("perfilRol").textContent = user.rol;
}

function verCatalogo() {
    const user = JSON.parse(localStorage.getItem("usuario"));

    document.getElementById("perfil").classList.add("hidden");
    document.getElementById("catalogo").classList.remove("hidden");

    if (user.rol === "Administrador") {
        document.getElementById("adminPanel").classList.remove("hidden");
    }
}

function volverPerfil() {
    document.getElementById("catalogo").classList.add("hidden");
    document.getElementById("perfil").classList.remove("hidden");
}

function agregarItem() {
    alert("Aquí podrías agregar más paisajes dinámicamente 😎");
}

function logout() {
    localStorage.removeItem("usuario");
    location.reload();
}
