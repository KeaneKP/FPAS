const draw = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = 'black';
  ctx.font = "40px Monospace"
  ctx.fillText(player.points, 50, 120);
  ctx.font = "15px Monospace"
  ctx.fillText("Damage: " + player.dmg, 50, 50);
  ctx.fillText("Attack speed: " + player.atks, 170, 50)
  ctx.fillText("Bullet cost: " + Math.ceil(2.5 * player.dmg), 50, 70)
  ctx.fillText("Move speed: " + player.speed, 320, 50)
  //ctx.fillText("Move cost: " + .5 * player.speed, 190, 570)
  ctx.fillRect(player.x, player.y, player.w, player.h);
  if (player.hp < 5) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y - 10, player.hp * (player.w / 5), 5);
  }
  ctx.fillStyle = 'green';
  bullets.forEach(bullet => { bullet.draw() })
  enemies.forEach(enemy => { enemy.draw() })
  ground.forEach(ground => { ground.draw() })
  ctx.fillStyle = 'gray'
  ctx.fillRect(600, 0, 200, 600);
  ctx.font = ctx.font = "40px Monospace"
  ctx.fillStyle = 'red'
  ctx.fillText("Shop:", 620, 40);
  ctx.font = ctx.font = "15px Monospace"
  ctx.fillText("1. ATK Damage: " + upgradeKeys["1"].price, 620, 70);
  ctx.fillText("2. ATK Speed: " + upgradeKeys["2"].price, 620, 90);
  ctx.fillText("4. Heal: " + upgradeKeys["3"].price, 620, 130);
  ctx.fillText("Press the number key", 615, 150);
  ctx.fillText("of the item you wish", 615, 170);
  ctx.fillText("3. Speed: " + upgradeKeys["4"].price, 620, 110);
  ctx.fillText("to purchase", 615, 190);
}
