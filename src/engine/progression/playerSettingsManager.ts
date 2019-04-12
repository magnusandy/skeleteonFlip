import { Optional } from "java8script";
import { Difficulty } from "./difficulty";
import ProgressionManager from "./progressionManager";
import * as localForage from "localforage";

//this class will encompase the save state of the player
//all the things they can update or should be tracked

interface SaveDataV1 {
    version: number;
    soundOff: boolean;
    progressionDisabled: boolean;
    chosenDifficulty: number; //difficulty level number
    chosenGridSize: number;
    maxLevel: number;
    maxDifficulty: number; //difficulty level number
    currentLevel: number;
    currentStage: number;
}

export default class PlayerSettingsManager {
    private static STORE_KEY = 'player_settings_v1';
    public static singleton: PlayerSettingsManager;
    private static DEFAULT: PlayerSettingsManager = new PlayerSettingsManager(false, false, Difficulty.VERY_EASY, 3, 3, Difficulty.NORMAL, 1, 1);
    //Settings
    private soundOff: boolean;
    private progressionDisabled: boolean;
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
        this.chosenDifficulty = chosenDiff;
        this.chosenGridSize = chosenGridSize;
        this.maxLevel = maxLevel;
        this.maxDifficulty = maxDiff;
        this.currentLevel = currentLevel;
        this.currentStage = currentStage;
    }

    public static get(): PlayerSettingsManager {
        return this.singleton;
    }

    public static initialize(): void {
        localForage.config({
            name: 'skeletonFlip',
            version: 1.0,
            size: 4980736,
            storeName: 'playerSettings',
            description: 'Store save data'
        });//try with no settings
        localForage.getItem(PlayerSettingsManager.STORE_KEY, (e, v) => {
            console.log(v);
            if(e) {
                console.log(`problem retrieving from store: ${e}`);
                this.singleton = PlayerSettingsManager.DEFAULT;
            } else if (!v) {
                this.singleton = PlayerSettingsManager.DEFAULT;
            } else {
                const saveData: any = v;
                if(saveData.version === 1) {
                    this.singleton = PlayerSettingsManager.deserializeV1(saveData);
                }
            }
        })
    }

    public setCurrentLevel(newCurrent: number): void {
        this.currentLevel = newCurrent;
        this.saveToStorage();
    }

    public setCurrentStage(newStage: number): void {
        this.currentStage = newStage;
        this.saveToStorage();
    }

    public setChosenGridSize(gridSize: number): void {
        this.chosenGridSize = gridSize;
        this.saveToStorage();
    }

    public setChosenDifficulty(difficutly: Difficulty): void {
        this.chosenDifficulty = difficutly;
        this.saveToStorage();
    }

    public isSoundOff(): boolean {
        return this.soundOff;
    }

    public setIsSoundOff(isSoundOff: boolean): void {
        this.soundOff = isSoundOff;
        this.saveToStorage();
    }

    public getCurrentLevel(): number {
        return this.currentLevel;
    }

    public getCurrentStage(): number {
        return this.currentStage;
    }

    public getChosenDifficulty(): Difficulty {
        return this.chosenDifficulty;
    }

    public getChosenGridSize(): number {
        return this.chosenGridSize;
    }

    public setProgressionDisabled(isProgDisabled: boolean) {
        this.progressionDisabled = isProgDisabled;
        this.saveToStorage();
    }

    public isProgressionDisabled(): boolean {
        return this.progressionDisabled;
    }

    private serializeV1(): SaveDataV1 {
        return {
            version: 1,
            soundOff: this.soundOff,
            progressionDisabled: this.progressionDisabled,
            chosenDifficulty: this.chosenDifficulty.getDifficultyLevel(),
            chosenGridSize: this.chosenGridSize,
            maxLevel: this.maxLevel,
            maxDifficulty: this.maxDifficulty.getDifficultyLevel(),
            currentLevel: this.currentLevel,
            currentStage: this.currentStage,
        }
    }

    private static deserializeV1(save: any): PlayerSettingsManager {
        return new PlayerSettingsManager(
            save.soundOff,
            save.progressionDisabled,
            Difficulty.getByDifficultyLevel(save.chosenDifficulty),
            save.chosenGridSize,
            save.maxLevel,
            Difficulty.getByDifficultyLevel(save.maxDifficulty),
            save.currentLevel,
            save.currentLevel);
    }

    private saveToStorage() {
        localForage.setItem(
            PlayerSettingsManager.STORE_KEY,
            this.serializeV1(),
        );
    }
}