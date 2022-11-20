/* variables declared using const and let */

/* for loop required in order to create square grid for game
.createElement creates the divs (cells) that make up the grid, and .appendChild adds the divs (cells) to the grid */

/* create a cell variable */

/* alienInvadors variable created and set to an array denoting the number of each cell that requires an alienInvador */

/* draw function created containing a for loop that adds invaders the invaders to the grid using the previously created alienInvaders array */

/* draw function called */

/* function created to remove alienInvaders */

/* add shooter to grid */

/* function created to allow user to move the shooter left and right on the grid
function contains switch statement
shooter will be removed from the grid and then added after the currentShooterIndex has changed */

/* function created to move invadors left and right, and down the grid
begin by declaring the location of the left and right edges of the grid
then declare what should happen when the invadors reach each side of the grid using if statements containing for loops
then declare a for loop that moves the invaders
then declare draw 
the declare if statement that states that if the invader and the shooter lie in the same cell, the screen displays 'Game Over' and the game stops
then declare a for statement containing an if statement that sidplays 'Game Over' and stops the game if the invaders reach the bottom of the screen
finally, declare an if statement that displays 'You Win' if all the invaders have been removed */

/* set invadersId equal to setInterval(moveInvaders, 600) to move the invaders every 600ms */

/* declare shoot function that contains a movelaser function that removes the laser from one cell and adds it to another
within this function, create a if statement that removes the laser and invader when they are contained in the same cell
add the umber of invaders removed to the results score and display on screen
use a switch statement to trigger the moveLaser function when the up arrow is clicked */

// Questions
// - where is aliensRemoved declared?
// - line 55 required?
// - line 60 required?
// - line 133?