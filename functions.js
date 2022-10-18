let dice = document.getElementById("dice");
let seconds = document.getElementById("seconds");
let answer = document.getElementById("answer");
let allButtons = document.getElementsByTagName("button");
let score = 0;
let randNum = -1;
let hideLoading = document.getElementById("loadingText");

window.onload = () => {
  startGame();
  showTime();
  NewRandomNum();
}

// game starting and declaration
const startGame = () => {
  // hide loading seconds, win/loss & set selected variable to none
  document.getElementById('secondsLoading').style.visibility="hidden";
  answer.style.visibility="hidden";
  document.getElementById("selectedDice").innerHTML=" none";

  // add event on all buttons
  Array.from(allButtons).forEach(element => {
    element.addEventListener("click", Clicked);
    element.disabled = false;
    element.classList.add("disabled");
  });

  // first game loading screen, game will start in 5 sec
  setTimeout(() => {
    hideLoading.style.visibility="hidden";
    document.getElementById('secondsLoading').style.visibility="visible";
  }, 5000);
}

// added event on each buttons
const Clicked = (e) => {
  // get randome number and set the picture accoring to that, also set gussed
  dice.src = `dice${randNum}.svg`;

  // ser user guessed side with selected dice 
  let guessedSide = (e.target.innerText);
  document.getElementById("selectedDice").innerHTML = ` ${guessedSide}`;
  
  // check if guessed side is correct
  if (randNum == guessedSide) {
    answer.style.color = "#00FF00";
    answer.innerHTML = "Right Guess!!"; // declare win
    score++;
    document.getElementById("scoreText").innerHTML = score; // update score++
  } else { // if it's incorrect
    answer.style.color = "#FF0000";
    answer.innerHTML = "Sorry, Wrong Guess!"; // declare loss
  }

  // disable all the button once one button is clicked
  Array.from(allButtons).forEach(element => {
    element.disabled = true;
    element.classList.toggle("disabled");
  });
}

// it will take 10 second to start new round
const showTime = () => {
  let maxSeconds = 9;
  setInterval(() => {
    seconds.innerHTML = maxSeconds;
    maxSeconds--;
    if (maxSeconds == 0) {
      answer.style.visibility="visible";
      maxSeconds = 10;
    }
  }, 1000);
}

// creating a random number on every 10 seconds
const NewRandomNum = () => {
  setInterval(() => {
    randNum = Math.floor(Math.random() * 6) + 1;

    // set rotating dice again for new round
    dice.src = `https://www.animatedimages.org/data/media/710/animated-dice-image-0047.gif`;
    dice.style.width = "37.5%";
    document.getElementById("selectedDice").innerHTML=" none";

    // enable all the buttons again after 10 seconds
    Array.from(allButtons).forEach(element => {
      element.disabled = false;
      element.classList.remove("disabled");
    });
  }, 10000);
}

