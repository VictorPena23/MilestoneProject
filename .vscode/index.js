const pipe1 = document.getElementById("pipe1");
const pipe2 = document.getElementById("pipe2");
const ufo   = document.getElementById("ufo");
const scrEl = document.getElementById("scr");

let score = 0;

function restartAnimation(el) {
  el.style.animation = "none";
  el.offsetHeight; // force reflow
  el.style.animation = "";
}

function gameOver() {
  alert(`Your UFO crashed! You Lost! : ${score}`);
  window.location.reload();
}

// Randomize pipe heights (pipe2 anchored with bottom:0 in CSS)
setInterval(() => {
  const topPipe = Math.floor(Math.random() * 30) + 20; // 20–49%
  const hole    = Math.floor(Math.random() * 20) + 20; // 20–39%
  const botPipe = 100 - (topPipe + hole);

  pipe1.style.height = `${topPipe}%`;
  pipe2.style.height = `${botPipe}%`;

  // prevents CSS animation from occasionally "sticking"
  restartAnimation(pipe1);
  restartAnimation(pipe2);
}, 4000);

// Gravity
setInterval(() => {
  const y = parseInt(getComputedStyle(ufo).getPropertyValue("top"), 10);
  if (y <= 510) ufo.style.top = (y + 3) + "px";
  else gameOver();
}, 20);

// Jump (click + space)
function jump() {
  const y = parseInt(getComputedStyle(ufo).getPropertyValue("top"), 10);
  if (y >= 10) ufo.style.top = (y - 30) + "px";
}
window.jump = jump;

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") jump();
});

// Score
setInterval(() => {
  score++;
  scrEl.textContent = score;
}, 300);

// Collision
function checkCollision(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return (
    r1.right >= r2.left &&
    r1.left <= r2.right &&
    r1.bottom >= r2.top &&
    r1.top <= r2.bottom
  );
}

setInterval(() => {
  if (checkCollision(ufo, pipe1) || checkCollision(ufo, pipe2)) {
    setTimeout(gameOver, 10);
  }
}, 60);
