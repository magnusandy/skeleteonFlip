import { CardType } from "../../actors/card/card";
import { SaveDataGrid, SaveCellData } from "./playerSettingsManager";
import { Stream } from "java8script";

export class GridState {
    private hearts: number;
    private swords: number;
    private coins: number;
    private gridSize: number;
    private grid: CardState[][];

    constructor(gridSize: number, grid: CardState[][], hearts: number, swords: number, coins: number) {
        this.gridSize = gridSize;
        this.grid = grid;
        this.hearts = hearts;
        this.swords = swords;
        this.coins = coins;
    }

    public getGridSize(): number {
        return this.gridSize;
    }

    public getGridState(): CardState[][] {
        return this.grid;
    }

    public getHearts(): number {
        return this.hearts;
    }

    public getSwords(): number {
        return this.swords;
    }

    public getCoins(): number {
        return this.coins;
    }

    public toSaveState(): SaveDataGrid {
        const saveGridState: SaveCellData[][] = Stream.ofValues(...this.grid)
            .map(row => Stream.ofValues(...row)
                .map(cardState => cardState.toSaveState())
                .toArray())
            .toArray();
        return {
            hearts: this.getHearts(),
            swords: this.getSwords(),
            coins: this.getCoins(),
            gridSize: this.getGridSize(),
            grid: saveGridState,
        };
    }

    public static fromSaveState(save: SaveDataGrid): GridState {
        const saveGridState: CardState[][] = Stream.ofValues(...save.grid)
            .map(row => Stream.ofValues(...row)
                .map(cardState => CardState.fromSaveState(cardState))
                .toArray())
            .toArray();
        return new GridState(save.gridSize, saveGridState, save.hearts, save.swords, save.coins);
    }
}

export class CardState {
    private type: CardType;
    private flipped: boolean;

    constructor(type: CardType, flipped: boolean) {
        this.type = type;
        this.flipped = flipped;
    }

    public getType(): CardType {
        return this.type;
    }

    public isFlipped(): boolean {
        return this.flipped;
    }

    public toSaveState(): SaveCellData {
        return {
            type: this.type,
            flipped: this.flipped,
        };
    }

    public static fromSaveState(save: SaveCellData): CardState {
        return new CardState(
            save.type,
            save.flipped
        );
    }
}