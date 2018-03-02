import {Scene} from './scene';

export class Scene1Scene extends Scene {

    constructor() {
        super();
        this.onInit();
    }

    onInit(): Scene {
        return this;
    }

    afterLoad(handler: any): Scene {
        return this;
    }
}
