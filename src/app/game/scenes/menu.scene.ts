import {Scene} from './scene';
import {APP_HEIGHT, APP_WIDTH} from '../../const';


export class MenuScene extends Scene {

    bgSprite: PIXI.Sprite;
    titleSprite: PIXI.Sprite;
    menuContainer: PIXI.Container;
    menuItems: PIXI.Text[] = [];
    style = {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 0xFF6600,
    };
    assets = [
        'assets/menu/bg.png',
        'assets/menu/title.png',
    ];

    constructor() {
        super();
        this.onInit();
    }

    onInit(): Scene {
        return this;
    }

    afterLoad(handler: any): Scene {
        this.bgSprite = new PIXI.Sprite(PIXI.loader.resources[this.assets[0]].texture);
        this.bgSprite.width = APP_WIDTH;
        this.bgSprite.height = APP_HEIGHT;
        this.container.addChild(this.bgSprite);

        this.titleSprite = new PIXI.Sprite(PIXI.loader.resources[this.assets[1]].texture);
        this.titleSprite.anchor.x = 0.5;
        this.titleSprite.position.x = APP_WIDTH / 2;
        this.titleSprite.position.y = 0;
        this.titleSprite.alpha = 0;
        this.container.addChild(this.titleSprite);

        this.menuContainer = new PIXI.Container;
        this.menuContainer.alpha = 0;
        this.menuContainer.position.y = 300;

        this.menuItems.push(
            new PIXI.Text('start', this.style).addListener('click', this.menuStartHandler.bind(this)),
            new PIXI.Text('options', this.style),
        );

        let posY = 0;
        this.menuItems.forEach(item => {
            item.interactive = true;
            item.anchor.x = 0.5;
            item.position.set(APP_WIDTH / 2, posY);
            item.addListener('mouseover', () => {
                item.style.fill = 0x000000;
            }).addListener('mouseout', () => {
                item.style.fill = this.style.fill;
            });

            this.menuContainer.addChild(item);
            posY += 50;
        });

        this.container.addChild(this.menuContainer);

        this.sceneLoop();

        return super.afterLoad(handler);
    }

    sceneLoop() {
        if (this.titleSprite.alpha < 1) {
            this.titleSprite.alpha += 0.01;
        }
        if (this.titleSprite.position.y < 80) {
            this.titleSprite.position.y += 1;
        } else if (this.menuContainer.alpha < 1) {
            this.menuContainer.alpha += 0.05;
        }

        super.sceneLoop();
    }

    menuStartHandler() {
        this.outputHandler('start');
    }
}
