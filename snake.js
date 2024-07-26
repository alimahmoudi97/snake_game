class Snake {
  constructor(game, x, y, speedX, speedY, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.color = color;
    this.isMoving = true;
    this.score = 0;
    this.length = 2;
    this.segments = [];
  }

  update() {
    if (this.game.colisionCheck(this, this.game.food)) {
      this.score++;
      this.length++;
      this.game.food.reset();
    }
    if (
      (this.x <= 0 && this.speedX < 0) ||
      (this.x >= this.game.columns - 1 && this.speedX > 0) ||
      (this.y <= 0 && this.speedY < 0) ||
      (this.y >= this.game.rows - 1 && this.speedY > 0)
    ) {
      this.isMoving = false;
    }
    if (this.isMoving) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.segments.unshift({ x: this.x, y: this.y });
      if (this.segments.length > this.length) {
        this.segments.pop();
      }
    }
  }

  draw() {
    this.segments.forEach((segment, index) => {
      if (index == 0) this.game.ctx.fillStyle = "gold";
      else this.game.ctx.fillStyle = this.color;
      this.game.ctx.fillRect(
        segment.x * this.game.cellSize,
        segment.y * this.game.cellSize,
        this.width,
        this.height
      );
    });
  }

  turnUp() {
    this.speedX = 0;
    this.speedY = -1;
    this.isMoving = true;
  }
  turnRight() {
    this.speedX = 1;
    this.speedY = 0;
    this.isMoving = true;
  }
  turnDown() {
    this.speedX = 0;
    this.speedY = 1;
    this.isMoving = true;
  }
  turnLeft() {
    this.speedX = -1;
    this.speedY = 0;
    this.isMoving = true;
  }
}

class SnakeKeyboard extends Snake {
  constructor(game, x, y, speedX, speedY, color) {
    super(game, x, y, speedX, speedY, color);
    addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp") {
        this.turnUp();
      } else if (e.key == "ArrowRight") {
        this.turnRight();
      } else if (e.key == "ArrowDown") {
        this.turnDown();
      } else if (e.key == "ArrowLeft") {
        this.turnLeft();
      }
    });
  }
}

class SnakeKeyboardAWSD extends Snake {
  constructor(game, x, y, speedX, speedY, color) {
    super(game, x, y, speedX, speedY, color);
    addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "w") this.turnUp();
      else if (e.key.toLowerCase() === "s") this.turnDown();
      else if (e.key.toLowerCase() === "a") this.turnLeft();
      else if (e.key.toLowerCase() === "d") this.turnRight();
    });
  }
}

class SnakeAi extends Snake {
  constructor(game, x, y, speedX, speedY, color) {
    super(game, x, y, speedX, speedX, color);
    this.timer = 0;
    this.timeInterval = 5;
  }
  //chose random direction
  update() {
    super.update();
    if (this.timer < this.timeInterval) {
      this.timer += 1;
    } else {
      this.timer = 0;
      this.turn();
    }
  }
  turn() {
    if (this.speedX == 0) {
      Math.random() < 0.5 ? this.turnLeft() : this.turnRight();
    } else if (this.speedY == 0) {
      Math.random() < 0.5 ? this.turnUp() : this.turnDown();
    }
  }
}
