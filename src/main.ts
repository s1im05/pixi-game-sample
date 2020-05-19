import './polyfills';
import {Game} from "./game.class";
import {APP} from "./app.const";

document.addEventListener('DOMContentLoaded', (event: Event) => {

    const stats = new window['Stats']();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '10px';
    document.body.appendChild(stats.domElement);

    new Game(APP.WIDTH, APP.HEIGHT).init(
        stats,
        (view) => {
            document.getElementById('game').appendChild(view);
        });
});
