// main.js

// Definir las constantes COLS, ROWS y BLOCK_SIZE
const COLS = 10; // Número de columnas en el tablero
const ROWS = 20; // Número de filas en el tablero
const BLOCK_SIZE = 30; // Tamaño de cada bloque en píxeles (ajusta según sea necesario)

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calcular el tamaño del canvas a partir de las constantes.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Escalar los bloques
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function play() {
    board = new Board(ctx); // Asegúrate de que 'Board' esté definido correctamente
    console.table(board.grid);
}