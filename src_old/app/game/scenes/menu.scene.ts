import {Scene} from './scene';
import {APP_HEIGHT, APP_WIDTH} from '../../const';


export class MenuScene extends Scene {

    bgSprite: PIXI.Sprite;
    titleSprite: PIXI.Sprite;
    menuContainer: PIXI.Container;
    optionContainer: PIXI.Container;
    menuItems: PIXI.Text[] = [];
    optionItems: PIXI.Text[] = [];
    style = {
        fontFamily: 'Arial',
        fontSize: 32,
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

        this.menuContainer = new PIXI.Container();
        this.menuContainer.alpha = 0;
        this.menuContainer.position.y = 300;

        this.menuItems.push(
            new PIXI.Text('start', this.style).addListener('click', this.menuStartHandler.bind(this)),
            new PIXI.Text('options', this.style).addListener('click', this.showOptionsHandler.bind(this)),
        );
        this.menuItems.forEach((item, i) => {
            this.addMenuItem(item, this.menuContainer, i);
        });

        this.optionContainer = new PIXI.Container();
        this.optionContainer.position.y = 350;
        this.optionContainer.visible = false;

        this.optionItems.push(
            new PIXI.Text('back', this.style).addListener('click', this.hideOptionsHandler.bind(this)),
        );
        this.optionItems.forEach((item, i) => {
            this.addMenuItem(item, this.optionContainer, i);
        });

        this.container.addChild(this.menuContainer);
        this.container.addChild(this.optionContainer);

        this.sceneLoop();

        return super.afterLoad(handler);
    }

    addMenuItem(item, container, index) {
        item.interactive = true;
        item.anchor.x = 0.5;
        item.position.set(APP_WIDTH / 2, index * 50);
        item.addListener('mouseover', () => {
            item.style.fill = 0xFFFFFF;
        }).addListener('mouseout', () => {
            item.style.fill = this.style.fill;
        });
        container.addChild(item);
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

    showOptionsHandler() {
        this.menuContainer.visible = false;
        this.optionContainer.visible = true;
    }

    hideOptionsHandler() {
        this.menuContainer.visible = true;
        this.optionContainer.visible = false;
    }
}
