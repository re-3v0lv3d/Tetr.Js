// main.js
const musica = new Audio('tetrjs.mp3');
musica.loop = true;
musica.volume = 0.4;

const linea = new Audio('line.wav');
linea.loop = false;
linea.volume = 1.0;

let piezaActual = crearPiezaAleatoria();
let tablero = crearTablero();
let lineas = 0;
let nivel = 0;
let puntaje = 0;
let juegoActivo = false;
let intervalo;

function crearPiezaAleatoria() {
  const indicePieza = Math.floor(Math.random() * piezas.length);
  const pieza = piezas[indicePieza];
  return { forma: pieza.forma, color: pieza.color, x: 3, y: 0 };
}

function moverPiezaAbajo() {
  if (!juegoActivo) return;
  if (colisionAbajo(piezaActual, tablero)) {
    fijarPieza(piezaActual, tablero);
    if (verificarGameOver()) return finJuego();
    eliminarLineasCompletas();
    piezaActual = crearPiezaAleatoria();
  } else {
    piezaActual.y++;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarTablero(tablero);
  dibujarPieza(piezaActual);
  actualizarHUD();
}

function moverIzquierda() {
  if (!juegoActivo) return;
  piezaActual.x--;
  if (colisionHorizontal(piezaActual, tablero)) piezaActual.x++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarTablero(tablero);
  dibujarPieza(piezaActual);
}

function moverDerecha() {
  if (!juegoActivo) return;
  piezaActual.x++;
  if (colisionHorizontal(piezaActual, tablero)) piezaActual.x--;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarTablero(tablero);
  dibujarPieza(piezaActual);
}

function rotarPieza() {
  if (!juegoActivo) return;
  const formaOriginal = [...piezaActual.forma];
  const formaRotada = formaOriginal.map(([x, y]) => [-y, x]);
  if (esRotacionValida(formaRotada, piezaActual, tablero)) piezaActual.forma = formaRotada;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarTablero(tablero);
  dibujarPieza(piezaActual);
}

function eliminarLineasCompletas() {
  let lineasEliminadas = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (tablero[y].every(valor => valor !== 0)) {
      tablero.splice(y, 1);
      tablero.unshift(Array(COLS).fill(0));
      lineas++;
      lineasEliminadas++;
      y++;
      linea.play();
    }
  }
  if (lineasEliminadas > 0) {
    puntaje += lineasEliminadas * 100;
    actualizarNivel();
  }
}

function actualizarNivel() {
  const nuevoNivel = Math.floor(lineas / 3) + 1;
  if (nuevoNivel !== nivel) {
    nivel = nuevoNivel;
    clearInterval(intervalo);
    const velocidad = Math.max(100, 750 - (nivel - 1) * 75);
    intervalo = setInterval(moverPiezaAbajo, velocidad);
  }
}

function verificarGameOver() {
  return tablero[0].some(valor => valor !== 0);
}

function finJuego() {
  juegoActivo = false;
  clearInterval(intervalo);
  musica.pause();
  musica.currentTime = 0;
  alert(`¡Game Over! Puntos: ${puntaje}, Líneas: ${lineas}, Nivel: ${nivel}`);
}

function actualizarHUD() {
  document.getElementById('score').innerText = puntaje;
  document.getElementById('lines').innerText = lineas;
  document.getElementById('level').innerText = nivel;
}

function play() {
  if (juegoActivo) return;
  juegoActivo = true;
  tablero = crearTablero();
  piezaActual = crearPiezaAleatoria();
  lineas = 0;
  nivel = 1;
  puntaje = 0;
  const velocidadInicial = 750;
  intervalo = setInterval(moverPiezaAbajo, velocidadInicial);
  musica.play();
  actualizarHUD();
}

document.addEventListener('keydown', manejarTecla);

function manejarTecla(evento) {
  switch (evento.keyCode) {
    case 37: moverIzquierda(); break;
    case 39: moverDerecha(); break;
    case 38: rotarPieza(); break;
    case 40: moverPiezaAbajo(); break;
  }
}
