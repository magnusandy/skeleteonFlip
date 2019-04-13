import { NumberCoordinator } from "./numberCoordinator";
import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider"
import { Config, Resources } from "../resources";
import { Stream } from "java8script";
import { GridCoordinator } from "./gridCoordinator";
import * as ex from "excalibur";
import { Vector, Actor, Scene } from "excalibur";
import { Scenes } from "../scenes/scenes";
import Count from "../actors/card/count";
import ProgressionManager from "../engine/progression/progressionManager";
import SizingManager from "../engine/sizingManager";

//this class will handle the building and coordinating of data between the game cards and other UI pieces
export class GameCoordinator implements CardCallbackProvider {
    private engine: ex.Engine;
    private healthCoordinator: NumberCoordinator;
    private attackCoordinator: NumberCoordinator;
    private gridCoordinator: GridCoordinator;

    private rowCounts: Count[];
    private columnCounts: Count[];

    private constructor(engine: ex.Engine) {
        this.engine = engine;
        this.resetGame();
    }

    public static initialize(engine: ex.Engine): GameCoordinator {
        const coordinator: GameCoordinator = new GameCoordinator(engine);
        return coordinator;
    }

    public resetGame(): void {
        const mm: SizingManager = SizingManager.get();
        this.healthCoordinator = NumberCoordinator.create(mm.getUIItemSize() / 2, mm.getUIItemSize() / 2, Config.maxHealth, () => { }, Resources.uiHeart, Config.maxHealth);
        this.attackCoordinator = NumberCoordinator.create(mm.getUIItemSize() / 2, mm.getUIItemSize() * 1.5, Config.maxAttack, () => { }, Resources.uiSword);
        this.gridCoordinator = GridCoordinator.createGrid(this, ProgressionManager.get().getGameGridSize(), this.engine);
        this.rowCounts = this.createRowCountCards();
        this.columnCounts = this.createColCountCards();
    }

    private getStatTrackers(): ex.Actor[] {
        return [
            ...this.healthCoordinator.getStatActors(),
            ...this.attackCoordinator.getStatActors()
        ]
    }

    private getRowCountCards(): Count[] {
        return this.rowCounts;
    }

    private getColCountCards(): Count[] {
        return this.columnCounts;
    }

    private createColCountCards(): Count[] {
        const center = new Vector(this.engine.drawWidth / 2, this.engine.drawHeight / 2);
        return Stream.of(this.gridCoordinator.getRow(0))
            .map(card => new Count("col", card.getCol(), center, this.skeletonCountForCol(card.getCol())))
            .toArray();
    }

    private createRowCountCards(): Count[] {
        const center = new Vector(this.engine.drawWidth / 2, this.engine.drawHeight / 2);
        return Stream.of(this.gridCoordinator.getCol(0))
            .map(card => new Count("row", card.getRow(), center, this.skeletonCountForRow(card.getRow())))
            .toArray();
    }

    private skeletonCountForRow(row: number) {
        return Stream.of(this.gridCoordinator.getRow(row))
            .filter(c => !c.isFlipped())
            .filter(c => c.type() == CardType.SKELETON)
            .count();
    }

    private skeletonCountForCol(col: number) {
        return Stream.of(this.gridCoordinator.getCol(col))
            .filter(c => !c.isFlipped())
            .filter(c => c.type() == CardType.SKELETON)
            .count();
    }

    private getGridAsList(): Card[] {
        return this.gridCoordinator.getGridAsList();
    }

    public getAllActors(): Actor[] {
        return Stream.ofValues<Actor[]>(
            this.gridCoordinator.getGridAsList(),
            this.getColCountCards(),
            this.getRowCountCards(),
            this.getStatTrackers()
        ).flatMap(a => Stream.ofValues(...a))
            .toArray();
    }

    private updateLabels = () => {
        console.log("doing counts");
        this.rowCounts.forEach((count, idx) => {
            console.log("row " + this.skeletonCountForRow(idx))
            count.setCount(this.skeletonCountForRow(idx));
        });

        this.columnCounts.forEach((count, idx) => {
            console.log("col " + this.skeletonCountForCol(idx))
            count.setCount(this.skeletonCountForCol(idx));
        });
    }

    private checkIfCompleteGame(): void {
        const allFlipped = Stream.of(this.getGridAsList())
            .allMatch(card => card.isFlipped());
        if (this.healthCoordinator.getCurrent() === 0) {
            this.engine.goToScene(Scenes.GAME_OVER);
            ProgressionManager.get().resetProgress();
            this.resetGame();
        } else if (allFlipped && this.healthCoordinator.getCurrent() > 0) {
            this.engine.goToScene(Scenes.VICTORY);
            ProgressionManager.get().progress();
            this.resetGame();
        }
    }

    public skeletonCardCallback = (): void => {
        if (this.attackCoordinator.getCurrent() > 0) {
            this.attackCoordinator.subtract(1);
        } else {
            this.healthCoordinator.subtract(1);
        }
        this.updateLabels();
        this.checkIfCompleteGame();
    }

    public coinCardCallback = (): void => {
        this.checkIfCompleteGame();
    }

    public attackCardCallback = (): void => {
        this.attackCoordinator.add(1);
        this.checkIfCompleteGame();
    }

    public potionCardCallback = (): void => {
        this.healthCoordinator.add(1);
        this.checkIfCompleteGame();
    }
}