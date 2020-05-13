import {APP_HEIGHT, APP_WIDTH} from '../../const';

export abstract class Scene {

    public assets: string[];
    public container: PIXI.Container;
    public outputHandler: any;
    private _destroyed = false;

    constructor() {
        this.container = new PIXI.Container();
        this.container.width = APP_WIDTH;
        this.container.height = APP_HEIGHT;
    }

    onInit(): Scene {
        return this;
    }

    sceneLoop() {
        if (!this._destroyed) {
            requestAnimationFrame(this.sceneLoop.bind(this));
        }
    }

    afterLoad(handler?: any): Scene {
        this.outputHandler = handler;
        return this;
    }

    destroy() {
        this._destroyed = true;
    }
}
