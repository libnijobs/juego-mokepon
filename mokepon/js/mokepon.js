const reload = document.getElementById("reload");
reload.style.display = "none";
const botonMascotaJugador = document.getElementById("button-mascot");
const buttonFire = document.getElementById("button-fire");
const buttonWater = document.getElementById("button-water");
const buttonEarth = document.getElementById("button-earth");
const selectionAttack = document.getElementById("select-attack");
const selectionMascot = document.getElementById("select-masct");
const inputdragon = document.getElementById("dragon");
const inputZorro = document.getElementById("zorro");
const inputbufalo = document.getElementById("bufalo");
const spanMascotPlayer = document.getElementById("mascot-player");
const spanMascotEnemy = document.getElementById("mascot-enemy");
const spanLiveEnemy = document.getElementById("liveMascotEnemy");
const spanLivePlayer = document.getElementById("liveMascotPlayer");
const sectionMensajes = document.getElementById("mensajes");
const ataqueJugador = document.getElementById("ataque-jugador");
const ataqueEnemigo = document.getElementById("ataque-enemigo");
const resultadoGanador = document.getElementById("ganador");

let mokepones = [];
let opcionDeMokepones
let attackPlayer;
let attackEnemy;
let livePlayer = 3;
let liveEnemy = 3;

class Moquepon{
  constructor(nombre, foto, vida){
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let dragon = new Moquepon("Dragon","img/dragon.png",3);
let zorro = new Moquepon("Zorro","img/zorro.png",3);
let bufalo = new Moquepon("Bufalo","img/bufalo.png",3);

dragon.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'}
);

zorro.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'}
);

bufalo.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'}
);

mokepones.push(dragon, zorro, bufalo);

function iniciarJuego() {

  mokepones.forEach(mokepon => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id= ${mokepon.nombre}>
    <label for=${mokepon.nombre} class="mascotas">
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>`
  });

  selectionAttack.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  buttonFire.addEventListener("click", ataqueFuego);
  buttonWater.addEventListener("click", ataqueAgua);
  buttonEarth.addEventListener("click", ataqueTierra);
  reload.addEventListener("click", reloadPlay);
}

function seleccionarMascotaJugador() {
  if (inputdragon.checked) {
    spanMascotPlayer.innerHTML = "Dragon";
    selectionAttack.style.display = "block";
    selectionMascot.style.display = "none";
  } else if (inputZorro.checked) {
    spanMascotPlayer.innerHTML = "Zorro";
    selectionAttack.style.display = "block";
    selectionMascot.style.display = "none";
  } else if (inputbufalo.checked) {
    spanMascotPlayer.innerHTML = "Bufalo";
    selectionAttack.style.display = "block";
    selectionMascot.style.display = "none";
  } else if (
    !inputdragon.checked &&
    !inputZorro.checked &&
    !inputbufalo.checked
  ) {
    alert("Debes seleccionar una mascota");
  }
  seleccionarMascotaEnemigo();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaEnemigo() {
  let mascotRandom = aleatorio(1, 3);

  if (mascotRandom == 1) {
    spanMascotEnemy.innerHTML = "Dragon";
  } else if (mascotRandom == 2) {
    spanMascotEnemy.innerHTML = "Zorro";
  } else {
    spanMascotEnemy.innerHTML = "Bufalo";
  }
}

function ataqueFuego() {
  attackPlayer = "🔥";
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  attackPlayer = "💧";
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  attackPlayer = "🌱";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    attackEnemy = "🔥";
  } else if (ataqueAleatorio == 2) {
    attackEnemy = "💧";
  } else {
    attackEnemy = "🌱";
  }

  combate();
}

function combate() {
  if (attackEnemy == attackPlayer) {
    crearMensaje(" Empate");
  } else if (
    (attackPlayer == "🔥" && attackEnemy == "🌱") ||
    (attackPlayer == "💧" && attackEnemy == "🔥") ||
    (attackPlayer == "🌱" && attackEnemy == "💧")
  ) {
    crearMensaje(" TU GANAS con: " + attackPlayer);
    liveEnemy--;
    spanLiveEnemy.innerHTML = liveEnemy;
  } else if (
    (attackEnemy == "🔥" && attackPlayer == "🌱") ||
    (attackEnemy == "💧" && attackPlayer == "🔥") ||
    (attackEnemy == "🌱" && attackPlayer == "💧")
  ) {
    crearMensaje(" GANA el computador con: " + attackEnemy);
    livePlayer--;
    spanLivePlayer.innerHTML = livePlayer;
  }
  validarCombate();
}

function validarCombate() {
  if (livePlayer == 0) {
    ganadorMensaje("GANA EL COMPUTADOR");
    disabled();
    reload.style.display = "flex";
  } else if (liveEnemy == 0) {
    ganadorMensaje("TU GANAS");
    disabled();
    reload.style.display = "flex";
  }
}

function disabled() {
  buttonFire.disabled = true;
  buttonWater.disabled = true;
  buttonEarth.disabled = true;
}

function crearMensaje(resultado) {
  let parrafo = document.createElement("p");
  parrafo.innerHTML = resultado;
  sectionMensajes.appendChild(parrafo);

  let parrafoAttackPlayer = document.createElement("p");
  parrafoAttackPlayer.innerHTML = attackPlayer;
  ataqueJugador.appendChild(parrafoAttackPlayer);

  let parrafoAttackEnemy = document.createElement("p");
  parrafoAttackEnemy.innerHTML = attackEnemy;
  ataqueEnemigo.appendChild(parrafoAttackEnemy);
}

function ganadorMensaje(ganador) {
  let parrafoResultadoGanador = document.createElement("p");
  parrafoResultadoGanador.innerHTML = ganador;
  resultadoGanador.appendChild(parrafoResultadoGanador);
}

function reloadPlay() {
  location.reload();
}
window.addEventListener("load", iniciarJuego);
