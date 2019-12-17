"use strict";
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight / 1.5;
canvas.width = window.innerWidth / 1.5;
canvas.style.background = "#b2b0d6";
var click = new Audio("./click.mp3");
var Square = /** @class */ (function () {
    function Square(x, width, height, vx, mass) {
        this.x = x;
        // this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.mass = mass;
        this.count = 0;
    }
    Square.prototype.draw = function () {
        c.fillStyle = "#003bef";
        c.fillRect(this.x, canvas.height - this.height, this.width, this.height);
    };
    Square.prototype.collision = function (other) {
        this.x -= this.vx;
        other.x -= other.vx;
        var newVx1 = ((this.mass - other.mass) / (this.mass + other.mass)) * this.vx +
            ((2 * other.mass) / (this.mass + other.mass)) * other.vx;
        var newVx2 = ((2 * this.mass) / (this.mass + other.mass)) * this.vx +
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
    };
    Square.prototype.text = function () {
        c.font = "20px Arial";
        c.fillText("" + this.count, 100, 100);
    };
    return Square;
}());
var small = new Square(200, 50, 50, 0, 1);
var big = new Square(500, 100, 100, 10, 100);
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
