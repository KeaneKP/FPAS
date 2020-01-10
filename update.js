class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	get len() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	add(vec) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}
	mul_scalar(scalar) {
		return new Vec2(this.x * scalar, this.y * scalar);
	}
	div_scalar(scalar) {
		return (!scalar) ? this.clone() : new Vec2(this.x / scalar, this.y / scalar);
	}
	normalize() {
		return this.div_scalar(this.len);
	}
	clone() {
		return new Vec2(this.x, this.y);
	}
}

// TODO: testing framework?
function test_vec() {
	let my_vec = new Vec2(1.0, 3.0).normalize();

	// assert my_vec.len ~= 1.0
	console.log(my_vec.len);
}
// window.onload = test_vec;

let controls = {
	"d": new Vec2( 1.0,  0.0),
	"a": new Vec2(-1.0,  0.0),
	"w": new Vec2( 0.0, -1.0),
	"s": new Vec2( 0.0,  1.0)
};

const update = () => {
  let move_vec = Object.keys(controls).reduce(
	  (move_vec, key) => (pressed[key]) ? move_vec.add(controls[key]) : move_vec,
	  new Vec2(0.0, 0.0)
  ).normalize().mul_scalar(player.speed);

  player.dx = move_vec.x;
  player.dy = move_vec.y;

  if (pressed["ArrowLeft"]) {
    shoot(-12);
  } else if (pressed["ArrowRight"]) {
    shoot(12);
  }
  if (player.dx != 0 || player.dy != 0) {
    moveCosting += .005 * player.speed;
    if (moveCosting >= 1) {
      moveCosting--;
      player.points--;
    }
  }
  player.x+=player.dx;
  player.y+=player.dy;
  bullets.forEach((bullet) => {bullet.update()})
  bullets = bullets.filter( (bullet) => {return bullet.active});
  enemies.forEach((enemy) => {enemy.update()})
  enemies = enemies.filter( (enemy) => {return enemy.active});
  let rand = Math.floor(Math.random() * 750)
  if (rand == 1) {
    enemies.push(new enemyPref(0, 0));
  } else if (rand == 2) {
    enemies.push(new enemyPref(600, 0));
  } else if (rand == 3) {
    enemies.push(new enemyPref(0, 600));
  } else if (rand == 4) {
    enemies.push(new enemyPref(600, 600));
  }
  if (rand > 700 && player.dy == 0 && player.dx == 0) {
    player.points++;
  }
  if (player.hp <= 0) {
    player.points=20;
    player.hp = 5;
    enemies = [];
    player.x = 290;
    player.y = 290;
    player.atks = 1;
    player.dmg = 2;
    player.speed = 5;
    healMod = 0;
  }
  //player.hp += 0.0007
}
