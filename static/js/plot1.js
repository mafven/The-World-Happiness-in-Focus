// JavaScript Questionnaire for id="Questionnaire" - plot1.html
// select  HTML elements and store 
//functions to buid questionaire and show users results
function buildQuestionnaire(){
  // variable to store the HTML output
  const output = [];

  // for each question...
  Questionnaire.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  QuestionnaireContainer.innerHTML = output.join('');
}


function showResults(){

  // gather answer containers from our quiz
  const answerContainers = QuestionnaireContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;
  

  // for each question...
  Questionnaire.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // apply if conditions for the answers
    if(numCorrect <=2){
      // add to the number of correct answers
      // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${Questionnaire.length}
    Not happy. You may be seeing this project as worse than it really is. Try to xxxxxx `;
    }

    if(3 < numCorrect && numCorrect<= 4){
      // add to the number of correct answers
      // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${Questionnaire.length} ---
    Neutral – not really happy or unhappy. Xxxxx xxxxx xxxxx `;
    }
    if(numCorrect >=5){
      // add to the number of correct answers
      // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${Questionnaire.length}
    Extremely happy. That’s right – it’s possible to be too happy. xxxxxxx xxxxxx .`;
    }
  };


// Variables
const QuestionnaireContainer = document.getElementById('Questionnaire');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Questionnaire based on the The Oxford Happiness Questionnaire  ref. readMe
const Questionnaire = [
  {
    question: "I don't feel particularly pleased with the way this visualization is.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "b"
  },

  {
    question: "I feel that this subject is very interesting.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "a"
  },
  {
    question: "I find most things about this visualization amusing.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "a"
  },
  {
    question: "I do not think that the world is a happy place.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "b"
  },
  {
    question: "I laugh a lot.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "a"
  },
  {
    question: "I am well satisfied about everything in my life ( and with this final project).",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "a"
  },
  {
    question: "There is a gap between what I would like to do and what I have done if I was doing this project.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "b"
  },
  {
    question: "I am very happy.",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "a"
  },
  {
    question: "I find beauty in many things (inclusive on this website).",
    answers: {
      a: "Agree",
      b: "Disagree",
    },
    correctAnswer: "a"
  },
];

buildQuestionnaire()
// Event listeners
submitButton.addEventListener('click', showResults)