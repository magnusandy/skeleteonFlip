import { NumberCoordinator } from "./numberCoordinator";
import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider"
import { Config } from "../resources";
import { Stream, Function, Optional } from "java8script";
import { GridCoordinator } from "./gridCoordinator";
import * as ex from "excalibur";
import { Vector, Label } from "excalibur";
import { Scenes } from "../scenes/scenes";
import Count from "../actors/card/count";


//this class will handle the building and coordinating of data between the game cards and other UI pieces
export class GameCoordinatior implements CardCallbackProvider {
    private engine: ex.Engine;
    private healthCoordinator: NumberCoordinator;
    private attackCoordinator: NumberCoordinator;
    private gridCoordinator: GridCoordinator;

    private rowCounts: Count[];
    private columnCounts: Count[];

    private constructor(engine: ex.Engine, healthCoordinator: NumberCoordinator, attackCoordinator: NumberCoordinator) {
        this.healthCoordinator = healthCoordinator;
        this.attackCoordinator = attackCoordinator;
        this.engine = engine;
    }

    public static initialize(engine: ex.Engine): GameCoordinatior {
        console.log(Config.maxHealth);
        const coordinator: GameCoordinatior = new GameCoordinatior(
            engine,
            NumberCoordinator.create("Health: ", 50, 50, Config.maxHealth, () => { engine.goToScene(Scenes.GAME_OVER) }, Config.maxHealth),
            NumberCoordinator.create("Attack: ", 50, 100, Config.maxAttack, () => { })
        );
        coordinator.gridCoordinator = GridCoordinator.createGrid(coordinator, Config.gridSize, engine);
        coordinator.rowCounts = coordinator.createRowCountCards();
        coordinator.columnCounts = coordinator.createColCountCards();

        return coordinator;
    }

    public getUIBar(): ex.Label[] {
        return [
            this.healthCoordinator.getLabel(),
            this.attackCoordinator.getLabel()
        ]
    }

    public getRowCountCards(): Count[] {
        return this.rowCounts;
    }

    public getColCountCards(): Count[] {
        return this.columnCounts;
    }

    private createColCountCards(): Count[] {
        const center = new Vector(this.engine.drawWidth/2, this.engine.drawHeight/2);
        return Stream.of(this.gridCoordinator.getRow(0))
            .map(card => new Count("col", card.getCol(), center, this.skeletonCountForCol(card.getCol())))
            .toArray();
    }
    
    private createRowCountCards(): Count[] {
        const center = new Vector(this.engine.drawWidth/2, this.engine.drawHeight/2);
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

    public getGridAsList(): Card[] {
        return this.gridCoordinator.getGridAsList();
    }

    private updateLabels() {
        this.rowCounts.forEach((count, idx) => {
            count.setCount(this.skeletonCountForRow(idx));
        });

        this.columnCounts.forEach((count, idx) => {
            count.setCount(this.skeletonCountForCol(idx));
        });
    }

    public skeletonCardCallback = (): void => {
        if (this.attackCoordinator.getCurrent() > 0) {
            this.attackCoordinator.subtract(1);
        } else {
            this.healthCoordinator.subtract(1);
        }
        this.updateLabels();
    }

    public coinCardCallback = (): void => {
    }

    public attackCardCallback = (): void => {
        this.attackCoordinator.add(1);
    }

    public potionCardCallback = (): void => {
        this.healthCoordinator.add(1);
    }
}