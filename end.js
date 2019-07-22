const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
result = (mostRecentScore / 50) * 100;


const congratulationText = document.getElementById("Congratulation");
const passText = document.getElementById("pass");
const homeText = document.getElementById("home");

finalScore.innerText = `${result}% corrected`;

if (result >=50) {
  congratulationText.innerText = `Congratulation!!!`;
  passText.innerText = `You pass the Safety Test <3`;
  homeText.innerText = `Go home`;
  finalScore.style.color = '#05c46b';
}
else {
  congratulationText.innerText = `Try Next Time!!!`;
  passText.innerText = `You are pretty good, Try again dude`;
  homeText.innerText = `Try Again`;
  finalScore.style.color = '#ff3f34';
}
