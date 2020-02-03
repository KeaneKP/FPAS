const update = () => {
  if (pressed["d"]) {
    player.dx = player.speed
  } else if (pressed["a"]) {
    player.dx = -player.speed
  } else {
    player.dx = 0;
  }
  
  if (pressed["ArrowLeft"]) {
    shoot(-12);
  } else if (pressed["ArrowRight"]) {
    shoot(12);
  }
  if (!player.onGround) {
    player.dy += .1;
  } else {
    player.dy = 0;
  }
  if (player.dx != 0 || player.dy != 0) {
    moveCosting += .005 * player.speed;
    if (moveCosting >= 1) {
      moveCosting--;
      player.points--;
    }
  }
  player.x += player.dx;
  player.y += player.dy;
  bullets.forEach((bullet) => { bullet.update() })
  bullets = bullets.filter((bullet) => { return bullet.active });
  enemies.forEach((enemy) => { enemy.update() })
  enemies = enemies.filter((enemy) => { return enemy.active });
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
    player.points = 20;
    player.hp = 5;
    enemies = [];
    player.x = 290;
    player.y = 290;
    player.atks = 1;
    player.dmg = 2;
    player.speed = 5;
    healMod = 0;
    upgradeKeys["1"].price = 600
    upgradeKeys["2"].price = 400
    upgradeKeys["3"].price = 650
    upgradeKeys["4"].price = 500
  }
  //player.hp += 0.0007
}
