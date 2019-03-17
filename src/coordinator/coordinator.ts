import { NumberCoordinator } from "./numberCoordinator";
import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider"
import { Config } from "../resources";
import { Stream, Function, Optional } from "java8script";
import { GridCoordinator } from "./gridCoordinator";
import * as ex from "excalibur";
import { Vector, Label } from "excalibur";
import { Scenes } from "../scenes/scenes";


//this class will handle the building and coordinating of data between the game cards and other UI pieces
export class GameCoordinatior implements CardCallbackProvider {
    private engine: ex.Engine;
    private healthCoordinator: NumberCoordinator;
    private attackCoordinator: NumberCoordinator;
    private gridCoordinator: GridCoordinator;

    private rowLabels: ex.Label[];
    private columnLabels: ex.Label[];

    private constructor(engine: ex.Engine, healthCoordinator: NumberCoordinator, attackCoordinator: NumberCoordinator) {
        this.healthCoordinator = healthCoordinator;
        this.attackCoordinator = attackCoordinator;
    }

    public static initialize(engine: ex.Engine): GameCoordinatior {
        const coordinator: GameCoordinatior = new GameCoordinatior(
            engine,
            NumberCoordinator.create("Health: ", 50, 50, Config.maxHealth, () => {engine.goToScene(Scenes.GAME_OVER)}, Config.maxHealth),
            NumberCoordinator.create("Attack: ", 50, 100, Config.maxAttack, () => {})
        );
        coordinator.gridCoordinator = GridCoordinator.createGrid(coordinator, Config.gridSize, engine);
        coordinator.rowLabels = coordinator.createRowCounts();
        coordinator.columnLabels = coordinator.createColCounts();

        return coordinator;
    }

    public getUIBar(): ex.Label[] {
        return [
            this.healthCoordinator.getLabel(),
            this.attackCoordinator.getLabel()
        ]
    }

    public getRowCounts(): ex.Label[] {
        return this.rowLabels;
    }

    public getColCounts(): ex.Label[] {
        return this.columnLabels;
    }

    private createRowCounts(): ex.Label[] {
        return Stream.of(this.gridCoordinator.getCol(0))
            .map(card => new Label(`${this.skeletonCountForRow(card.getRow())}`, card.x - Config.cardWidth, card.y, "Arial"))
            .toArray();
    }

    private createColCounts(): ex.Label[] {
        return Stream.of(this.gridCoordinator.getRow(0))
            .map(card => new Label(`${this.skeletonCountForCol(card.getCol())}`, card.x, card.y - Config.cardHeight, "Arial"))
            .toArray();
    }

    private skeletonCountForRow(row: number) {
        return Stream.of(this.gridCoordinator.getRow(row))
            .filter(c => !c.isFlipped())
            .filter(c => c.type() == CardType.SKELETON)
            .count()

    }

    private skeletonCountForCol(col: number) {
        return Stream.of(this.gridCoordinator.getCol(col))
            .filter(c => !c.isFlipped())
            .filter(c => c.type() == CardType.SKELETON)
            .count()

    }

    public getGridAsList(): Card[] {
        return this.gridCoordinator.getGridAsList();
    }

    private updateLabels() {
        console.log(this.rowLabels);
        this.rowLabels.forEach((l, idx) => {
            l.text = `${this.skeletonCountForRow(idx)}`
        });

        this.columnLabels.forEach((l, idx) => {
            l.text = `${this.skeletonCountForCol(idx)}`
        });
    }

    public skeletonCardCallback = (): void => {
        console.log("skelly");
        if (this.attackCoordinator.getCurrent() > 0) {
            this.attackCoordinator.subtract(1);
        } else {
            this.healthCoordinator.subtract(1);
        }
        this.updateLabels();
    }

    public coinCardCallback = (): void => {
        console.log("coin")
    }

    public attackCardCallback = (): void => {
        console.log("att")
        this.attackCoordinator.add(1);
    }

    public potionCardCallback = (): void => {
        console.log("pot")
        this.healthCoordinator.add(1);
    }
}