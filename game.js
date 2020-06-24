const ctx = cvs.getContext("2d");
let bullets = [];
let enemies = [];
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

const player = new component(290, 350, 0, 0, 20, 20);
player.dmg = 2;
player.maxhp = 5;
player.hp = player.maxhp;
player.points = 50;
player.atks = 1;
player.speed = 5;
player.maxJumps = 0;
player.jumps = player.maxJumps;
player.onGround = false;
const upgradeKeys = {
  "1": {
    stat: "dmg",
    increase: 1,
    price: 600,
    priceIncrease: 200
  },
  "2": {
    stat: "atks",
    increase: 1,
    price: 400,
    priceIncrease: 200
  },
  "3": {
    stat: "speed",
    increase: .5,
    requirement: player => player.points >= -5000,
    price: 650,
    priceIncrease: 200
  },
  "4": {
    stat: "hp",
    increase: 1,
    requirement: player => player.points >= 0 && player.hp < player.maxhp,
    price: 500,
    priceIncrease: 200
  },
  "5": {
    stat: "maxhp",
    increase: 1,
    price: 500,
    priceIncrease: 300
  },
  "6": {
    stat: "maxJumps",
    increase: 1,
    price: 750,
    priceIncrease: 500
  }
};
let pressed = {};
['keydown', 'keyup'].forEach(type => document.addEventListener(
  type,
  event => {
    let upgrade = upgradeKeys[event.key];
    if (!event.repeat && upgrade !== undefined) {
      // if this upgrade has no requirement or it does and the requirement is met,
      if (upgrade.requirement == undefined || upgrade.requirement(player)) {
        if (type == 'keydown') {
          player[upgrade.stat] += upgrade.increase;
          player.points -= upgrade.price;
          upgrade.price += upgrade.priceIncrease;
        }
      }
    }
    if (event.key == 'w' && type == 'keydown') {
      jump(false);
    }
    return pressed[event.key] = type == 'keydown';
  },
  false
));
const shoot = (speed) => {
  if (!hasShot && player.points >= Math.ceil(2.5 * player.dmg)) {
    bullets.push(new bulletPref(player.x + player.w / 2 - 2.5, player.y + player.h / 2 - 2.5, speed));
    hasShot = true;
    setTimeout(() => { hasShot = false }, 110 - (10 * player.atks));
    player.points -= Math.ceil(2.5 * player.dmg);
  }
}
const jump = (enemyHit) => { // search: jumpf
  if (player.onGround || enemyHit || player.x < 10 || player.x > 590 - player.w || player.jumps > 0) {
    if (!player.onGround && player.x > 10 && player.x <  590 - player.w ) {
      player.jumps--;
    }
    player.y -= 5;
    player.onGround = false;
    player.dy = -5;
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
    if (this.x > 600 || this.x < 0) {
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
    if (this.hp < 20) {
      ctx.fillRect(this.x, this.y - 10, this.hp * (this.w / 20), 5);
    }
  }
  this.update = () => {
    this.x += this.dx;
    this.y += this.dy;
    bullets.forEach((bullet) => {
      if (bullet.x > this.x && bullet.x < this.x + this.w && bullet.y > this.y && bullet.y < this.y + this.h) {
        this.hp -= player.dmg;
        bullet.active = false;
        player.points += 15;
      }
    })
    if (this.x > player.x - 5 && this.x < player.x + player.w + 5 && this.y > player.y - 5 && this.y < player.y + player.h + 5) {
      player.hp -= 1;
      this.active = false;
      player.points -= 50;
      jump(true);
    }
    if (this.x + this.w > player.x - 5 && this.x + this.w < player.x + player.w + 5 && this.y + this.h > player.y - 5 && this.y + this.h < player.y + player.h + 5) {
      player.hp -= 1;
      this.active = false;
      player.points -= 50;
      jump(true);
    }
    if (this.hp <= 0) {
      this.active = false;
      player.points += 100
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
function platform(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = () => {
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.strokeRect(this.x, this.y, this.w, this.h)
  }
  this.update = () => {
    /*if (player.y + player.h > this.y - 2 && player.y + player.h < this.y + 7 && player.x < this.x + this.w && player.x + player.w > this.x) {
      player.onGround = true;
    } else if (player.y + player.h > 550) {
      player.onGround = true;
    }
    */
    if (player.y + player.h < this.y + this.h && player.y + player.h + player.dy > this.y && player.x < this.x + this.w && player.x + player.w > this.x) {
      player.dy = 0;
      player.onGround = true;
    }
  }
}
const ground = [];
ground.push(new platform(0, 545, 600, 5))
ground.push(new platform(200, 400, 200, 4))
ground.push(new platform(0, 472.5, 200, 4))
ground.push(new platform(400, 472.5, 200, 4))


const spawn = () => {
  player.points = 50;
  player.maxhp = 5;
  player.hp = player.maxhp;
  enemies = [];
  player.x = 290;
  player.y = 350;
  player.atks = 1;
  player.dmg = 2;
  player.speed = 5;
  player.maxJumps = 0;
  player.jumps = player.maxJumps;
  upgradeKeys["1"].price = 600
  upgradeKeys["2"].price = 400
  upgradeKeys["3"].price = 650
  upgradeKeys["4"].price = 500
  upgradeKeys["5"].price = 500
  upgradeKeys["6"].price = 750
  bullets.forEach(bullet => { bullet.active = false; })
}
setInterval(() => { update(); draw(); }, 1000 / 60);
