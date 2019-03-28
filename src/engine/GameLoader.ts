import * as ex from 'excalibur';
import { Config } from '../resources';
const logoImg = require('../images/title.png');

export class GameLoader extends ex.Loader {

    public constructor() {
        super();
        this.backgroundColor = Config.backgroundColor.toString();
        this.logo = logoImg;
        this.logoHeight = 256;
        this.logoWidth = 1280;
    }
}