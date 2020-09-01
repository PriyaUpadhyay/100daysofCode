const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let countRightAnswers =0;

let shuffledQustions, currentQuestionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame() {
    console.log('started')
    countRightAnswers = 0;//to reset the score counter after test started
    document.getElementById('right-answers').innerHTML = 0;
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
	resetState()

	showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question){
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if(answer.correct){
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click',selectAnswer)
		answerButtonsElement.appendChild(button)
	})
    
    
}

function resetState(){
	clearStatusClass(document.body)
	nextButton.classList.add('hide')

	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
    } else {

    	startButton.innerText = 'Restart'
    	startButton.classList.remove('hide')
    }
    if (selectedButton.dataset = correct) {
    	countRightAnswers++;
    }
    document.getElementById('right-answers').innerHTML = countRightAnswers;//span will show the score

	

}

function setStatusClass(element, correct){
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element){
	element.classList.remove('correct')
	element.classList.remove('wrong')
}

const questions = [
{
	question: 'JavaScript Code can be called by using ____________  ?',
	answers: [
     { text: 'RMI', correct: false},
     {text: 'Function/Method', correct: true},
     {text: 'Triggering Event' , correct: false},
     {text: 'none of the above', correct: false}
	]
},
{
	question: 'The script tag must be placed in __________?',
	answers: [
     { text: 'the head tag', correct: false},
     {text: 'the body tag', correct: false},
     {text: 'head or body' , correct: true},
     {text: 'none of the above', correct: false}
	]
},
{
	question: 'JavaScript can be written __________?',
	answers: [
     { text: 'directly into JS file and included into HTML', correct: true},
     {text: 'directly on the server page', correct: false},
     {text: 'directly into HTML pages' , correct: false},
     {text: 'none of the above', correct: false}
	]
}

]