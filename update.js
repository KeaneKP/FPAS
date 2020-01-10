const update = () => {
  if (dPressed) {
    player.dx = player.speed
  } else if (aPressed) {
    player.dx = -player.speed
  } else {
    player.dx = 0;
  }
  if (wPressed) {
    player.dy = -player.speed
  } else if (sPressed) {
    player.dy = player.speed
  } else {
    player.dy = 0;
  }
  if (leftPressed) {
    shoot(-12);
  } else if (rightPressed) {
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