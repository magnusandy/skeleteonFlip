import ProgressionManager from "../engine/progression/progressionManager";

export enum Scenes {
    STORY_GAME_WINDOW = "storyGameWindow",
    GRID_GAME_WINDOW = "gridGameWindow",
    MAIN_MENU = "mainMenu",
    GAME_OVER = "gameOver",
    VICTORY = "victory",
    OPTIONS = "options",
    HELP = "help",
}

export function getGameWindow(): Scenes {
    return ProgressionManager.get().isProgressionDisabled()
        ? Scenes.GRID_GAME_WINDOW 
        : Scenes.STORY_GAME_WINDOW;
}