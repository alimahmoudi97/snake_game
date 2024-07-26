class Food {
  constructor(game, x, y, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.color = color;
    this.reset();
  }
  draw() {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(
      this.x * this.game.cellSize,
      this.y * this.game.cellSize,
      this.game.cellSize,
      this.game.cellSize
    );
  }

  reset() {
    this.x = Math.floor(Math.random() * this.game.columns);
    this.y = Math.floor(Math.random() * this.game.rows);
  }

  update() {}
}
