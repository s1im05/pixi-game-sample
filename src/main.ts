import './polyfills';
import {Game} from "./game.class";
import {APP} from "./app.const";

document.addEventListener('DOMContentLoaded', (event: Event) => {
    const game = new Game(APP.WIDTH, APP.HEIGHT).init(
        (view) => {
            document.body.appendChild(view);
        });
});
