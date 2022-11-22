/* variables declared using const and let */

const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0


/* for loop required in order to create square grid for game
.createElement creates the divs (cells) that make up the grid, and .appendChild adds the divs (cells) to the grid */

for (let i = 0; i < 225; i++){
  const cell = document.createElement('div')
  grid.appendChild(cell)
  console.log('cell', i, 'created')
}

/* create a cell variable */

const cells = Array.from(document.querySelectorAll('.grid div'))

/* alienInvadors variable created and set to an array denoting the number of each cell that requires an alienInvador */

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

/* draw function created containing a for loop that adds invaders the invaders to the grid using the previously created alienInvaders array */

function createInvaders() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      cells[alienInvaders[i]].classList.add('invader')
    }
  }
}

/* draw function called */

createInvaders()

/* function created to remove alienInvaders */

function removeInvaders() {
  for (let i = 0; i < alienInvaders.length; i++) {
    cells[alienInvaders[i]].classList.remove('invader')
  }
}

/* add shooter to grid */

cells[currentShooterIndex].classList.add('shooter')

/* function created to allow user to move the shooter left and right on the grid
function contains switch statement
shooter will be removed from the grid and then added after the currentShooterIndex has changed */

function moveShooter(e) {
  cells[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight':
      if (currentShooterIndex % width < width - 1) currentShooterIndex +=1
      break
  }
  cells[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

/* function created to move invadors left and right, and down the grid
begin by declaring the location of the left and right edges of the grid
then declare what should happen when the invadors reach each side of the grid using if statements containing for loops
then declare a for loop that moves the invaders
then declare draw 
the declare if statement that states that if the invader and the shooter lie in the same cell, the screen displays 'Game Over' and the game stops
then declare a for statement containing an if statement that sidplays 'Game Over' and stops the game if the invaders reach the bottom of the screen
finally, declare an if statement that displays 'You Win' if all the invaders have been removed */

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
  removeInvaders()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  createInvaders()

  if (cells[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > (cells.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvaders.length){
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}

/* set invadersId equal to setInterval(moveInvaders, 500) to move the invaders every 300ms */

invadersId = setInterval(moveInvaders, 500)

/* declare shoot function that contains a movelaser function that removes the laser from one cell and adds it to another
within this function, create a if statement that removes the laser and invader when they are contained in the same cell
add the umber of invaders removed to the results score and display on screen
use a switch statement to trigger the moveLaser function when the up arrow is clicked */

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser(){
    cells[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    cells[currentLaserIndex].classList.add('laser')

    if (cells[currentLaserIndex].classList.contains('invader')){
      cells[currentLaserIndex].classList.remove('laser')
      cells[currentLaserIndex].classList.remove('invader')
      cells[currentLaserIndex].classList.add('boom')

      setTimeout(()=> cells[currentLaserIndex].classList.remove('boom'),300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
    }

  }
  switch (e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keyup', shoot)