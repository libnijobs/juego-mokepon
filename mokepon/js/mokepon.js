let attackPlayer;
let attackEnemy;

let livePlayer = 3;
let liveEnemy = 3;

function iniciarJuego() {
  let selectionMascotAttack = document.getElementById("select-attack")
  selectionMascotAttack.style.display = 'none'
  let reload = document.getElementById("reload")
  reload.style.display = 'none'

  let botonMascotaJugador = document.getElementById("button-mascot");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  let buttonFire = document.getElementById("button-fire");
  buttonFire.addEventListener("click", ataqueFuego);
  let buttonWater = document.getElementById("button-water");
  buttonWater.addEventListener("click", ataqueAgua);
  let buttonEarth = document.getElementById("button-earth");
  buttonEarth.addEventListener("click", ataqueTierra);

  let reiniciar = document.getElementById("reload");
  reiniciar.addEventListener("click", reloadPlay);
}

function seleccionarMascotaJugador() {
  let selectionAttack = document.getElementById("select-attack")
  let selectionMascot = document.getElementById("select-masct")
  
  let inputdragonDeKomodo = document.getElementById("dragonDeKomodo");
  let inputZorro = document.getElementById("zorro");
  let inputbufalo = document.getElementById("bufalo");
  let spanMascotPlayer = document.getElementById("mascot-player");

  if (inputdragonDeKomodo.checked) {
    spanMascotPlayer.innerHTML = "Dragon De Komodo";
    selectionAttack.style.display = 'block'
    selectionMascot.style.display = 'none'
  } else if (inputZorro.checked) {
    spanMascotPlayer.innerHTML = "Zorro";
      selectionAttack.style.display = 'block'
      selectionMascot.style.display = 'none'
  } else if (inputbufalo.checked) {
    spanMascotPlayer.innerHTML = "Bufalo";
      selectionAttack.style.display = 'block'
      selectionMascot.style.display = 'none'
  }else if(!inputdragonDeKomodo.checked && !inputZorro.checked && !inputbufalo.checked){
    alert('Debes seleccionar una mascota')
  }
  seleccionarMascotaEnemigo();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaEnemigo() {
  let mascotRandom = aleatorio(1, 3);
  let spanMascotEnemy = document.getElementById("mascot-enemy");

  if (mascotRandom == 1) {
    spanMascotEnemy.innerHTML = "Dragon De Komodo";
  } else if (mascotRandom == 2) {
    spanMascotEnemy.innerHTML = "Zorro";
  } else {
    spanMascotEnemy.innerHTML = "Bufalo";
  }
}

function ataqueFuego() {
  attackPlayer = 'Fuego'
  ataqueAleatorioEnemigo()
}
function ataqueAgua() {
  attackPlayer = 'Agua'
  ataqueAleatorioEnemigo()
}
function ataqueTierra() {
  attackPlayer = 'Tierra'
  ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1,3)
  
  if (ataqueAleatorio == 1) {
      attackEnemy = 'Fuego'
  } else if (ataqueAleatorio == 2) {
      attackEnemy = 'Agua'
  } else {
      attackEnemy = 'Tierra'
  }

  combate()
}
// function combate(){
//   if (attackEnemy == attackPlayer) {
//     crearMensaje(' Empate') 
// } else if (attackPlayer == "Fuego" && attackEnemy == "Tierra") {
//     crearMensaje(" TU GANAS con: " + attackPlayer)
// } else if (attackPlayer == "Agua" && attackEnemy == "Fuego") {
//     crearMensaje(" TU GANAS con: " + attackPlayer)
// } else if (attackPlayer == "Tierra" && attackEnemy == "Agua") {
//     crearMensaje(" TU GANAS con: " + attackPlayer)
// } else if (attackEnemy == "Fuego" && attackPlayer == "Tierra") {
//     crearMensaje(" GANA el computador con: " + attackEnemy)
// } else if(attackEnemy == "Agua" && attackPlayer == "Fuego"){
//   crearMensaje(" GANA el computador con: " + attackEnemy)
// } else if(attackEnemy == "Tierra" && attackPlayer == "Agua"){
//   crearMensaje(" GANA el computador con: " + attackEnemy)
// }
// }

function combate(){
  let spanLiveEnemy = document.getElementById("liveMascotEnemy");
  let spanLivePlayer = document.getElementById("liveMascotPlayer");

  if (attackEnemy == attackPlayer) {
    crearMensaje(' Empate') 
}else if (attackPlayer == "Fuego" && attackEnemy == "Tierra"|| attackPlayer == "Agua" && attackEnemy == "Fuego"||attackPlayer == "Tierra" && attackEnemy == "Agua"){
    crearMensaje(" TU GANAS con: " + attackPlayer)
    liveEnemy--
    spanLiveEnemy.innerHTML = liveEnemy
}else if(attackEnemy == "Fuego" && attackPlayer == "Tierra"|| attackEnemy == "Agua" && attackPlayer == "Fuego"||attackEnemy == "Tierra" && attackPlayer == "Agua"){
  crearMensaje(" GANA el computador con: " + attackEnemy)
    livePlayer--
    spanLivePlayer.innerHTML = livePlayer
}
validarCombate()
}

function validarCombate() {
  let reload = document.getElementById("reload")

  if(livePlayer == 0){
    alert('GANA EL COMPUTADOR')
    disabled()
    reload.style.display = 'block'
  }else if(liveEnemy == 0){
    alert('GANA EL JUGADOR')
    disabled()
    reload.style.display = 'block'
  }
}

function disabled(){
  let buttonFire = document.getElementById("button-fire");
  buttonFire.disabled = true;
  let buttonWater = document.getElementById("button-water");
  buttonWater.disabled = true;
  let buttonEarth = document.getElementById("button-earth");
  buttonEarth.disabled = true;
}

function crearMensaje(resultado) {
  let sectionMensajes = document.getElementById('mensajes')
  
  let parrafo = document.createElement('p')
  parrafo.innerHTML = 'Tu mascota atacó con ' + attackPlayer + ', las mascota del enemigo atacó con ' + attackEnemy + ":" + resultado

  sectionMensajes.appendChild(parrafo)
}

function reloadPlay() {
  location.reload()
}

window.addEventListener("load", iniciarJuego);
