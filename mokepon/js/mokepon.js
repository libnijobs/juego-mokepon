let attackPlayer;
let attackEnemy;

function iniciarJuego() {
  let botonMascotaJugador = document.getElementById("button-mascot");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  let buttonFire = document.getElementById("button-fire");
  buttonFire.addEventListener("click", ataqueFuego);
  let buttonWater = document.getElementById("button-water");
  buttonWater.addEventListener("click", ataqueAgua);
  let buttonEarth = document.getElementById("button-earth");
  buttonEarth.addEventListener("click", ataqueTierra);
}

function seleccionarMascotaJugador() {
  let inputdragonDeKomodo = document.getElementById("dragonDeKomodo");
  let inputZorro = document.getElementById("zorro");
  let inputbufalo = document.getElementById("bufalo");
  let spanMascotPlayer = document.getElementById("mascot-player");

  if (inputdragonDeKomodo.checked) {
    spanMascotPlayer.innerHTML = "Dragon De Komodo";
  } else if (inputZorro.checked) {
    spanMascotPlayer.innerHTML = "Zorro";
  } else if (inputbufalo.checked) {
    spanMascotPlayer.innerHTML = "Bufalo";
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
  attackPlayer = "Fuego";
  let spanAttackPlayer = document.getElementById("attack-player")
  spanAttackPlayer.innerHTML = "Fuego";
  attackRandomEnemy()
}
function ataqueAgua() {
  attackPlayer = "Agua";
  let spanAttackPlayer = document.getElementById("attack-player")
  spanAttackPlayer.innerHTML = "Agua";
  attackRandomEnemy()
}
function ataqueTierra() {
  attackPlayer = "Tierra";
  let spanAttackPlayer = document.getElementById("attack-player")
  spanAttackPlayer.innerHTML = "Tierra";
  attackRandomEnemy()
}

function attackRandomEnemy() {
  let attackRandom = aleatorio(1, 3);
  let spanAttackEnemy = document.getElementById("attack-enemy");

  if (attackRandom == 1) {
    spanAttackEnemy.innerHTML = "Fuego";
  } else if (attackRandom == 2) {
    spanAttackEnemy.innerHTML = "Agua";
  } else {
    spanAttackEnemy.innerHTML = "Tierra";
  }
}


let spanLivePlayer = document.getElementById("liveMascotPlayer");
let spanLiveEnemy = document.getElementById("liveMascotEnemy");

window.addEventListener("load", iniciarJuego);
