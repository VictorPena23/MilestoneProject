
let pipe1_hg;
let hole1_hg;
let pipe2_hg;

//THIS CODE I'M USING HERE IS TO RANDOMLY CHANGE THE TWO HTML PROPERTIES I HAVE LABELED
//"PIPE1" AND "PIPE2" EVERY 4 SECONDS SO IT CAN BE POSITION THEM DIFFERENTLY THAN BEFORE

const pipe1 = document.getElementById("pipe1");
const pipe2 = document.getElementById("pipe2");

setInterval(() => {
    const pipe1_hg = Math.floor(Math.random()*20) + 20;
    const hole1_hg = Math.floor(Math.random()*20) + 20;

    pipe1.style.height = `${pipe1_hg}%`;
    pipe2.style.top = `${pipe1_hg + hole1_hg}%`;
    pipe2.style.height = `${100 - (pipe1_hg + hole1_hg)}%`;
}, 4000);

let elem=document.getElementById("ufo");

//GRAVITIY FUNCTIONALITY 
//THIS CODE IS USING THE setInterval FUNCTION TO CONTINUOUSLY REPEAT AND EXECUTE CODES
//FOR EVERY 20 SECONDS


setInterval(() => {
  let x=parseInt(window.getComputedStyle(elem).getPropertyValue("top"));
  if(x<=510){
      elem.style.top=(x+3)+"px";
  }
  else{
      alert("Your UFO crashed! You Lost! : "+score);
      elem.style.top=100+"px";
      window.location.reload();
  }
}, 20);


//JUMP FUNCTIONALITY
//THIS CODE MOVES THE ELEMENT UP BY 30 PIXELS EVERYTIME THE SPACE BAR IS PRESSED MAKING
//THE GAME PROGRESS 

function jump(){
    let fly=parseInt(window.getComputedStyle(elem).getPropertyValue("top"));
    if(fly>=10){
        elem.style.top=(fly-30)+"px";
    }
}

document.addEventListener('keyup', event =>{
    if(event.code==='Space'){
        jump();
    }
})


//THE SCORE FUNCTIONALITY
//THIS PART OF THE CODE IS WHAT MAKES THE SCORE START INCREASING EVERY 3 SECONDS 
//AND ALSO DISPLAYING THE SCORE

let score = 0;
setInterval(function(){
    score++;
    document.querySelector("#scr").textContent = score;
}, 300);



//OBSTACLES
//DEFINES THE FUNCTION THAT CHECKS FOR THE "PIPE1", "PIPE2", AND "UFO"
//AND MAKES SURE WHEN A COLLISION HAPPENS IT WOULD GO AHEAD AND END THE GAME AND
//PRESENT THE PLAYER WITH A ALERT MESSAGE AND SCORE
// I WENT AHEAD AND USED A forEach loop TO CHECK FOR THIS 
function checkCollision(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();

  return (rect1.right >= rect2.left && rect1.left <= rect2.right)
         && (rect1.bottom >= rect2.top && rect1.top <= rect2.bottom);
}

setInterval(() => {
  const ufo = document.getElementById("ufo");
  const pipes = ["pipe1", "pipe2"];
  pipes.forEach(pipe => {
    if (checkCollision(ufo, document.getElementById(pipe))) {
      elem.style.top = "513px";
      setTimeout(() => {
        alert(`Your UFO crashed! You Lost! : ${score}`);
        window.location.reload();
      }, 10);
    }
  });
}, 100);
