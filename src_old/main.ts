import './css/main.scss';
import './polyfills';
import {APP_AA, APP_HEIGHT, APP_RESOLUTION, APP_TRANSPARENT, APP_WIDTH} from './app/const';
import {App} from './app/app';

document.addEventListener('DOMContentLoaded', (event) => {

    const app = new App({
        width: APP_WIDTH,
        height: APP_HEIGHT,
        resolution: APP_RESOLUTION,
        antialias: APP_AA,
        transparent: APP_TRANSPARENT
    });
});
