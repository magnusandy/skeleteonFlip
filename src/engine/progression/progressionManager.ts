import { Difficulty } from "./difficulty";
import PlayerSettings from "./playerSettings";

export default class ProgressionManager {
    private static stagesPerNormalLevel = 3;

    private static singleton: ProgressionManager;
    
    private playerSettings: PlayerSettings;

    private constructor(playerSettings: PlayerSettings) {
        this.playerSettings = playerSettings;
    }

    public static get(): ProgressionManager {
        if (this.singleton) {
            return this.singleton;
        } else {
            this.singleton = new ProgressionManager(
                PlayerSettings.DEFAULT
            );
            return this.singleton;
        }
    }

    public getGameGridSize(): number {
        const ps = this.playerSettings;
        if(ps.progressionDisabled) {
            return ps.getChosenGridSize();
        } else {
            //add 2 to handle the offset from the base grid size i.e. level 1 is grid size 3
            return ps.getCurrentLevel() + 2;
        }
    }

    public getOptionGridSize(): number {
        return this.playerSettings.getChosenGridSize();
    }

    public getDifficulty(): Difficulty {
        return this.playerSettings.getChosenDifficulty();
    }

    public getSkullFactor(): number {
        return this.getDifficulty().getSkeletonFactor();
    }

    public getBuffFactor(): number {
        return this.getDifficulty().getBuffFactor();
    }

    public progress(): void {
        const currentLevel = this.playerSettings.getCurrentLevel();
        const currentStage = this.playerSettings.getCurrentStage();

        if(currentStage >= ProgressionManager.stagesPerNormalLevel) {
            //on the last stage of the level, need to find out if we can move on or just move up stages
            if(currentLevel === this.playerSettings.maxLevel) {
                // on the max upgraded level just increase stage
                this.playerSettings.setCurrentStage(currentStage + 1);
            } else {
                this.playerSettings.setCurrentStage(1);
                this.playerSettings.setCurrentLevel(currentLevel + 1);
            }
        } else {
            //move on to the next stage, no extra logic
            this.playerSettings.setCurrentStage(currentStage + 1);
        }  
    }


    public setGridSize(newSize: number) {
        this.playerSettings.setChosenGridSize(newSize);
    }

    public setDifficulty(difficulty: number) {
        this.playerSettings.setChosenDifficulty(Difficulty.getByDifficultyLevel(difficulty));
    }

    public resetProgress(): void {
        const ps = this.playerSettings;
        if (!ps.progressionDisabled) {
            ps.setCurrentLevel(1);
            ps.setCurrentStage(1);
        }
    }

    public getLevelString(): string {
        if (this.playerSettings.getCurrentStage() > ProgressionManager.stagesPerNormalLevel) {
            return "MAXED";
        } else {
            return `${this.playerSettings.getCurrentLevel()}.${this.playerSettings.getCurrentStage()}`;
        }
    }
}