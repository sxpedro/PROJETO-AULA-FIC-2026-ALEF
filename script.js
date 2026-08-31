const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const box = 20;

let snake = [
  { x: 9 * box, y: 10 * box }
];

let direction = 'RIGHT';

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;

const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

document.addEventListener('keydown', directionControl);

function directionControl(event) {
  const key = event.keyCode;

  if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
  else if (key === 38 && direction !== 'DOWN') direction = 'UP';
  else if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
  else if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function collision(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#32CD32' : '#FFFFFF';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = '#2a5298';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'DOWN') head.y += box;

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;

    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(game);
    alert('Game Over! Sua pontuação: ' + score);
  }
}

let game = setInterval(draw, 100);

restartButton.addEventListener('click', () => {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = 'RIGHT';

  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };

  score = 0;
  scoreElement.textContent = score;

  clearInterval(game);
  game = setInterval(draw, 100);
});


/* =========================
   CRUD DOS JOGADORES
========================= */

let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

const playerName = document.getElementById('player-name');
const saveButton = document.getElementById('save-button');
const players = document.getElementById('players');

function mostrarJogadores() {
  players.innerHTML = '';

  jogadores.forEach((jogador, index) => {
    players.innerHTML += `
      <div class="player">
        ${jogador.nome} - ${jogador.pontuacao} pontos
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      </div>
    `;
  });
}

saveButton.addEventListener('click', () => {
  const nome = playerName.value;

  if (nome === '') {
    alert('Digite o nome do jogador!');
    return;
  }

  jogadores.push({
    nome: nome,
    pontuacao: score
  });

  localStorage.setItem('jogadores', JSON.stringify(jogadores));

  playerName.value = '';

  mostrarJogadores();
});

function editar(index) {
  const novoNome = prompt('Digite o novo nome:', jogadores[index].nome);

  if (novoNome) {
    jogadores[index].nome = novoNome;

    localStorage.setItem('jogadores', JSON.stringify(jogadores));

    mostrarJogadores();
  }
}

function excluir(index) {
  jogadores.splice(index, 1);

  localStorage.setItem('jogadores', JSON.stringify(jogadores));

  mostrarJogadores();
}

mostrarJogadores();