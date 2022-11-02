const canvas = document.getElementById('tron');
const context = canvas.getContext('2d');
const pixels = 10;
const help = document.getElementById('help');
const instructions = document.getElementById('instructions');

help.addEventListener('click', () => {
  instructions.style.visibility = 'visible'
})

console.log("This is a test")


class Player {
    constructor(x, y, colour){
        this.color = colour;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;

        this.dead = false;
        this.direction = '';
        this.key = '';

        this.constructor.counter = (this.constructor.counter || 0) + 1;
        this.id = this.constructor.counter;

        Player.allInstances.push(this);
    };
};


Player.allInstances = [];

let p1 = new Player(50, 50, '#6EE2FFFF');
let p2 = new Player(690, 450, '#F7C530FF');


function setDirection(key, player, up, right, down, left) {
    switch (key) {
        case up:
            if (player.direction !== 'DOWN') {
                player.key = 'UP'
            };
            break;
        case right:
            if (player.direction !== 'LEFT') {
                    player.key = 'RIGHT'
                };
            break;
        case down:
            if (player.direction !== 'UP') {
                player.key = 'DOWN'
            };
            break;
        case left:
            if (player.direction !== 'RIGHT') {
                player.key = 'LEFT'
            };
            break;
        default:
            break;
    };
};


function handleKeyPress(e) {
  let key = e.keyCode;

  if (key === 37 || key === 38 || key === 39 || key === 40) {
    e.preventDefault();
  };

  setDirection(key, p1, 87, 68, 83, 65);
  setDirection(key, p2, 38, 39, 40, 37);
};

document.addEventListener('keydown', handleKeyPress);


function setPlayableArea(canvas, pixels) {
    let playableArea = new Set();

    for (let i = 0; i < canvas.width / pixels; i++) {
        for (let j = 0; j < canvas.height / pixels; j++) {
            playableArea.add(`${i * pixels}x${j * pixels}y`);
        };
    };
    return playableArea;
};


let playableArea = setPlayableArea(canvas, pixels);

function drawBackground(){
  context.strokeStyle = '#1a1a1a';
  context.lineWidth = 1;
  for (let i = 0; i <= canvas.width / pixels; i ++) {
    for (let j = 0; j <= canvas.height / pixels; j ++) {
      context.strokeRect(0, 0, pixels * i, pixels * j);
    };
  };
};

drawBackground();

function renderPlayers(players) {
    players.forEach(player => {
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, pixels, pixels);

        context.strokeStyle = 'black';
        context.strokeRect(player.x, player.y, pixels, pixels);
    });
};

renderPlayers(Player.allInstances);


let outcome, winnerColor, playerCount = Player.allInstances.length;

function draw() {
  if (Player.allInstances.filter(player => !player.key).length === 0) {

    if (playerCount === 1) {
      const alivePlayers = Player.allInstances.filter(player => player.dead === false);
      outcome = `Player ${alivePlayers[0].id} wins!`;
      winnerColor = alivePlayers[0].color;
    } else if (playerCount === 0) {
      outcome = 'Draw!';
    }

    if (outcome) {
      createResultsScreen(winnerColor);
      clearInterval(game);
    };

    Player.allInstances.forEach(player => {

      if (player.key) {

        player.direction = player.key;

        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, pixels, pixels);
        context.strokeStyle = 'black';
        context.strokeRect(player.x, player.y, pixels, pixels);

        if (!playableArea.has(`${player.x}x${player.y}y`) && player.dead === false) {
          player.dead = true;
          player.direction = '';
          playerCount -= 1;
        }

        playableArea.delete(`${player.x}x${player.y}y`);

        if (!player.dead) {
          if (player.direction === "LEFT") player.x -= pixels;
          if (player.direction === "UP") player.y -= pixels;
          if (player.direction === "RIGHT") player.x += pixels;
          if (player.direction === "DOWN") player.y += pixels;
        };
      };
    });
  }
}

let game = setInterval(draw, 100);


function createResultsScreen(color) {
  const resultNode = document.createElement('div');
  resultNode.id = 'result';
  resultNode.style.color = color || '#fff';
  resultNode.style.position = 'fixed';
  resultNode.style.top = 0;
  resultNode.style.display = 'grid';
  resultNode.style.gridTemplateColumns = '1fr';
  resultNode.style.width = '100%';
  resultNode.style.height = '100vh';
  resultNode.style.justifyContent = 'center';
  resultNode.style.alignItems = 'center';
  resultNode.style.background = '#00000088'

  const resultText = document.createElement('h1');
  resultText.innerText = outcome;
  resultText.style.fontFamily = 'Orbitron, cursive';
  resultText.style.textTransform = 'uppercase';

  const replayButton = document.createElement('button');
  replayButton.innerText = 'Replay (Enter)';
  replayButton.style.fontFamily = 'Orbitron, cursive';
  replayButton.style.textTransform = 'uppercase';
  replayButton.style.padding = '10px 30px';
  replayButton.style.fontSize = '1.2rem';
  replayButton.style.margin = '0 auto';
  replayButton.style.cursor = 'pointer';
  replayButton.onclick = resetGame;

  resultNode.appendChild(resultText);
  resultNode.appendChild(replayButton);
  document.querySelector('body').appendChild(resultNode);

  document.addEventListener('keydown', (e) => {
    let key = e.keyCode;
    if (key == 13 || key == 32 || key == 27 || key == 82)
      resetGame();
  });
};

function resetGame() {
    const result = document.getElementById('result');
    if (result) result.remove();
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    playableArea = setPlayableArea(canvas, pixels);
  
    Player.allInstances.forEach(player => {
      player.x = player.startX;
      player.y = player.startY;
      player.dead = false;
      player.direction = '';
      player.key = '';
    });
    playerCount = Player.allInstances.length;
    console.log(playerCount)
    renderPlayers(Player.allInstances);
  
    outcome = '';
    winnerColor = '';
  
    clearInterval(game);
    game = setInterval(draw, 100);
  };
  
  document.querySelector('#play-btn').addEventListener('click', () => {
    document.querySelector('#play-btn').style.display = 'none';
  }); 
