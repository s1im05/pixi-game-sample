import {LoadingScene} from './scenes/loading.scene';
import {SCENE_LIST} from '../const';

export class Game {

    loadingScene: LoadingScene;
    sceneList = SCENE_LIST;
    scene: any;

    constructor(public pixiApp: PIXI.Application) {
        this.onInit();
    }

    onInit() {
        this.loadingScene = new LoadingScene(0).afterLoad();
    }

    start(id ?: number) {
        try {
            const sceneRef = this.sceneList.find(f => id ? f.id === id : f.default);
            this.loadScene(sceneRef.id);
        } catch (err) {
            console.error(`Faild to load scene (id = ${id | 0})`);
        }
    }

    loadScene(id: number) {
        try {
            const sceneRef = this.sceneList.find(f => f.id === id);
            this.pixiApp.stage = this.loadingScene.container;
            this.scene = new (sceneRef.class);

            PIXI.loader
                .add(this.scene.assets)
                .on('progress', (loader, resource) => {
                    this.loadingScene.progress = loader.progress;
                })
                .load(() => {
                    this.scene.afterLoad(this.eventHandler.bind(this));
                    this.pixiApp.stage = this.scene.container;
                });
        } catch (err) {
            console.error(`Faild to load scene (id = ${id | 0})`);
        }
    }

    eventHandler(event: string) {
        switch (event) {
            case 'start':
                this.loadScene(1);
                break;
            default:
        }
    }
}
