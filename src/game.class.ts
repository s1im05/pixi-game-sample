import {ASSET_LEVELS} from "./assets-list.const";
import {Text, Container, Loader, Application, ApplicationOptions} from 'pixi.js'


export class Game {

    app: Application;
    options: ApplicationOptions;

    constructor(width: number, height: number) {
        this.options = {
            width,
            height,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio || 1
        }
    }

    init(callback) {
        this.app = new Application(this.options);
        callback.call(this, this.app.view);
        this.loadAssets(() => {
            this.showMenu();
        });
    }

    loadAssets(callback) {
        const container = new Container();
        const text = new Text('Loading...', {
            fontFamily: 'Arial',
            fontSize: 8,
            fill: 0xffffff,
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

    }
}
