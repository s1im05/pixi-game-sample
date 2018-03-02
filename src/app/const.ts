import {Scene1Scene} from './game/scenes/scene1.scene';
import {MenuScene} from './game/scenes/menu.scene';

export const APP_WIDTH = 400;
export const APP_HEIGHT = 600;
export const APP_RESOLUTION = 1;
export const APP_AA = false;
export const APP_TRANSPARENT = false;


// game
export const SCENE_LIST = [
    {id: 0, class: MenuScene, default: true},
    {id: 1, class: Scene1Scene, default: false},
];

