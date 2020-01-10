const ctx = cvs.getContext("2d");
let bullets = [];
let enemies = []
let moveCosting = 0;
let hasShot = false;
let healMod = 0;
function component(x, y, dx, dy, h, w) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.h = h;
  this.w = w;
}

const player = new component(290, 290, 0, 0, 20, 20);
player.dmg = 2;
player.hp = 5;
player.points = 20;
player.atks = 1;
player.speed = 5;

let pressed = {};
['keydown', 'keyup'].forEach(type => document.addEventListener(
	type, event => pressed[event.key] = type == 'keydown', false
));

const shoot = (speed) => {
  if (!hasShot && player.points >= Math.ceil(2.5 * player.dmg)) {
    bullets.push(new bulletPref(player.x + player.w / 2 - 2.5, player.y + player.h / 2 - 2.5, speed));
    hasShot = true;
    setTimeout(() => { hasShot = false }, 110 - (10*player.atks));
    player.points -= Math.ceil(2.5 * player.dmg);
  }
}
function bulletPref(x, y, dx) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = 0;
  this.h = 5;
  this.w = 10;
  this.active = true;
  this.draw = () => {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  this.update = () => {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > cvs.width || this.x < 0) {
      this.active = false;
    }
  }
}
function enemyPref(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.h = 15;
  this.w = 15;
  this.active = true;
  this.hp = 20;
  this.draw = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y - 10, this.hp * (this.w / 20), 5);
  }
  this.update = () => {
    this.x += this.dx;
    this.y += this.dy;
    bullets.forEach((bullet) => {
      if (bullet.x > this.x && bullet.x < this.x + this.w && bullet.y > this.y && bullet.y < this.y + this.h) {
        this.hp -= player.dmg;
        bullet.active = false;
        player.points+=10;
      }
    })
    if (this.x > player.x - 5 && this.x < player.x + player.w + 5 && this.y > player.y - 5 && this.y < player.y + player.h + 5) {
      player.hp -= 1;
      this.active = false;
      player.points -= 100;
    }
    if (this.x + this.w > player.x - 5 && this.x + this.w < player.x + player.w + 5 && this.y + this.h > player.y - 5 && this.y + this.h < player.y + player.h + 5) {
      player.hp -= 1;
      this.active = false;
    }
    if (this.hp <= 0) {
      this.active = false;
      player.points+=100
    }
    if (Math.abs(player.x - this.x) < 7) {
      this.dx = 0;
    } else if (this.x < player.x) {
      this.dx = 3;
    } else if (this.x > player.x) {
      this.dx = -3;
    }
    if (Math.abs(player.y - this.y) < 7) {
      this.dy = 0;
    } else if (this.y < player.y) {
      this.dy = 3;
    } else if (this.y > player.y) {
      this.dy = -3;
    }
  }
}
const buy = (stat, statIncrease, price) => {
  stat += statIncrease;
  player.points -= price;
}
setInterval(() => { update(); draw(); }, 1000 / 60);
