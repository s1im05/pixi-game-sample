import * as PIXI from 'pixi.js';
import {Game} from './game/game';


export class App {

    public pixiApp: PIXI.Application;
    public game: Game;


    constructor(public options: AppSettings) {
        this.onInit();
    }

    onInit() {
        this.pixiApp = new PIXI.Application(this.options);
        document.body.appendChild(this.pixiApp.view);

        this.game = new Game(this.pixiApp);
        this.game.start();
    }
}
