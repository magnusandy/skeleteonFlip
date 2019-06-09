import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider";
import { Stream, Optional, Supplier } from "java8script";
import { Vector } from "excalibur";
import ProgressionManager from "../engine/progression/progressionManager";
import { GridState, CardState } from "../engine/progression/gridState";


export class GridCoordinator {

    private grid: Card[][];
    private gridSize: number;
    private skeletonCount: number;
    private potionCount: number;
    private swordCount: number;

    private constructor(callbackProvider: CardCallbackProvider, gridSize: number, screenCenter: Vector) {
        this.skeletonCount = 0;
        this.potionCount = 0;
        this.swordCount = 0;
        this.gridSize = gridSize;
        this.grid = GridCoordinator.blankGrid(gridSize, callbackProvider, screenCenter);
    }

    public static createGridFromState(callbackProvider: CardCallbackProvider, gridSize: number, state: Optional<GridState>, engine: ex.Engine): GridCoordinator {
        return state
            .map(s => GridCoordinator.loadSavedGrid(callbackProvider, engine, s))
            .orElseGet(() => GridCoordinator.createNewGrid(callbackProvider, gridSize, engine))
    }

    public static createNewGrid(callbackProvider: CardCallbackProvider, gridSize: number, engine: ex.Engine): GridCoordinator {
        const screenCenter = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);
        const coord: GridCoordinator = new GridCoordinator(callbackProvider, gridSize, screenCenter);
        coord.initializeSkeletons(screenCenter, callbackProvider.skeletonCardCallback);
        coord.initializeBuffs(screenCenter, callbackProvider);
        return coord;
    }

    public currentGridState(): { gridSize: number, cardState: CardState[][] } {
        const cardStates: CardState[][] = Stream.ofValues(...this.grid)
            .map(row => Stream.ofValues(...row)
                .map(card => new CardState(card.type(), card.isFlipped()))
                .toArray())
            .toArray();
        return {
            gridSize: this.gridSize,
            cardState: cardStates
        };
    }

    public getGridAsList(): Card[] {
        return Stream.of(this.grid)
            .flatMap(a => Stream.ofValues(...a))
            .toArray();
    }

    public getRow(rowIndex: number): Card[] {
        return Stream.of(this.grid)
            .flatMap(a => Stream.ofValues(...a))
            .filter(card => card.getRow() == rowIndex)
            .toArray();
    }

    public getCol(colIndex: number): Card[] {
        return Stream.of(this.grid)
            .flatMap(a => Stream.ofValues(...a))
            .filter(card => card.getCol() == colIndex)
            .toArray();
    }

    private static blankGrid(gridSize: number, callbackProvider: CardCallbackProvider, screenCenter: Vector): Card[][] {
        return Stream.range(0, gridSize)
            .map(rowNum => this.blankGridRow(gridSize, rowNum, callbackProvider, screenCenter))
            .toArray();
    }

    private static blankGridRow(gridSize: number, rowIndex: number, callbackProvider: CardCallbackProvider, screenCenter: Vector): Card[] {
        return Stream.range(0, gridSize)
            .map(columnIndex => Card.coin(screenCenter, rowIndex, columnIndex, callbackProvider.coinCardCallback))
            .toArray();
    }

    private initializeSkeletons(screenCenter: Vector, skeletonCardCallback: Supplier<void>): void {
        while (this.needMoreSkeletons()) {
            const { row, col } = this.randomCoord();
            if (this.isCardACoin(row, col)) {
                this.insertCard(row, col, Card.skeleton(screenCenter, row, col, skeletonCardCallback));
            }
        }
    }

    private initializeBuffs(screenCenter: Vector, callbackProvider: CardCallbackProvider): void {
        while (this.needMoreBuffs()) {
            const { row, col } = this.randomCoord();
            if (this.isCardACoin(row, col)) {
                this.insertCard(row, col, this.generateBuffCard(row, col, screenCenter, callbackProvider))
            }
        }
    }

    private initializeFromState(state: GridState, screenCenter: Vector, callbackProvider: CardCallbackProvider): void {
        this.gridSize = state.getGridSize();
        state.getGridState().forEach((row: CardState[], rowIndex: number) => {
            row.forEach((card: CardState, colIndex: number) => {
                const createdCard = Card.create(screenCenter, rowIndex, colIndex, callbackProvider, card.getType(), card.isFlipped());
                this.insertCard(rowIndex, colIndex, createdCard);
            });
        });
    }

    private generateBuffCard(row: number, col: number, screenCenter: Vector, callbackProvider: CardCallbackProvider): Card {
        return Math.random() < 0.5
            ? Card.attack(screenCenter, row, col, callbackProvider.attackCardCallback)
            : Card.potion(screenCenter, row, col, callbackProvider.potionCardCallback)
    }

    private insertCard(row: number, col: number, card: Card): void {
        if (card.type() == CardType.SKELETON) {
            this.skeletonCount++;
        } else if (card.type() == CardType.ATTACK) {
            this.swordCount++;
        } else if (card.type() == CardType.POTION) {
            this.potionCount++;
        }
        this.grid[row][col] = card;
    }

    private isCardACoin(row: number, col: number): boolean {
        return this.grid[row][col].type() == CardType.COIN;
    }

    private needMoreSkeletons(): boolean {
        return this.skeletonCount < Math.ceil(((this.gridSize * this.gridSize)) / ProgressionManager.get().getSkullFactor());
    }

    private needMoreBuffs() {
        const totalBuffs = this.potionCount + this.swordCount;
        return totalBuffs < this.skeletonCount - ProgressionManager.get().getBuffFactor();
    }

    private randomCoord(): { row: number, col: number } {
        return {
            row: Math.floor(Math.random() * this.gridSize),
            col: Math.floor(Math.random() * this.gridSize)
        };
    }

    private static loadSavedGrid(callbackProvider: CardCallbackProvider, engine: ex.Engine, gridState: GridState): GridCoordinator {
        const screenCenter = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);
        const coord: GridCoordinator = new GridCoordinator(callbackProvider, gridState.getGridSize(), screenCenter);
        coord.initializeFromState(gridState, screenCenter, callbackProvider);
        return coord;
    }
}