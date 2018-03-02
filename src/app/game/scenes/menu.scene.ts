import {Scene} from './scene';
import {APP_HEIGHT, APP_WIDTH} from '../../const';


export class MenuScene extends Scene {

    bgSprite: PIXI.Sprite;
    assets = [
        'assets/menu/bg.png',
    ];

    constructor() {
        super();
        this.onInit();
    }

    onInit(): Scene {
        return this;
    }

    afterLoad(): Scene {
        this.bgSprite = new PIXI.Sprite(
            PIXI.loader.resources[this.assets[0]].texture
        );
        this.bgSprite.width = APP_WIDTH;
        this.bgSprite.height = APP_HEIGHT;
        this.container.addChild(this.bgSprite);

        return this;
    }
}
