const selectionAttack = document.getElementById("select-attack")
const selectionMascot = document.getElementById("select-masct")
const reload = document.getElementById("reload")
reload.style.display = "none"
const botonMascotaJugador = document.getElementById("button-mascot")
const spanMascotPlayer = document.getElementById("mascot-player")
const spanMascotEnemy = document.getElementById("mascot-enemy")
const spanLiveEnemy = document.getElementById("liveMascotEnemy")
const spanLivePlayer = document.getElementById("liveMascotPlayer")

const sectionMensajes = document.getElementById("mensajes")
const resultadoGanador = document.getElementById("ganador")

const ataqueJugador = document.getElementById("ataque-jugador")
const ataqueEnemigo = document.getElementById("ataque-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mascotasObjeto

let mokepones = []
let attackPlayer = []
let attackEnemy = []
let opcionDeMokepones
let inputdragon
let inputZorro
let inputbufalo
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let buttonFire
let buttonWater
let buttonEarth
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let livePlayer = 3
let liveEnemy = 3
let lienzo = mapa.getContext("2d")
let intervalo

let mapaBackground = new Image()
mapaBackground.src = "img/fondo-bufalo.jpg"

class Mokepon{
  constructor(nombre, foto, vida){
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
    this.x = 20
    this.y = 30
    this.x = 20
    this.y = 30
    this.ancho = 50
    this.alto = 50
    this.mapaFoto = new Image()
    this.mapaFoto.src = foto
    this.velocidadx = 0
    this.velocidady = 0
  }
}

let dragon = new Mokepon("Dragon","img/dragon-removebg-preview.png",5)
let zorro = new Mokepon("Zorro","img/zorro-removebg-preview.png",5)
let bufalo = new Mokepon("Bufalo","img/bufalo-removebg-preview.png",5)

dragon.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '💧', id: 'button-water'},
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'},
)

zorro.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'},
  {nombre: '🌱', id: 'button-earth'},
  {nombre: '🌱', id: 'button-earth'},
)

bufalo.ataques.push(
  {nombre: '💧', id: 'button-water'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🔥', id: 'button-fire'},
  {nombre: '🌱', id: 'button-earth'},
)

mokepones.push(dragon, zorro, bufalo)

function iniciarJuego() {

  selectionAttack.style.display = "none"
  sectionVerMapa.style.display = "none"

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label for=${mokepon.nombre} class="mascotas">
    <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>`

    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputdragon = document.getElementById("Dragon")
    inputZorro = document.getElementById("Zorro")
    inputbufalo = document.getElementById("Bufalo")
  })

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
  reload.addEventListener("click", reloadPlay)

}

function seleccionarMascotaJugador() { 
  selectionMascot.style.display = "none"
  // selectionAttack.style.display = "block"
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
    alert("Debes seleccionar una mascota")
  }
  extraerAtaques(mascotaJugador)
  sectionVerMapa.style.display = "flex"

  iniciarMapa()
  seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
  let ataques
  for (let i = 0; i < mokepones.length; i++) {
      if (mascotaJugador === mokepones[i].nombre) {
          ataques = mokepones[i].ataques
      }    
  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="botones-ataque BAtaque">${ataque.nombre}</button>`
    contenedorAtaques.innerHTML += ataquesMokepon
  })

  buttonFire = document.getElementById("button-fire")
  buttonWater = document.getElementById("button-water")
  buttonEarth = document.getElementById("button-earth")
  botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === '🔥'){
        attackPlayer.push('FUEGO')
        console.log(attackPlayer)
        boton.style.background = '#FF5733'
        boton.disabled = true
      }else if (e.target.textContent === '💧'){
        attackPlayer.push('AGUA')
        console.log(attackPlayer)
        boton.style.background = '#1F92FE'
        boton.disabled = true
      }else{
        attackPlayer.push('TIERRA')
        console.log(attackPlayer)
        boton.style.background = '#1FFE3A'
        boton.disabled = true
      }
      ataqueAleatorioEnemigo()
    })
})
}

function seleccionarMascotaEnemigo() {
  let mascotRandom = aleatorio(0, mokepones.length -1)

  spanMascotEnemy.innerHTML = mokepones[mascotRandom].nombre
  ataquesMokeponEnemigo = mokepones[mascotRandom].ataques
  secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    attackEnemy.push("FUEGO")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    attackEnemy.push("AGUA")
  } else {
    attackEnemy.push("TIERRA")
  }
  console.log(attackEnemy)
  iniciarPelea()
}

