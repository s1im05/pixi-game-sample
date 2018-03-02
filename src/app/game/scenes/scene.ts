import {APP_HEIGHT, APP_WIDTH} from '../../const';

export abstract class Scene {

    public assets: string[];
    public container: PIXI.Container;
    public outputHandler: any;

    constructor() {
        this.container = new PIXI.Container();
        this.container.width = APP_WIDTH;
        this.container.height = APP_HEIGHT;
    }

    onInit(): Scene {
        return this;
    }

    sceneLoop() {
        requestAnimationFrame(this.sceneLoop.bind(this));
    }

    afterLoad(handler?: any): Scene {
        this.outputHandler = handler;
        return this;
    }
}
