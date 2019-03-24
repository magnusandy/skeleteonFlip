import { NumberCoordinator } from "./numberCoordinator";
import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider"
import { Config, Resources } from "../resources";
import { Stream, Function, Optional } from "java8script";
import { GridCoordinator } from "./gridCoordinator";
import * as ex from "excalibur";
import { Vector, Label } from "excalibur";
import { Scenes } from "../scenes/scenes";
import Count from "../actors/card/count";
import { MainMenu } from "../scenes/mainMenu";


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
        const coordinator: GameCoordinatior = new GameCoordinatior(
            engine,
            NumberCoordinator.create(50, 50, Config.maxHealth, () => { engine.goToScene(Scenes.GAME_OVER) }, Resources.uiHeart, Config.maxHealth),
            NumberCoordinator.create(50, 100, Config.maxAttack, () => { }, Resources.uiSword)
        );
        coordinator.gridCoordinator = GridCoordinator.createGrid(coordinator, Config.gridSize, engine);
        coordinator.rowCounts = coordinator.createRowCountCards();
        coordinator.columnCounts = coordinator.createColCountCards();

        return coordinator;
    }

    public getStatTrackers(): ex.Actor[] {
        return [
            ...this.healthCoordinator.getStatActors(),
            ...this.attackCoordinator.getStatActors()
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

    private checkIfCompleteGame(): void {
       const allFlipped = Stream.of(this.getGridAsList())
            .allMatch(card => card.isFlipped());
        if (allFlipped && this.healthCoordinator.getCurrent() > 0) {
            this.engine.goToScene(Scenes.VICTORY);
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