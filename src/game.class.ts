import {ASSET_LEVELS} from "./assets-list.const";
import {Text, Container, Loader, Application, ApplicationOptions} from 'pixi.js';
import {MenuBricks} from "./menu.class";
import {COLOR} from "./app.const";
import {GameBricks} from "./game-bricks.class";


export class Game {

    app: Application;
    options: ApplicationOptions;
    menu: MenuBricks;
    game: GameBricks;

    constructor(width: number, height: number) {
        this.options = {
            width,
            height,
            backgroundColor: 0,
            resolution: 1,
            antialias: true
        }
    }

    init(callback) {
        this.app = new Application(this.options);
        callback.call(this, this.app.view);
        this.game = new GameBricks();
        this.loadAssets(() => {
            this.showMenu();
        });
    }

    loadAssets(callback) {
        const container = new Container();
        const text = new Text('Loading...', {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: COLOR.LIVER,
            align: 'left',
        });
        text.anchor.set(1, 1);
        text.position.set(this.options.width - 5, this.options.height - 5);
        container.addChild(text);
        this.app.stage = container;

        const loader = new Loader();
        ASSET_LEVELS.forEach((asset, index) => {
            loader.add('level' + index, asset);
        });
        loader.onComplete.add(callback);
        loader.load();
    }

    showMenu() {
        this.menu = new MenuBricks();
        this.app.stage = this.menu.levelsMenuContainer();
        this.menu.onLevelClick(level => {
            this.app.stage = this.game.setLevel(level);
        });
    }
}
