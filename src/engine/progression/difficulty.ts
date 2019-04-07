import { Stream } from "java8script";

type Factors = {
    skullFactor: number;
    buffFactor: number;
}

export class Difficulty {
    public static VERY_EASY = new Difficulty(1, 3.0, 0.0, "Very Easy");
    public static EASY = new Difficulty(2, 2.5, 0.0, "Easy");
    public static NORMAL = new Difficulty(3, 2.5, 1.0, "Normal");
    public static HARD = new Difficulty(4, 2.0, 1.0, "Hard");
    public static VERY_HARD = new Difficulty(5, 2.0, 2.0, "Very Hard");
    
    private difficultyLevel: number; 
    private buffFactor: number;
    private skeletonFactor: number;
    private difficultyName: string;

    private constructor(difficultyLevel: number, skeleton: number, buff: number, text: string) {
        this.difficultyLevel = difficultyLevel;
        this.buffFactor = buff;
        this. skeletonFactor = skeleton;
        this.difficultyName = text;
    }

    public getSkeletonFactor(): number {
        return this.skeletonFactor;
    } 

    public getBuffFactor(): number {
        return this.buffFactor;
    }

    public getDifficultyLevel(): number {
        return this.difficultyLevel;
    }

    public static getByDifficultyLevel(level: number): Difficulty {
        return Stream.of([
            this.VERY_EASY,
            this.EASY,
            this.NORMAL,
            this.HARD,
            this.VERY_HARD
        ]).filter(diff => diff.getDifficultyLevel() === level)
        .findFirst()
        .orElseThrow(() => new Error("Difficulty not found for that number"));
    }
}



