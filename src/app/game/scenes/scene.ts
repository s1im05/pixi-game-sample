import {APP_HEIGHT, APP_WIDTH} from '../../const';

export abstract class Scene {

    public assets: string[];
    public container: PIXI.Container;

    constructor() {
        this.container = new PIXI.Container();
        this.container.width = APP_WIDTH;
        this.container.height = APP_HEIGHT;
    }

    abstract onInit(): Scene;
    abstract afterLoad(): Scene;
}
