import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider";
import { Stream, Function } from "java8script";
import * as ex from 'excalibur';
import { Vector } from "excalibur";
import ProgressionManager from "../engine/progressionManager";


export class GridCoordinator {

    private grid: Card[][];
    private gridSize: number;
    private skeletonCount: number;
    private potionCount: number;
    private swordCount: number;
    private callbackProvider: CardCallbackProvider;
    private screenCenter: ex.Vector;

    private constructor(callbackProvider: CardCallbackProvider, gridSize: number, screenCenter: ex.Vector) {
        this.skeletonCount = 0;
        this.potionCount = 0;
        this.swordCount = 0;
        this.gridSize = gridSize;
        this.callbackProvider = callbackProvider;
        this.screenCenter = screenCenter;
        this.grid = GridCoordinator.blankGrid(gridSize, callbackProvider, this.screenCenter);
    }

    public getGridAsList(): Card[] {
        const list = Stream.of(this.grid)
            .map(a => Stream.ofValues(...a))
            .flatMap(Function.identity())
            .toArray();

        return list;
    }

    public getCard(rowIndex: number, colIndex: number): Card {
        return this.grid[rowIndex][colIndex];
    }

    public getRow(rowIndex: number): Card[] {
        return Stream.of(this.grid)
        .map(a => Stream.ofValues(...a))
        .flatMap(l => l)
        .filter(card => card.getRow() == rowIndex)
        .toArray();
    }

    public getCol(colIndex: number): Card[] {
        return Stream.of(this.grid)
        .map(a => Stream.ofValues(...a))
        .flatMap(l => l)
        .filter(card => card.getCol() == colIndex)
        .toArray(); 
    }

    private static blankGrid(gridSize: number, callbackProvider: CardCallbackProvider, screenCenter: ex.Vector): Card[][] {
        return Stream.range(0, gridSize)
            .map(rowNum => this.blankGridRow(gridSize, rowNum, callbackProvider, screenCenter))
            .toArray();
    }

    private static blankGridRow(gridSize: number, rowIndex: number, callbackProvider: CardCallbackProvider, screenCenter: ex.Vector): Card[] {
        return Stream.range(0, gridSize)
            .map(columnIndex => Card.coin(screenCenter, rowIndex, columnIndex, callbackProvider.coinCardCallback))
            .toArray();
    }

    private initializeSkeletons(): void {
        while (this.needMoreSkeletons()) {
            const row: number = this.randomCoord();
            const col: number = this.randomCoord();
            if(this.isCoin(row, col)) {
                this.insertCard(row, col, Card.skeleton(this.screenCenter, row, col, this.callbackProvider.skeletonCardCallback));
            }  
        }
    }

    private initializeBuffs(): void {
        while(this.needMoreBuffs()) {
            const row: number = this.randomCoord();
            const col: number = this.randomCoord();
            if(this.isCoin(row, col)) {
                this.insertCard(row, col, this.generateBuffCard(row, col))
            }
        }
    }

    private generateBuffCard(row: number, col:number): Card {
        return Math.random() < 0.5
        ? Card.attack(this.screenCenter, row, col, this.callbackProvider.attackCardCallback)
        : Card.potion(this.screenCenter, row, col, this.callbackProvider.potionCardCallback)  
    }

    private insertCard(row: number, col: number, card: Card ): void {
        if (card.type() == CardType.SKELETON) {
            this.skeletonCount++;
        } else if (card.type() == CardType.ATTACK) {
            this.swordCount++;
        } else if (card.type() == CardType.POTION) {
            this.potionCount++;
        }
        this.grid[row][col] = card;
    }

    private isCoin(row:number, col:number): boolean {
        return this.grid[row][col].type() == CardType.COIN;
    } 

    private needMoreSkeletons(): boolean {
        return this.skeletonCount < Math.ceil(((this.gridSize * this.gridSize)) / ProgressionManager.get().getSkullFactor());
    }

    private needMoreBuffs() {
        const totalBuffs = this.potionCount + this.swordCount;
        return totalBuffs < this.skeletonCount - ProgressionManager.get().getBuffFactor();
    }

    private randomCoord(): number {
        return Math.floor(Math.random() * this.gridSize);
    }

    public static createGrid(callbackProvider: CardCallbackProvider, gridSize: number, engine: ex.Engine): GridCoordinator {
        const screenCenter = new Vector(engine.drawWidth/2, engine.drawHeight/2);
        const coord: GridCoordinator = new GridCoordinator(callbackProvider, gridSize, screenCenter);
        coord.initializeSkeletons();
        coord.initializeBuffs();
        return coord;

    }
}