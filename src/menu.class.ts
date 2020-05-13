import {ASSET_LEVELS} from "./assets-list.const";
import {Container, Graphics, Sprite, Texture, SCALE_MODES} from 'pixi.js';


export class MenuBricks {
    readonly levels: Level[] = [
        {asset: ASSET_LEVELS[0], title: 'first level'}
    ];

    private levelClickCallback: Function;


    levelsMenuContainer(): Container {
        const container = new Container();

        this.levels.forEach((level: Level) => {
            const sprite = this.levelSprite(level);
            sprite.setTransform(20, 20, 10, 10);
            container.addChild(sprite);
        });

        return container;
    }

    levelSprite(level: Level): Sprite {
        const sprite = new Sprite();
        sprite.texture = Texture.from(level.asset, {
            scaleMode: SCALE_MODES.NEAREST,
            resolution: 100
        });
        sprite.width = sprite.texture.width;
        sprite.height = sprite.texture.height;
        sprite.buttonMode = true;
        sprite.interactive = true;

        const graphics = new Graphics();
        graphics.lineStyle(1, 0xFFFFFF);
        graphics.beginFill(0x000000, 0);
        graphics.drawRect(-0.5, -0.5, sprite.width+1, sprite.height+1);
        graphics.endFill();
        graphics.alpha = 0.5;
        sprite.addChild(graphics);

        sprite.on('click', () => {
            this.levelClickCallback.call(this, level);
        });
        sprite.on('mouseover', () => {
            graphics.alpha = 1;
        });
        sprite.on('mouseout', () => {
            graphics.alpha = 0.5;
        });
        return sprite;
    }

    onLevelClick(callback) {
        this.levelClickCallback = callback;
    }
}
