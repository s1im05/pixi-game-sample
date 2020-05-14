import {Container} from 'pixi.js';

export class GameBricks {

    palette: any[];
    stage: Container;

    setLevel(level: Level): Container {
       this.stage = new Container();
       return this.stage;
    }
}
