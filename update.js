const update = () => {
  player.onGround = false;
  ground.forEach(ground => { ground.update() })
  test.innerHTML = player.jumps;
  if (pressed["d"] && player.x + player.w < 600) {
    player.dx = player.speed
  } else if (pressed["a"] && player.x > 0) {
    player.dx = -player.speed
  } else {
    player.dx = 0;
  }
  
  if (pressed["ArrowLeft"]) {
    shoot(-12);
  } else if (pressed["ArrowRight"]) {
    shoot(12);
  }
  if (pressed["s"]) {
    player.dy += .3;
  }
  if (!player.onGround) {
    player.dy += .1;
  } else {
    player.dy = 0;
    player.jumps = player.maxJumps;
  }
  if (player.y > 550 - player.h) {
    player.y = 550 - player.h;
  }
  if (player.dx != 0 || player.dy != 0) {
    moveCosting += .005 * player.speed;
    if (moveCosting >= 1) {
      moveCosting--;
      player.points--;
    }
  }
  //if (player.x > 0 && player.x + player.w < 600) {
  player.x += player.dx;
  if (player.dy > 0 || player.y > 0) {
    player.y += player.dy;
  } else {
    player.dy *= -.5;
  }
  bullets.forEach(bullet => { bullet.update() })
  bullets = bullets.filter((bullet) => { return bullet.active });
  enemies.forEach(enemy => { enemy.update() })
  enemies = enemies.filter((enemy) => { return enemy.active });
  let rand = Math.random() * 100
  if (rand < 0.25) {
    enemies.push(new enemyPref(0, 0));
  } else if (rand < 0.5) {
    enemies.push(new enemyPref(600, 0));
  }
  if (rand > 98.3 && player.dy === 0 && player.dx === 0) {
    player.points++;
  }
  if (player.hp <= 0) {
    spawn()
  }
  //player.hp += 0.0007
}
