const draw = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = 'black';
  ctx.font = "40px Monospace"
  ctx.fillText(player.points, 50, 120);
  ctx.font = "15px Monospace"
  ctx.fillText("Damage: " + player.dmg, 50, 50);
  ctx.fillText("Attack speed: " + player.atks, 170, 50)
  ctx.fillText("Bullet cost: " + Math.ceil(2.5 * player.dmg), 50, 70)
  ctx.fillText("Double Jumps: " + player.jumps + "/" + player.maxJumps, 195, 70)
  ctx.fillText("Move speed: " + player.speed, 320, 50)
  //ctx.fillText("Move cost: " + .5 * player.speed, 190, 570)
  ctx.fillRect(player.x, player.y, player.w, player.h);
  if (player.hp < player.maxhp) {
    ctx.fillRect(player.x, player.y - 10, player.hp * (player.w / player.maxhp), 5);
  }
  bullets.forEach(bullet => { bullet.draw() })
  enemies.forEach(enemy => { enemy.draw() })
  ground.forEach(ground => { ground.draw() })
  ctx.fillRect(600, 0, 200, 600);
  ctx.fillStyle= 'white';
  ctx.font = ctx.font = "40px Monospace"
  ctx.fillText("Shop:", 620, 40);
  ctx.font = ctx.font = "15px Monospace"
  ctx.fillText("1. ATK Damage: " + upgradeKeys["1"].price, 620, 70);
  ctx.fillText("2. ATK Speed: " + upgradeKeys["2"].price, 620, 90);
  ctx.fillText("4. Heal: " + upgradeKeys["4"].price, 620, 130);
  ctx.fillText("5. Max HP: " + upgradeKeys["5"].price, 620, 150);
  ctx.fillText("6. Double Jump: " + upgradeKeys["6"].price, 620, 170);
  ctx.fillText("Press the number key", 615, 260);
  ctx.fillText("of the item you wish", 615, 280);
  ctx.fillText("3. Speed: " + upgradeKeys["3"].price, 620, 110);
  ctx.fillText("to purchase", 615, 300);
}
