# Skeleton Flip
Card puzzle game using Excalibur JS
https://magnusandy.github.io/skeletonFlip/

Aim of the game, clear the board without running out of health.

# How to play

The top left of the screen displays your current life (hearts) and current attack (swords). at the start of a round you will begin with 3 life and 0 attack.

The numbers on the edge of the board are the number of skeletons in that row/column.

The goal of the game is to flip every card on the board without losing all of your life.

Card Types: 
 - Skeleton: flipping this card will cause you to lose a life, unless you have an attack, then you will kill that skeleton with the sword
 - Sword: gain an attack
 - Potion: heal any lost life
 - Coin: Gives points

# Development list
Todo List:
- Track score
- Win screen
- options page
    - disable/enable sound
    - change difficuly
    - change grid size
- information/help page
- better support screen size or better mobile display

# Excalibur TypeScript & Webpack Example
This example uses [`Webpack`](https://webpack.github.io/) and [`ts-loader`](https://github.com/TypeStrong/ts-loader) module to compile the TypeScript.