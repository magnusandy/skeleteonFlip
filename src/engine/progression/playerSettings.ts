import { Optional } from "java8script";
import { Difficulty } from "./difficulty";
import ProgressionManager from "./progressionManager";

//this class will encompase the save state of the player
//all the things they can update or should be tracked
export default class PlayerSettings {
    public static DEFAULT: PlayerSettings = new PlayerSettings(false, false, Difficulty.VERY_EASY, 3, 3, Difficulty.NORMAL, 1, 1);
    //Settings
    public readonly soundOff: boolean;
    public readonly progressionDisabled: boolean;
    private chosenDifficulty: Difficulty;
    private chosenGridSize: number;

    //Unlocks
    public readonly maxLevel: number;
    public readonly maxDifficulty: Difficulty;

    //Progression
    private currentLevel: number;
    private currentStage: number;

    private constructor(toggleSound, progressionDisabled, chosenDiff, chosenGridSize, maxLevel, maxDiff, currentLevel, currentStage) {
        this.soundOff = toggleSound;
        this.progressionDisabled = progressionDisabled;
        this.chosenDifficulty  = chosenDiff;
        this.chosenGridSize = chosenGridSize;
        this.maxLevel = maxLevel;
        this.maxDifficulty = maxDiff;
        this.currentLevel = currentLevel;
        this.currentStage = currentStage;
    }    

    public setCurrentLevel(newCurrent: number): void {
        this.currentLevel = newCurrent;
    }

    public setCurrentStage(newStage: number): void {
        this.currentStage = newStage;
    }

    public setChosenGridSize(gridSize: number): void {
        this.chosenGridSize = gridSize;
    }

    public setChosenDifficulty(difficutly: Difficulty): void {
        this.chosenDifficulty = difficutly;
    }

    public getCurrentLevel(): number {
        return this.currentLevel;
    }

    public getCurrentStage(): number {
        return this.currentStage;
    }

    public  getChosenDifficulty(): Difficulty {
        return this.chosenDifficulty;
    }

    public getChosenGridSize(): number {
        return this.chosenGridSize;
    }
}