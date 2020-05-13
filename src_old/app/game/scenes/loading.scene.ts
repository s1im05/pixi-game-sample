import {Scene} from './scene';
import {APP_HEIGHT, APP_WIDTH} from '../../const';

export class LoadingScene extends Scene implements LoadingScene {

    pixiText: PIXI.Text;
    pixiRectangleProgress: PIXI.Graphics;
    rectangleWidth = 100;

    constructor(private _progress: number) {
        super();
        this.onInit();
    }

    onInit(): LoadingScene {
        this.pixiText = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0xffffff,
            align: 'left',
        });
        this.pixiText.anchor.set(0.5, 0.5);
        this.pixiText.position.set(APP_WIDTH / 2, APP_HEIGHT / 2);
        this.container.addChild(this.pixiText);

        this.pixiRectangleProgress = new PIXI.Graphics();
        this.pixiRectangleProgress.alpha = 1;
        this.container.addChild(this.pixiRectangleProgress);

        const rectangle = new PIXI.Graphics();
        rectangle.lineStyle(1, 0xFFFFFF, 0.5);
        rectangle.drawRect((APP_WIDTH - this.rectangleWidth) / 2, APP_HEIGHT / 2 + 10, this.rectangleWidth, 10);
        this.container.addChild(rectangle);
        return this;
    }

    afterLoad(): LoadingScene {
        this.progress = this._progress;
        return this;
    }

    set progress(value: number) {
        this._progress = value | 0;
        this.pixiText.text = `Loading: ${this.progress | 0}%`;
        this.pixiRectangleProgress.beginFill(0x990000);
        this.pixiRectangleProgress.drawRect(
            (APP_WIDTH - this.rectangleWidth) / 2, APP_HEIGHT / 2 + 10,
            value * 0.01 * this.rectangleWidth, 10);
        this.pixiRectangleProgress.endFill();
    }

    get progress(): number {
        return this._progress | 0;
    }
}
