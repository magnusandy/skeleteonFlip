import { NumberCoordinator } from "./numberCoordinator";
import { Card, CardType } from "../actors/card/card";
import { CardCallbackProvider } from "../actors/card/cardCallbackProvider"
import { Config, Resources } from "../resources";
import { Stream, Optional } from "java8script";
import { GridCoordinator } from "./gridCoordinator";
import { Vector, Actor } from "excalibur";
import { Scenes } from "../scenes/scenes";
import Count from "../actors/card/count";
import ProgressionManager from "../engine/progression/progressionManager";
import SizingManager from "../engine/managers/sizingManager";
import PlayerSettingsManager from "../engine/progression/playerSettingsManager";
import { GridState } from "../engine/progression/gridState";
import CoinCount from "../actors/bars/coinCount";

//this class will handle the building and coordinating of data between the game cards and other UI pieces
export class GameCoordinator implements CardCallbackProvider {
    private engine: ex.Engine;

    private healthCoordinator: NumberCoordinator;
    private attackCoordinator: NumberCoordinator;
    private coinCount: CoinCount;
    private gridCoordinator: GridCoordinator;

    private rowCounts: Count[];
    private columnCounts: Count[];

    private constructor(engine: ex.Engine) {
        this.engine = engine;
        this.resetGame(false);
    }

    public static initialize(engine: ex.Engine): GameCoordinator {
        const coordinator: GameCoordinator = new GameCoordinator(engine);
        return coordinator;
    }

    public resetGame(shouldCreateFresh: boolean): void {
        const mm: SizingManager = SizingManager.get();
        const saveState: Optional<GridState> = PlayerSettingsManager.get().getGridState();
        this.healthCoordinator = NumberCoordinator.create(mm.getUIItemSize() / 2, mm.getUIItemSize() / 2, Config.maxHealth, () => { }, Resources.uiHeart, saveState.map(s => s.getHearts()).orElse(Config.maxHealth));
        this.attackCoordinator = NumberCoordinator.create(mm.getUIItemSize() / 2, mm.getUIItemSize() * 1.5, Config.maxAttack, () => { }, Resources.uiSword, saveState.map(s => s.getSwords()).orElse(0));
        this.coinCount = CoinCount.create(mm.getUIItemSize() / 2, mm.getUIItemSize() * 2.5, saveState.map(gs => gs.getCoins()).orElse(0));

        this.gridCoordinator = shouldCreateFresh
            ? GridCoordinator.createNewGrid(this, ProgressionManager.get().getGameGridSize(), this.engine)
            : GridCoordinator.createGridFromState(this, ProgressionManager.get().getGameGridSize(), saveState, this.engine);
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
            this.getStatTrackers(),
            ProgressionManager.get().isProgressionDisabled() ? [] : this.coinCount.drawables(),
        ).flatMap(a => Stream.ofValues(...a))
            .toArray();
    }

    private updateLabels = () => {
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
        if (this.healthCoordinator.getCurrent() === 0) {
            this.gameOver();
        } else if (allFlipped && this.healthCoordinator.getCurrent() > 0) {
            this.victory();
        }
    }

    private gameOver(): void {
        this.engine.goToScene(Scenes.GAME_OVER);
        ProgressionManager.get().resetProgress();
        PlayerSettingsManager.get().saveGridState();
        this.resetGame(true);
    }

    private victory(): void {
        const psm = PlayerSettingsManager.get();
        const progman = ProgressionManager.get();
        this.engine.goToScene(Scenes.VICTORY);
        progman.progress();
        psm.saveGridState();
        if (!progman.isProgressionDisabled()) {
            //don't want to add coin to total in practice mode
            psm.setTotalCoins(psm.getTotalCoins() + this.coinCount.getCoinCount());
        }
        this.resetGame(true);
    }

    public skeletonCardCallback = (): void => {
        if (this.attackCoordinator.getCurrent() > 0) {
            this.attackCoordinator.subtract(1);
        } else {
            this.healthCoordinator.subtract(1);
        }
        this.updateLabels();
        this.saveGridProgress();
        this.checkIfCompleteGame();
    }

    public coinCardCallback = (): void => {
        this.coinCount.addToCoinCount(1);
        this.saveGridProgress();
        this.checkIfCompleteGame();
    }

    public attackCardCallback = (): void => {
        this.attackCoordinator.add(1);
        this.saveGridProgress();
        this.checkIfCompleteGame();
    }

    public potionCardCallback = (): void => {
        this.healthCoordinator.add(1);
        this.saveGridProgress();
        this.checkIfCompleteGame();
    }

    private saveGridProgress(): void {
        const grid = this.gridCoordinator.currentGridState();
        PlayerSettingsManager.get().saveGridState(new GridState(
            grid.gridSize,
            grid.cardState,
            this.healthCoordinator.getCurrent(),
            this.attackCoordinator.getCurrent(),
            this.coinCount.getCoinCount(),
        ));
    }
}