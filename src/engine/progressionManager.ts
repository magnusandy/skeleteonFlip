type Difficulty = 1 | 2 | 3 | 4 | 5;
type GridSize = 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Factors = {
    skullFactor: number;
    buffFactor: number;
}

export default class ProgressionManager {

    private static baseGridSize: number = 4;
    private static baseDifficulty: number = 1;
    private static singleton: ProgressionManager;

    private gridSize: number;
    private difficulty: number;
    private disableProgression: boolean;

    private constructor(gridSize, difficulty, disableProgression) {
        this.gridSize = gridSize;
        this.difficulty = difficulty;
        this.disableProgression = disableProgression;
    }

    public static get(): ProgressionManager {
        if (this.singleton) {
            return this.singleton;
        } else {
            this.singleton = new ProgressionManager(
                ProgressionManager.baseGridSize,
                ProgressionManager.baseDifficulty,
                false
            );
            return this.singleton;
        }
    }

    public getGridSize(): number {
        return this.gridSize;
    }

    public getDifficulty(): number {
        return this.difficulty;
    }

    public getSkullFactor(): number {
        return ProgressionManager.getBuffAndSkullByDifficulty(this.difficulty).skullFactor;
    }

    public getBuffFactor(): number {
        return ProgressionManager.getBuffAndSkullByDifficulty(this.difficulty).buffFactor;
    }

    public progress(): void {
        if (!this.disableProgression) {
            if(this.difficulty === 5) {
                this.difficulty = this.nextDifficulty(this.difficulty, this.gridSize);
                this.gridSize = this.nextGridSize(this.gridSize);    
            } else {
                const next = this.nextDifficulty(this.difficulty, this.gridSize); 
                this.difficulty = this.nextDifficulty(this.difficulty, this.gridSize); 
            }   
        }
    }

    public setGridSize(newSize: number) {
        this.gridSize = newSize;
    }

    public resetProgress(): void {
        if (!this.disableProgression) {
            this.difficulty = ProgressionManager.baseDifficulty;
            this.gridSize = ProgressionManager.baseGridSize;
        }
    }

    private nextGridSize(gridSize: number): number {
       return gridSize === 9 
       ?  9
       : gridSize+1;
    }

    //Normal progression is 1,3,5 and then bump the grid size.
    //if the player sets the initial difficulty to 2 or 4 then we should handle that
    private nextDifficulty(difficulty: number, currentGridSize: number): number {
        if(currentGridSize === 9 && difficulty === 5) {
            // do nothing
        } else {
            if (difficulty === 2 || difficulty === 4) {
                return difficulty + 1;
            } else if (difficulty === 5) {
                return 1;
            } else {
                return difficulty + 2;
            }
        }
    }

    private static getBuffAndSkullByDifficulty(difficulty: number): Factors {
        //skull factor: easy 3 (30%), medium 2.5 (40%), hard 2 (50%)
        //buff factor: easy 0, med 1, hard 2
        const createReturn = (skullFactor, buffFactor) => {
            return { skullFactor, buffFactor };
        }
        switch (difficulty) {
            case 1:
                return createReturn(3.0, 0.0);
            case 2:
                return createReturn(2.5, 0.0);
            case 3:
                return createReturn(2.5, 1.0);
            case 4:
                return createReturn(2.0, 1.0);
            case 5:
                return createReturn(2.0, 2.0);
        }
    }

}