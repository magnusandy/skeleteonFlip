import { Optional } from "java8script";
import { Difficulty } from "./difficulty";
import * as localForage from "localforage";
import { CardType } from "../../actors/card/card";
import { GridState } from "./gridState";

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
    storyGrid?: SaveDataGrid;
    practiceGrid?: SaveDataGrid;
    totalCoins: number;
}

export interface SaveDataGrid {
    hearts: number;
    swords: number;
    coins: number;
    gridSize: number;
    grid: SaveCellData[][];
};

export interface SaveCellData {
    type: CardType;
    flipped: boolean;
}


export default class PlayerSettingsManager {
    private static STORE_KEY = 'player_settings_v1';
    public static singleton: PlayerSettingsManager;
    private static DEFAULT: PlayerSettingsManager = new PlayerSettingsManager(false, false, Difficulty.VERY_EASY, 3, 5, Difficulty.EASY, 1, 1, Optional.empty(), Optional.empty(), 0);


    //Settings
    private soundOff: boolean;
    private progressionDisabled: boolean;
    private chosenDifficulty: Difficulty;
    private chosenGridSize: number;

    //Unlocks
    private maxGrid: number; 
    private maxDifficulty: Difficulty;

    //Progression
    private totalCoins: number; //total coins collected, outside of current games
    private currentLevel: number;
    private currentStage: number;
    private storyGrid: Optional<GridState>;
    private practiceGrid: Optional<GridState>;


    private constructor(toggleSound: boolean,
        progressionDisabled: boolean,
        chosenDiff: Difficulty,
        chosenGridSize: number,
        maxLevel: number,
        maxDiff: Difficulty,
        currentLevel: number,
        currentStage: number,
        storyGrid: Optional<GridState>,
        practiceGrid: Optional<GridState>,
        totalCoins: number,
    ) {
        this.soundOff = toggleSound;
        this.progressionDisabled = progressionDisabled;
        this.chosenDifficulty = chosenDiff;
        this.chosenGridSize = chosenGridSize;
        this.maxGrid = maxLevel;
        this.maxDifficulty = maxDiff;
        this.currentLevel = currentLevel;
        this.currentStage = currentStage;
        this.storyGrid = storyGrid;
        this.practiceGrid = practiceGrid;
        this.totalCoins = totalCoins;
    }

    public static get(): PlayerSettingsManager {
        return this.singleton;
    }

    public static initialize(): Promise<any> {
        localForage.config({
            name: 'skeletonFlip',
            version: 1.0,
            size: 4980736,
            storeName: 'playerSettings',
            description: 'Store save data'
        });//try with no settings
        return localForage.getItem(PlayerSettingsManager.STORE_KEY, (e, v) => {
            console.log(`retrieved from storage:`, [v]);
            if (e) {
                console.log(`problem retrieving from store: ${e}`);
                this.singleton = PlayerSettingsManager.DEFAULT;
            } else if (!v) {
                this.singleton = PlayerSettingsManager.DEFAULT;
            } else {
                const saveData: any = v;
                if (saveData.version === 1) {
                    this.singleton = PlayerSettingsManager.deserializeV1(saveData);
                }
            }
        });
    }
    /** 
    * clear grid state
    */
    public saveGridState(): void;
    /** 
     * clear grid state
     */    
    public saveGridState(gridState: GridState);
    public saveGridState(gridState?: GridState): void {
        if (this.isProgressionDisabled()) {
            this.practiceGrid = Optional.ofNullable(gridState);
        } else {
            this.storyGrid = Optional.ofNullable(gridState);
        }
        this.saveToStorage();
    }

    public getGridState(): Optional<GridState> {
        if (this.isProgressionDisabled()) {
            return this.practiceGrid;
        } else {
            return this.storyGrid;
        }
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

    public getTotalCoins(): number {
        return this.totalCoins;
    }

    public setTotalCoins(newTotal: number): void {
        this.totalCoins = newTotal;
        this.saveToStorage();
    }

    public getMaxGridSize(): number {
        return this.maxGrid;
    }

    public setMaxGridSize(newVal: number): void {
        this.maxGrid = newVal;
        this.saveToStorage();
    }

    public getMaxDiff(): Difficulty {
        return this.maxDifficulty;
    }

    public setMaxDiff(newDiff: Difficulty): void {
        this.maxDifficulty = newDiff;
        this.saveToStorage();
    }

    private serializeV1(): SaveDataV1 {
        return {
            version: 1,
            soundOff: this.soundOff,
            progressionDisabled: this.progressionDisabled,
            chosenDifficulty: this.chosenDifficulty.getDifficultyLevel(),
            chosenGridSize: this.chosenGridSize,
            maxLevel: this.maxGrid,
            maxDifficulty: this.maxDifficulty.getDifficultyLevel(),
            currentLevel: this.currentLevel,
            currentStage: this.currentStage,
            storyGrid: this.storyGrid.map(g => g.toSaveState()).orElse(null),
            practiceGrid: this.practiceGrid.map(g => g.toSaveState()).orElse(null),
            totalCoins: this.totalCoins,
        }

    }

    private static deserializeV1(save: SaveDataV1): PlayerSettingsManager {
        return new PlayerSettingsManager(
            save.soundOff,
            save.progressionDisabled,
            Difficulty.getByDifficultyLevel(save.chosenDifficulty),
            save.chosenGridSize,
            save.maxLevel,
            Difficulty.getByDifficultyLevel(save.maxDifficulty),
            save.currentLevel,
            save.currentStage,
            Optional.ofNullable(save.storyGrid).map(s => GridState.fromSaveState(s)),
            Optional.ofNullable(save.practiceGrid).map(s => GridState.fromSaveState(s)),
            save.totalCoins
        );
    }

    private saveToStorage() {
        localForage.setItem(
            PlayerSettingsManager.STORE_KEY,
            this.serializeV1(),
        );
    }

    public clearStorage() { //todo this is temporary, should build in permenatn button or something
        localForage.setItem(PlayerSettingsManager.STORE_KEY, null);
    }
}