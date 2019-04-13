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
First Iteration (basic functionality): 
    - Options:
        - "confirm" type button on options page
    - Help Page
    - buttons for end pages (contine for victory or menu for end);
    - Display names of difficulty in the options  
    - saved sound settings needs to apply to sound manager after initialized

Second Iteration (upgrades):
    - track coins
    - only get coins on victory
    - add a grid size level bonus when you hit your max size in progression
    - level bonus should scale with difficulty
    - upgrade to get more heart/sword storage
    - upgrade to get more base hearts/swords
    - upgrade to higher difficulties
    - upgrade for higher grid sizes
    - upgrade sword kills give a coin
    - upgrade to switch grid counts between card types
    - upgrade level bonus
    - extra lives to protect from game over
    - button to clear saves

Misc:
    - grid size being hidden when boots up as story disabled
    - persist current game states so restart of app doesnt reset level
    - decide how to deal with what happens to current progression if difficulty changes
    - 350/675
    - redraw if resize
    - refactor the scenes to initialize actions on initialize not activate
    - maybe when you clear a row/col it disappears
    - unlimited mode, clearing a row or column will delete and add a new on the end
    - al bhed mode

Tools and Resources used: 
- Excalibur JS (https://excaliburjs.com/)
- Piskel (https://www.piskelapp.com/)
- Song-Maker (https://musiclab.chromeexperiments.com/Song-Maker/)
- FreeSound (freesound.org)
- Cordova (https://cordova.apache.org/)
