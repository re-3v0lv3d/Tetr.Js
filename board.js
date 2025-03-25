// board.js
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function crearTablero() {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
}

function dibujarPieza(pieza) {
  ctx.fillStyle = pieza.color;
  pieza.forma.forEach(punto => ctx.fillRect(pieza.x + punto[0], pieza.y + punto[1], 1, 1));
}

function dibujarTablero(tablero) {
  tablero.forEach((fila, y) => fila.forEach((valor, x) => {
    if (valor !== 0) {
      ctx.fillStyle = valor;
      ctx.fillRect(x, y, 1, 1);
    }
  }));
}

function colisionAbajo(pieza, tablero) {
  const forma = pieza.forma;
  const x = pieza.x;
  const y = pieza.y;
  for (let i = 0; i < forma.length; i++) {
    const px = x + forma[i][0];
    const py = y + forma[i][1] + 1;
    if (py >= ROWS || (tablero[py] && tablero[py][px] !== 0)) return true;
  }
  return false;
}

function colisionHorizontal(pieza, tablero) {
  const forma = pieza.forma;
  const x = pieza.x;
  const y = pieza.y;
  for (let i = 0; i < forma.length; i++) {
    const px = x + forma[i][0];
    const py = y + forma[i][1];
    if (px < 0 || px >= COLS || (tablero[py] && tablero[py][px] !== 0)) return true;
  }
  return false;
}

function fijarPieza(pieza, tablero) {
  pieza.forma.forEach(punto => {
    tablero[pieza.y + punto[1]][pieza.x + punto[0]] = pieza.color;
  });
}

function esRotacionValida(formaRotada, pieza, tablero) {
  const x = pieza.x;
  const y = pieza.y;
  for (let i = 0; i < formaRotada.length; i++) {
    const px = x + formaRotada[i][0];
    const py = y + formaRotada[i][1];
    if (px < 0 || px >= COLS || py < 0 || py >= ROWS || (tablero[py] && tablero[py][px] !== 0)) return false;
  }
  return true;
}
