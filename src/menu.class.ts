import {ASSET_LEVELS} from "./assets-list.const";

export class MenuBricks {
    readonly levels = [
        { asset: ASSET_LEVELS[0]}
    ];

    renderLevels(): PIXI.Container {
        const container = new PIXI.Container();
        container.width = 100;
        container.height = 100;

        return container;
    }
}