function iniciarPelea() {
  if (attackPlayer.length === 5) {
      combate()
  }
}

function indexAmbosOponente(jugador, enemigo) {
  indexAtaqueJugador = attackPlayer[jugador]
  indexAtaqueEnemigo = attackEnemy[enemigo]
}

function combate() {

  for (let index = 0; index < attackPlayer.length; index++) {
    if(attackPlayer[index] === attackEnemy[index]){
      indexAmbosOponente(index, index)
      crearMensaje(" Empate")
    }else if(
    (attackPlayer[index] === "FUEGO" && attackEnemy[index] === "TIERRA") || 
    (attackPlayer[index] === "AGUA" && attackEnemy[index] === "FUEGO") || 
    (attackPlayer[index] === "TIERRA" && attackEnemy[index] === "AGUA")){
      indexAmbosOponente(index, index)
      crearMensaje(" TU GANAS con: " + attackPlayer[index])
      victoriasJugador++
      spanLivePlayer.innerHTML = victoriasJugador
    }if(
      (attackEnemy[index] === "FUEGO" && attackPlayer[index] === "TIERRA") || 
      (attackEnemy[index] === "AGUA" && attackPlayer[index] === "FUEGO") || 
      (attackEnemy[index] === "TIERRA" && attackPlayer[index] === "AGUA")){
        indexAmbosOponente(index, index)
      crearMensaje(" GANA el computador con: " + attackEnemy[index])
      victoriasEnemigo++
      spanLiveEnemy.innerHTML = victoriasEnemigo
    }
  }
validarCombate()
}

function validarCombate() {
  if (victoriasJugador == victoriasEnemigo) {
    ganadorMensaje("ESTO ES UN EMPATE")
    disabled()
    reload.style.display = "flex"
  } else if (victoriasJugador > victoriasEnemigo) {
    ganadorMensaje("TU GANAS")
    disabled()
    reload.style.display = "flex"
  }else{
    ganadorMensaje("GANA EL COMPUTADOR")
    disabled()
    reload.style.display = "flex"
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function disabled() {
  buttonFire.disabled = true
  buttonWater.disabled = true
  buttonEarth.disabled = true
}

function crearMensaje(resultado) {
  let parrafo = document.createElement("p")
  let parrafoAttackPlayer = document.createElement("p")
  let parrafoAttackEnemy = document.createElement("p")
  
  parrafo.innerHTML = resultado
  parrafoAttackPlayer.innerHTML = indexAtaqueJugador
  parrafoAttackEnemy.innerHTML = indexAtaqueEnemigo
  
  ataqueJugador.appendChild(parrafoAttackPlayer)
  ataqueEnemigo.appendChild(parrafoAttackEnemy)
  sectionMensajes.appendChild(parrafo)
}

function ganadorMensaje(ganador) {
  let parrafoResultadoGanador = document.createElement("p")
  parrafoResultadoGanador.innerHTML = ganador
  resultadoGanador.appendChild(parrafoResultadoGanador)
}

function reloadPlay() {
  location.reload()
}

function pintarCanvas() {
  mascotasObjeto.x += mascotasObjeto.velocidadx
  mascotasObjeto.y += mascotasObjeto.velocidady
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(mapaBackground, 
    0, 
    0, 
    mapa.width, 
    mapa.height)
  lienzo.drawImage(
    mascotasObjeto.mapaFoto,
     mascotasObjeto.x,
     mascotasObjeto.y,
     mascotasObjeto.ancho,
     mascotasObjeto.alto
    )
}

function derecha(){
  mascotasObjeto.velocidadx = 5
}
function abajo(){
  mascotasObjeto.velocidady = 5
}
function izquierda(){
  mascotasObjeto.velocidadx = -5
}
function arriba(){
  mascotasObjeto.velocidady = -5
}

function detenerMovimiento(){
  mascotasObjeto.velocidadx = 0
  mascotasObjeto.velocidady = 0
}
function sePresionoUnaTecla(event){
   switch(event.key){
    case 'ArrowUp':
      arriba()
      break
    case 'ArrowDown':
      abajo()
      break
    case 'ArrowLeft':
      izquierda()
      break
    case 'ArrowRight':
      derecha()
      break
    default:
      break
   }
  console.log(event.key)
}

function iniciarMapa(){
  mascotasObjeto = obtenerObjetoMascota(mascotaJugador)
  mapa.width + 800
  mapa.height + 800
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener('keydown', sePresionoUnaTecla)
  window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(mascotaJugador){
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i]
    }    
}
}

window.addEventListener("load", iniciarJuego)
