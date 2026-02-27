let paisajes = [
"https://picsum.photos/300/200?1",
"https://picsum.photos/300/200?2",
"https://picsum.photos/300/200?3"
];

window.onload = function(){
if(!localStorage.getItem("usuarios")){
localStorage.setItem("usuarios", JSON.stringify([
{nombre:"admin",password:"1234",rol:"Administrador",foto:"https://i.pravatar.cc/100?img=1",favoritos:[]}
]));
}

const actual = JSON.parse(localStorage.getItem("actual"));
if(actual){mostrarPerfil(actual);}
};

function mostrarRegistro(){
loginBox.classList.add("hidden");
registroBox.classList.remove("hidden");
}

function mostrarLogin(){
registroBox.classList.add("hidden");
loginBox.classList.remove("hidden");
}

function registrar(){
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let nuevo={
nombre:regUser.value,
password:regPass.value,
rol:"Usuario",
foto:"https://i.pravatar.cc/100",
favoritos:[]
};
usuarios.push(nuevo);
localStorage.setItem("usuarios",JSON.stringify(usuarios));
alert("Registrado");
mostrarLogin();
}

function login(){
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let user = usuarios.find(u=>u.nombre===loginUser.value && u.password===loginPass.value);
if(user){
localStorage.setItem("actual",JSON.stringify(user));
mostrarPerfil(user);
}else{
alert("Datos incorrectos");
}
}

function mostrarPerfil(user){
loginBox.classList.add("hidden");
perfilBox.classList.remove("hidden");
perfilNombre.textContent=user.nombre;
perfilRol.textContent=user.rol;
fotoPerfil.src=user.foto;
if(user.rol==="Administrador"){
adminPanel.classList.remove("hidden");
}
}

function cambiarFoto(){
let actual=JSON.parse(localStorage.getItem("actual"));
actual.foto=nuevaFoto.value;
let usuarios=JSON.parse(localStorage.getItem("usuarios"));
usuarios=usuarios.map(u=>u.nombre===actual.nombre?actual:u);
localStorage.setItem("usuarios",JSON.stringify(usuarios));
localStorage.setItem("actual",JSON.stringify(actual));
fotoPerfil.src=actual.foto;
}

function verCatalogo(){
perfilBox.classList.add("hidden");
catalogoBox.classList.remove("hidden");
renderPaisajes();
}

function renderPaisajes(){
gridPaisajes.innerHTML="";
paisajes.forEach(p=>{
gridPaisajes.innerHTML+=`
<div class="item">
<img src="${p}">
<button onclick="guardarFavorito('${p}')">❤</button>
</div>`;
});
}

function guardarFavorito(url){
let actual=JSON.parse(localStorage.getItem("actual"));
actual.favoritos.push(url);
localStorage.setItem("actual",JSON.stringify(actual));
alert("Guardado en favoritos");
}

function agregarPaisaje(){
let nueva=prompt("URL del paisaje:");
paisajes.push(nueva);
renderPaisajes();
}

function volverPerfil(){
catalogoBox.classList.add("hidden");
perfilBox.classList.remove("hidden");
}

function logout(){
localStorage.removeItem("actual");
location.reload();
}
