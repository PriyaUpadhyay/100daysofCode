document.addEventListener('DOMContentLoaded', () => {
	//our card options in array
	const cardArray = [
	{
		name: 'fries',
		img: 'images/fries.png'
	},
    {
		name: 'cheeseburger',
		img: 'images/cheeseburger.png'
	},
	{
		name: 'ice-cream',
		img: 'images/ice-cream.png'
	},
	{
		name: 'pizza',
		img: 'images/pizza.png'
	},
	{
		name: 'milkshake',
		img: 'images/milkshake.png'
	},
	{
		name: 'hotdog',
		img: 'images/hotdog.png'
	},
	{
		name: 'fries',
		img: 'images/fries.png'
	},
    {
		name: 'cheeseburger',
		img: 'images/cheeseburger.png'
	},
	{
		name: 'ice-cream',
		img: 'images/ice-cream.png'
	},
	{
		name: 'pizza',
		img: 'images/pizza.png'
	},
	{
		name: 'milkshake',
		img: 'images/milkshake.png'
	},
	{
		name: 'hotdog',
		img: 'images/hotdog.png'
	}
	]

	cardArray.sort(() => 0.5 - Math.random())

	const grid = document.querySelector('.grid')
	const resultDisplay = document.querySelector('#result')
	var cardsChosen = []
	var cardsChosenId =[]
	var cardsWon = []

	//create your board
	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			var card = document.createElement('img')
		    card.setAttribute('src', 'images/blank.png')
		    card.setAttribute('data-id', i)
		    card.addEventListener('click', flipcard)
		    grid.appendChild(card)
		}
	}
   //check for matches
   function checkForMatch() {
   	var cards = document.querySelectorAll('img')
   	const optionOneId = cardsChosenId[0]
   	const optionTwoId = cardsChosenId[1]

   	if (optionOneId == optionTwoId) {
   		cards[optionOneId].setAttribute('src', 'images/blank.png')
   		cards[optionTwoId].setAttribute('src', 'images/blank.png')
   		alert('You have clicked the same image!!')
   	}
   	else if (cardsChosen[0] === cardsChosen[1]) {
   		alert("It's a match")
   		cards[optionOneId].setAttribute('src', 'images/white.png')
   		cards[optionTwoId].setAttribute('src', 'images/white.png')
   		cards[optionOneId].removeEventListener('click', flipcard)
   		cards[optionTwoId].removeEventListener('click', flipcard)
   		cardsWon.push(cardsChosen)
   	} else {
   		cards[optionOneId].setAttribute('src', 'images/blank.png')
   		cards[optionTwoId].setAttribute('src', 'images/blank.png')
   		alert('Sorry, Try Again!!')
   	}
   	cardsChosen = []
   	cardsChosenId = []
   	resultDisplay.textContent = cardsWon.length
   	if (cardsWon.length === cardArray.length/2) {
   		resultDisplay.textContent = 'Congratulation! You Found them All!!'

   	}
   }


   //flip card function
   function flipcard() {
   	var cardId = this.getAttribute('data-id')
   	cardsChosen.push(cardArray[cardId].name)
   	cardsChosenId.push(cardId)
   	this.setAttribute('src', cardArray[cardId].img)
   	if (cardsChosen.length === 2){
   		setTimeout(checkForMatch, 500)
   	}
   }

   createBoard()
})