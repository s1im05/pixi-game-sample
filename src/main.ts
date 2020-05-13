import './polyfills';
import {Game} from "./game.class";

document.addEventListener('DOMContentLoaded', (event: Event) => {
    const game = new Game(400, 300).init(
        (view) => {
            document.body.appendChild(view);
        });
});
