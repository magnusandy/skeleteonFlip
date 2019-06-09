import { Config } from '../../resources';
import { Loader } from 'excalibur';
const logoImg = require('../../images/title.png');

export class GameLoader extends Loader {

    public constructor() {
        super();
        this.backgroundColor = Config.backgroundColor.toString();
        this.logo = logoImg;
        this.logoHeight = 234;
        this.logoWidth = 1260;
    }
}