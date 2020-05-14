import {ASSET_LEVELS} from "./assets-list.const";
import {Container, Graphics, Sprite, Text, Texture, SCALE_MODES} from 'pixi.js';
import {APP, COLOR} from "./app.const";


export class MenuBricks {
    readonly levels: Level[] = [
        {asset: ASSET_LEVELS[0], preview: ASSET_LEVELS[1], title: 'first level'}
    ];

    private levelClickCallback: Function;

    levelsMenuContainer(): Container {
        const container = new Container();

        const graphics = new Graphics();
        graphics.beginFill(COLOR.AERO_BLUE, 1);
        graphics.drawRect(0, 0, APP.WIDTH, APP.HEIGHT);
        graphics.endFill();
        container.addChild(graphics);

        this.levels.forEach((level: Level) => {
            const sprite = this.levelSprite(level);
            sprite.setTransform(20, 20, 1, 1);
            container.addChild(sprite);
        });

        return container;
    }

    levelSprite(level: Level): Sprite {
        const sprite = new Sprite();
        const size = 100;

        sprite.texture = Texture.from(level.preview, {
            scaleMode: SCALE_MODES.NEAREST,
        });
        sprite.width = sprite.height = size;
        sprite.buttonMode = true;
        sprite.interactive = true;

        const graphics = new Graphics();
        graphics.lineStyle(2, COLOR.LIVER);
        graphics.beginFill(0x000000, 0);
        graphics.drawRect(-1, -1, sprite.width + 2, sprite.height + 2);
        graphics.endFill();
        sprite.addChild(graphics);

        const title = new Text(level.title, {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: COLOR.LIVER,
            align: 'center',
        });
        title.anchor.set(0.5, 0);
        title.resolution = 2;
        title.position.set(size / 2, size + 5);

        sprite.addChild(title);

        sprite.on('click', () => {
            this.levelClickCallback.call(this, level);
        });
        sprite.on('mouseover', () => {
            sprite.alpha = 0.75;
        });
        sprite.on('mouseout', () => {
            sprite.alpha = 1;
        });
        return sprite;
    }

    onLevelClick(callback) {
        this.levelClickCallback = callback;
    }
}
