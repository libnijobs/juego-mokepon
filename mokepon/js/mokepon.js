const selectionAttack = document.getElementById("select-attack");
const selectionMascot = document.getElementById("select-masct");
const reload = document.getElementById("reload");
reload.style.display = "none";
const botonMascotaJugador = document.getElementById("button-mascot");
const spanMascotPlayer = document.getElementById("mascot-player");
const spanMascotEnemy = document.getElementById("mascot-enemy");
const spanLiveEnemy = document.getElementById("liveMascotEnemy");
const spanLivePlayer = document.getElementById("liveMascotPlayer");

const sectionMensajes = document.getElementById("mensajes");
const resultadoGanador = document.getElementById("ganador");

const ataqueJugador = document.getElementById("ataque-jugador");
const ataqueEnemigo = document.getElementById("ataque-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = [];
let attackPlayer;
let attackEnemy;
let opcionDeMokepones;
let inputdragon;
let inputZorro;
let inputbufalo;
let mascotaJugador
let ataquesMokepon
let buttonFire
let buttonWater
let buttonEarth

let livePlayer = 3;
let liveEnemy = 3;

class Mokepon{
  constructor(nombre, foto, vida){
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let dragon = new Mokepon("Dragon","img/dragon-removebg-preview.png",5);
let zorro = new Mokepon("Zorro","img/zorro-removebg-preview.png",5);
let bufalo = new Mokepon("Bufalo","img/bufalo-removebg-preview.png",5);

dragon.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '💧', id: 'button-water'},
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'},
);

zorro.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'},
  {nombre: '🌱', id: 'button-earth'},
  {nombre: '🌱', id: 'button-earth'},
);

bufalo.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'},
);

mokepones.push(dragon, zorro, bufalo);

function iniciarJuego() {

  selectionAttack.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label for=${mokepon.nombre} class="mascotas">
    <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>`

    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputdragon = document.getElementById("Dragon");
    inputZorro = document.getElementById("Zorro");
    inputbufalo = document.getElementById("Bufalo");
  });

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  reload.addEventListener("click", reloadPlay);

}

function seleccionarMascotaJugador() {
  selectionMascot.style.display = "none";
  selectionAttack.style.display = "block";

  if (inputdragon.checked) {
    spanMascotPlayer.innerHTML = inputdragon.id
    mascotaJugador = inputdragon.id
  } else if (inputZorro.checked) {
    spanMascotPlayer.innerHTML = inputZorro.id
    mascotaJugador = inputZorro.id
  } else if (inputbufalo.checked) {
    spanMascotPlayer.innerHTML = inputbufalo.id
    mascotaJugador = inputbufalo.id
  } else{
    alert("Debes seleccionar una mascota");
  }
  extraerAtaques(mascotaJugador)
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques
  for (let i = 0; i < mokepones.length; i++) {
      if (mascotaJugador === mokepones[i].nombre) {
          ataques = mokepones[i].ataques
      }    
  }
  // console.log(ataques);
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="botones-ataque">${ataque.nombre}</button>`
    contenedorAtaques.innerHTML += ataquesMokepon;
  })

  buttonFire = document.getElementById("button-fire");
  buttonWater = document.getElementById("button-water");
  buttonEarth = document.getElementById("button-earth");

  buttonFire.addEventListener("click", ataqueFuego);
  buttonWater.addEventListener("click", ataqueAgua);
  buttonEarth.addEventListener("click", ataqueTierra);
}

function seleccionarMascotaEnemigo() {
  let mascotRandom = aleatorio(0, mokepones.length -1);

  spanMascotEnemy.innerHTML = mokepones[mascotRandom].nombre
  ataquesMokeponEnemigo = mokepones[mascotRandom].ataques
  // secuenciaAtaque()
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

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
