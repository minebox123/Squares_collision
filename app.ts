const canvas: any = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.height = window.innerHeight / 1.5;
canvas.width = window.innerWidth / 1.5;
canvas.style.background = "#b2b0d6";
const click = new Audio("./click.mp3");

class Square {
  public x: number;
  //   public y: number;
  public width: number;
  public height: number;
  public vx: number;
  public mass: number;
  public count: number;
  constructor(
    x: number,
    width: number,
    height: number,
    vx: number,
    mass: number
  ) {
    this.x = x;
    // this.y = y;
    this.width = width;
    this.height = height;
    this.vx = vx;
    this.mass = mass;
    this.count = 0;
  }

  draw() {
    c.fillStyle = "#003bef";
    c.fillRect(this.x, canvas.height - this.height, this.width, this.height);
  }

  collision(other: Square) {
    this.x -= this.vx;
    other.x -= other.vx;

    let newVx1 =
      ((this.mass - other.mass) / (this.mass + other.mass)) * this.vx +
      ((2 * other.mass) / (this.mass + other.mass)) * other.vx;
    let newVx2 =
      ((2 * this.mass) / (this.mass + other.mass)) * this.vx +
      ((other.mass - this.mass) / (this.mass + other.mass)) * other.vx;

    if (this.x <= other.x + other.width) {
      this.vx = newVx1;
      other.vx = newVx2;
      this.count++;
      click.play();
    }

    if (other.x <= 0) {
      other.vx = -other.vx;
      this.count++;
      click.play();
    }
  }

  text() {
    c.font = "20px Arial";
    c.fillText(`${this.count}`, 100, 100);
  }
}

const small: Square = new Square(200, 50, 50, 0, 1);
const big: Square = new Square(500, 100, 100, 10, 100);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  small.draw();
  big.draw();
  big.collision(small);
  big.text();
  // small.collision(big);
}

animate();
