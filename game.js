//for question and answer
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
//for head info bar
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
//for progressBar
const progressBarFull = document.getElementById("progressBarFull");



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//Change question at questions.json
let questions = [];

//get question from json
fetch("questions.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.error(err);
  });


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {

  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  //add question counter for head info Bar
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  //iterate element from question and add innerText
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

//iterate element from choice and add innerText
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  //why????
  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

////iterate element from choice and addEventListener
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    //target answet to each choice
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    //set correct and incorrect answer
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    //increasing score in head info bar
    if(classToApply === "correct"){
      incrementScore(CORRECT_BONUS);
    }
    //adding class="correct" and class="incorrect" into corrected answer: choice-text
    selectedChoice.parentElement.classList.add(classToApply);

    //set timing for color change animation
    setTimeout(()=>{
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    },500);
  });
});

//for head info bar: score section
incrementScore = num => {
  score += num;
  totalscore = score;
  scoreText.innerText = totalscore;
};
