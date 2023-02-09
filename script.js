const num1El = document.querySelector("#num1");
const num2El = document.querySelector("#num2");
const option1El = document.querySelector("#option1");
const option2El = document.querySelector("#option2");
const resultEl = document.querySelector("#result");
const timerDisplay = document.querySelector("#timer");
const startButton = document.querySelector("#start-timer-button");

let score = 0;
let timerStarted = sessionStorage.getItem("timerStarted") === "true";
let timer;

startButton.addEventListener("click", startTimer);

if (timerStarted) {
  startTimer();
}

function startTimer() {
  let seconds = 0;
  timer = setInterval(function () {
    seconds++;
    timerDisplay.innerHTML = seconds + " seconds";
  }, 1000);
}

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  num1El.textContent = num1;
  num2El.textContent = num2;
  const correctAnswer = num1 + num2;

  function wrongAns() {
    var wrongAnswer =
      correctAnswer +
      Math.floor(Math.random() * 4) +
      1 -
      (Math.floor(Math.random() * 4) + 1);
    if (correctAnswer == wrongAnswer) {
      return wrongAnswer - 3;
    } else {
      return wrongAnswer;
    }
  }
  const wrongAnswer = wrongAns();

  const answers = [correctAnswer, wrongAnswer];
  const isLeftOptionCorrect = Math.random() >= 0.5;

  if (isLeftOptionCorrect) {
    option1El.textContent = answers[0];
    option2El.textContent = answers[1];
    option1El.onclick = function () {
      score++;
      resultEl.textContent = "Correct! Score: " + score;
      generateQuestion();
    };
    option2El.onclick = function () {
      resultEl.textContent = "Wrong! Score: " + score;
    };
  } else {
    option1El.textContent = answers[1];
    option2El.textContent = answers[0];
    option1El.onclick = function () {
      resultEl.textContent = "Wrong! Score: " + score;
    };
    option2El.onclick = function () {
      score++;
      resultEl.textContent = "Correct! Score: " + score;
      generateQuestion();
    };
  }
}

generateQuestion();
