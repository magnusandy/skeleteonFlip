import { TileMap, SpriteSheet, TileSprite, Engine } from "excalibur";
import { Resources } from "../resources";

export default class BackgroundManager {

    private tileMap: TileMap;

    constructor(width: number, height: number) {
        const tile = Resources.backgroundTile;
        const numberOfCols = Math.ceil(width / tile.width); //todo might need an int
        const numberOfRows = Math.ceil(height / tile.height);
        const sheetId = "background";

        const tileMap = new TileMap(0, 0, tile.width, tile.height, numberOfRows, numberOfCols);
        tileMap.registerSpriteSheet(sheetId, new SpriteSheet(tile, 1, 1, tile.width, tile.height));
        const tileSprite = new TileSprite(sheetId, 0);
        for (let row = 0; row < numberOfRows * numberOfCols; row++) {

            tileMap.getCellByIndex(row).pushSprite(tileSprite);
        }
        this.tileMap = tileMap;
    }

    private getTileMap(): TileMap {
        return this.tileMap;
    }

    public static getDefaultTileMap(engine: Engine): TileMap {
        return new BackgroundManager(engine.drawWidth, engine.drawHeight).getTileMap();
    }

    public static getCustomTileMap(width, height): TileMap {
        return new BackgroundManager(width, height).getTileMap();
    }
}