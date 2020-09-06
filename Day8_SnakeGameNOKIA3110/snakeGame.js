document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div')
	const scoreDisplay = document.querySelector('span')
	const startBtn = document.querySelector('.start')

	const width = 10
	let currentIndex = 0 //so first div in our grid
	let appleIndex = 0 // so first div in our grid
	let currentSnake = [2,1,0] // so the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL with all 1)

	let direction = 1 // snake always go one div down the array
	let score = 0
	let speed = 0.9
	let intervalTime = 0
	let interval = 0

    // to start and restart the game
    function startGame() {
    	currentSnake.forEach(index => squares[index].classList.remove('snake'))
    	squares[appleIndex].classList.remove('apple')
    	clearInterval(interval)
    	score = 0
    	randomApple()
    	direction = 1
    	scoreDisplay.innerText = score
    	intervalTime = 1000
    	currentSnake = [2,1,0]
    	currentIndex = 0
    	currentSnake.forEach(index => squares[index].classList.add('snake'))
    	interval = setInterval(moveOutcomes, intervalTime)
    }

     //function that deals with ALL the ove outcomes of the Snake
     function moveOutcomes() {
     	//deals with snake hitting border and snake hitting self
     	if ( 
     		(currentSnake[0] + width >= (width*width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
        ) {
        	alert('GAME OVER!!')
     		return clearInterval(interval)//this will clear the interval if any of the above happen
        }
        const tail = currentSnake.pop() //removes last ite of the array and shows it
        squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
        	squares[currentSnake[0]].classList.remove('apple')
        	squares[tail].classList.add('snake')
        	currentSnake.push(tail)
        	randomApple()
        	score++
        	scoreDisplay.textContent = score
        	clearInterval(interval)
        	intervalTime = intervalTime * speed
        	interval = setInterval(moveOutcomes, intervalTime)

        }
        squares[currentSnake[0]].classList.add('snake')

     }

     //generate new apple once apple is eaten
     function randomApple() {
     	do {
     		appleIndex = Math.floor(Math.random() * squares.length)
     	} while(squares[appleIndex].classList.contains('snake'))
     	squares[appleIndex].classList.add('apple')
     }  


	// assign function to keycodes
	function control(e) {
		squares[currentIndex].classList.remove('snake')

		if(e.keyCode === 39) {
			direction = 1 //if we press the right arrow the snake will go right
		} else if (e.keyCode === 38) {
			direction = -width
		} else if (e.keyCode === 37) {
			direction = -1
		} else if (e.keyCode === 40) {
			direction = +width
		}
	}

	document.addEventListener('keyup', control)
	startBtn.addEventListener('click', startGame)

})