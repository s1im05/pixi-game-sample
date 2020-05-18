import {Container, Graphics, Sprite, Texture} from 'pixi.js';
import {APP, COLOR} from "./app.const";
import {ASSET_CELL, ASSET_CELL_EMPTY} from "./assets-list.const";

export class GameBricks {

    // palette: any[];
    stage: Container;
    boardContainer: Container;
    board: number[];
    level: Level;
    handlerKeypress;
    figureShape: number[][];
    figureCoords: number[];

    spriteFill: Texture;
    spriteEmpty: Texture;

    private _tick: number;

    readonly clearColor = COLOR.AERO_GREEN;
    readonly cellSize = 30;
    readonly cellGap = 3;
    readonly boardCols = 10;
    readonly boardRows = 20;
    readonly figures = [
        [[4, 0], [0, 0], [1, 0], [0, 1], [1, 1]],
        [[4, 0], [-1, 0], [0, 0], [1, 0], [2, 0]]
    ];

    constructor() {
        this.addEventHandlers();
        this.spriteEmpty = Texture.from(ASSET_CELL_EMPTY);
        this.spriteFill = Texture.from(ASSET_CELL);
    }

    addEventHandlers() {
        document.addEventListener('keypress', this.handlerKeypress = this.keyPress.bind(this));
    }

    setLevel(level: Level): Container {
        this.level = level;
        if (this.stage) this.stage.destroy();
        this.stage = new Container();
        this.startGame();

        return this.stage;
    }

    startGame() {
        this.resetBoard();
        // this.addRandomFigure();

        this._tick = window.setInterval(() => {
            // this.gameTick();
        }, 300);
    }

    resetBoard() {
        const graphics = new Graphics();
        graphics.beginFill(COLOR.AERO_BLUE, 1);
        graphics.drawRect(0, 0, APP.WIDTH, APP.HEIGHT);
        graphics.endFill();
        this.stage.addChild(graphics);

        if (this.boardContainer) {
            this.boardContainer.destroy();
        }
        this.boardContainer = new Container();

        this.board = new Array(this.boardRows * this.boardCols).fill(null);
        this.stage.addChild(this.boardContainer);

        this.drawBoard();
        const scale = 0.5;
        this.boardContainer.setTransform(
            APP.WIDTH / 2 - this.boardContainer.width / (2 / scale),
            APP.HEIGHT / 2 - this.boardContainer.height / (2 / scale),
            scale, scale);
    }

    drawBoard() {
        for (let i = 0; i < this.boardRows; i++) {
            for (let j = 0; j < this.boardCols; j++) {

                const filled = this.board[i * this.boardCols + j] !== null;
                const sprite = new Sprite(filled ? this.spriteFill : this.spriteEmpty);

                sprite.anchor.set(0.5);
                sprite.x = j * (sprite.width + this.cellGap);
                sprite.y = i * (sprite.height + this.cellGap);
                this.boardContainer.addChild(sprite);
            }
        }
    }

    addRandomFigure() {
        const figure = this.figures[Math.floor(Math.random() * this.figures.length)];
        this.figureCoords = [figure[0][0], figure[0][1]];
        this.figureShape = figure.slice(1);

        this.drawFigure();
    }

    drawFigure(clear?: boolean) {
        let color = clear ? this.clearColor : COLOR.LIVER;

        this.figureShape.forEach(coords => {
            const x = coords[0] + this.figureCoords[0];
            const y = coords[1] + this.figureCoords[1];

            const cell = this.boardContainer.getChildAt(y * this.boardCols + x) as Graphics;
            cell.beginFill(color, 1);
            cell.drawRect(0, 0, this.cellSize, this.cellSize);
            cell.endFill();
        });
    }

    keyPress(e: KeyboardEvent) {
        if (!this.figureCoords) return;
        switch (e.code) {
            case 'KeyA':
                this.figureMoveLeft();
                break;
            case 'KeyD':
                this.figureMoveRight();
                break;
            case 'KeyW':
                console.log('rotate');
                break;
            case 'KeyS':
            case 'Space':
                this.figureMoveDown();
                break;
        }
    }

    figureMoveLeft() {
        if (this.checkBoundaries(-1, 0)) {
            this.drawFigure(true);
            this.figureCoords[0]--;
            this.drawFigure();
        }
    }

    figureMoveRight() {
        if (this.checkBoundaries(1, 0)) {
            this.drawFigure(true);
            this.figureCoords[0]++;
            this.drawFigure();
        }
    }

    figureMoveDown() {
        this.drawFigure(true);
        if (this.checkBoundaries(0, 1)) {
            this.figureCoords[1]++;
            this.drawFigure();
        } else {
            this.copyFigureToBoard();
            this.figureCoords = this.figureShape = null;
            this.addRandomFigure();
        }
    }

    checkBoundaries(newX, newY): boolean {
        for (let i = 0; i < this.figureShape.length; i++) {
            const x = this.figureShape[i][0] + this.figureCoords[0] + newX;
            const y = this.figureShape[i][1] + this.figureCoords[1] + newY;

            if (!(x >= 0 && x < this.boardCols && y >= 0 && y < this.boardRows)) return false;
        }

        return true;
    }

    gameTick() {
        // this.figureMoveDown();
    }

    copyFigureToBoard() {
        //// copy
        /// check lines
    }

    destroy() {
        window.clearInterval(this._tick);
        this.stage.destroy();
        document.removeEventListener('keypress', this.handlerKeypress);
    }
}
