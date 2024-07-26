class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width;
    this.height;
    this.x = 0;
    this.cellSize = 50;
    this.rows;
    this.columns;

    this.eventTimer = 0;
    this.eventInterval = 200;
    this.eventUpdate = false;

    this.player1;
    this.player2;
    this.player3;
    this.food;
    this.gameObjects;

    window.addEventListener("resize", (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    this.resize(window.innerWidth, window.innerHeight);
  }
  resize(width, height) {
    this.canvas.width = width - (width % this.cellSize);
    this.canvas.height = height - (height % this.cellSize);
    this.ctx.fillStyle = "blue";
    this.ctx.font = "50px Impact";
    this.ctx.textBaseline = "top";
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.rows = Math.floor(this.height / this.cellSize);
    this.columns = Math.floor(this.width / this.cellSize);
    this.player1 = new SnakeKeyboard(this, 5, 5, 1, 0, "red");
    this.player2 = new SnakeKeyboardAWSD(this, 10, 10, 0, 1, "blue");
    this.player3 = new SnakeAi(this, 10, 10, 0, 1, "yellow");
    this.food = new Food(this, 5, 5, "white");
    this.gameObjects = [this.player1, , this.player2, this.player3, this.food];
    this.render();
  }
  drawGrid() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        this.ctx.strokeRect(
          y * this.cellSize,
          x * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }
  drawStatusText() {
    this.ctx.fillText(
      "P1 : " + this.player1.score,
      this.cellSize,
      this.cellSize
    );
    this.ctx.fillText(
      "P2 : " + this.player2.score,
      this.cellSize,
      this.cellSize * 2
    );
    this.ctx.fillText(
      "P3 : " + this.player3.score,
      this.cellSize,
      this.cellSize * 3
    );
  }
  colisionCheck(a, b) {
    return a.x == b.x && a.y == b.y;
  }
  handlePeriodicEvents(deltaTime) {
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      this.eventTimer = 0;
      this.eventUpdate = true;
    }
  }
  render(deltaTime) {
    this.handlePeriodicEvents(deltaTime);
    if (this.eventUpdate) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawGrid();
      this.gameObjects.forEach((element) => {
        element.draw();
        element.update();
      });
    }
    this.drawStatusText();
  }
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas, ctx);

  let lastTime = 0;

  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.render(deltaTime);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
