import { Difficulty } from "./difficulty";
import PlayerSettingsManager from "./playerSettingsManager";

export default class ProgressionManager {
    private static stagesPerNormalLevel = 3;

    private static singleton: ProgressionManager;
    
    private constructor() {
    }

    public static get(): ProgressionManager {
        if (this.singleton) {
            return this.singleton;
        } else {
            this.singleton = new ProgressionManager();
            return this.singleton;
        }
    }

    public getGameGridSize(): number {
        const ps = PlayerSettingsManager.get();
        if(ps.isProgressionDisabled()) {
            return ps.getChosenGridSize();
        } else {
            //add 2 to handle the offset from the base grid size i.e. level 1 is grid size 3
            return ps.getCurrentLevel() + 2;
        }
    }

    public getOptionGridSize(): number {
        return PlayerSettingsManager.get().getChosenGridSize();
    }

    public getDifficulty(): Difficulty {
        return PlayerSettingsManager.get().getChosenDifficulty();
    }

    public getSkullFactor(): number {
        return this.getDifficulty().getSkeletonFactor();
    }

    public getBuffFactor(): number {
        return this.getDifficulty().getBuffFactor();
    }

    public isProgressionDisabled() {
        return PlayerSettingsManager.get().isProgressionDisabled();
    }

    public progress(): void {
        if(!PlayerSettingsManager.get().isProgressionDisabled()) {
            const currentLevel = PlayerSettingsManager.get().getCurrentLevel();
            const currentStage = PlayerSettingsManager.get().getCurrentStage();
    
            if(currentStage >= ProgressionManager.stagesPerNormalLevel) {
                //on the last stage of the level, need to find out if we can move on or just move up stages
                if(currentLevel === PlayerSettingsManager.get().maxLevel) {
                    // on the max upgraded level just increase stage
                    PlayerSettingsManager.get().setCurrentStage(currentStage + 1);
                } else {
                    PlayerSettingsManager.get().setCurrentStage(1);
                    PlayerSettingsManager.get().setCurrentLevel(currentLevel + 1);
                }
            } else {
                //move on to the next stage, no extra logic
                PlayerSettingsManager.get().setCurrentStage(currentStage + 1);
            }  
        }
    }

    public setGridSize(newSize: number) {
        PlayerSettingsManager.get().setChosenGridSize(newSize);
    }

    public setDifficulty(difficulty: number) {
        PlayerSettingsManager.get().setChosenDifficulty(Difficulty.getByDifficultyLevel(difficulty));
    }

    public setProgressionDisabled(isProgressDisabled: boolean) {
        return PlayerSettingsManager.get().setProgressionDisabled(isProgressDisabled);
    }

    public resetProgress(): void {
        const ps = PlayerSettingsManager.get();
        if (!ps.isProgressionDisabled()) {
            ps.setCurrentLevel(1);
            ps.setCurrentStage(1);
        }
    }

    public getLevelString(): string {
        if (PlayerSettingsManager.get().getCurrentStage() > ProgressionManager.stagesPerNormalLevel) {
            return "MAXED";
        } else {
            return `${PlayerSettingsManager.get().getCurrentLevel()}.${PlayerSettingsManager.get().getCurrentStage()}`;
        }
    }
}