import { TileMap, SpriteSheet, TileSprite, Engine } from "excalibur";
import { Resources } from "../resources";

export default class BackgroundManager {

    private tileMap: TileMap;

    constructor(engine: Engine) {
        const tile = Resources.backgroundTile;
        const numberOfCols = Math.ceil(engine.drawWidth / tile.width); //todo might need an int
        const numberOfRows = Math.ceil(engine.drawHeight / tile.height); 
        const sheetId = "background";

        const tileMap = new TileMap(0, 0, tile.width, tile.height, numberOfRows, numberOfCols);
        tileMap.registerSpriteSheet(sheetId, new SpriteSheet(tile, 1, 1, tile.width, tile.height));
        const tileSprite = new TileSprite(sheetId, 0);
        for (let row = 0; row < numberOfRows*numberOfCols; row++) {

                tileMap.getCellByIndex(row).pushSprite(tileSprite);
        }
        this.tileMap = tileMap;
    }

    public getTileMap(): TileMap {
        return this.tileMap;
    }
}