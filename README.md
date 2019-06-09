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
    - Display names of difficulty in the options  
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
    - upgrade toggle to maintain health across levels
    - upgrade maintain swords across levels ( advanced level for always keeping at least the base)

    - extra lives to protect from game over
    - button to clear saves
    - safari (and maybe IOS support) is real bad and by that I mean it doesnt work. audio contexts are broken.
    - one fix might need changes to excaliburjs, AudioContextFactory needs to use new window.webkitAudioContext, it past that there might be some problems with pointer events.

Misc:
    - menu and next buttons on victory/game over page aren't fully clickable
    - don't love the current menu setup, needs to be more centered
    - decide how to deal with what happens to current progression if difficulty changes
    - 350/675
    - redraw if resize
    - maybe when you clear a row/col it disappears
    - unlimited mode, clearing a row or column will delete and add a new on the end
    - al bhed mode
    - get on the app store banner for web
    - still an issue with the backgrounds, "fixed" by changing the default colors so its less noticable

Tools and Resources used: 
- Excalibur JS (https://excaliburjs.com/)
- Piskel (https://www.piskelapp.com/)
- Song-Maker (https://musiclab.chromeexperiments.com/Song-Maker/)
- FreeSound (freesound.org)
- Cordova (https://cordova.apache.org/)
