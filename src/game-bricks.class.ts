import {Container, Graphics} from 'pixi.js';
import {APP, COLOR} from "./app.const";

export class GameBricks {

    // palette: any[];
    stage: Container;
    boardContainer: Container;
    board: number[][]; // rows[cols[]]
    level: Level;
    handlerKeypress;
    figureShape: number[][];
    figureCoords: number[];

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
    }

    addEventHandlers() {
        document.addEventListener('keypress', this.handlerKeypress = this.keyPress.bind(this));
    }

    resetBoard() {
        const graphics = new Graphics();
        graphics.beginFill(COLOR.AERO_BLUE, 1);
        graphics.drawRect(0, 0, APP.WIDTH, APP.HEIGHT);
        graphics.endFill();
        this.stage.addChild(graphics);

        this.boardContainer = new Container();
        this.board = new Array(this.boardRows).fill(null).map((row, j) => {
            return new Array(this.boardCols).fill(null).map((col, i) => {
                const cell = new Graphics();
                cell.beginFill(this.clearColor, 1);
                cell.drawRect(0, 0, this.cellSize, this.cellSize);
                cell.endFill();
                cell.setTransform(i * (this.cellSize + this.cellGap), j * (this.cellSize + this.cellGap));
                this.boardContainer.addChild(cell);

                return col;
            });
        });
        this.boardContainer.setTransform(
            APP.WIDTH / 2 - this.boardContainer.width / 2,
            APP.HEIGHT / 2 - this.boardContainer.height / 2);

        this.stage.addChild(this.boardContainer);
    }

    setLevel(level: Level): Container {
        this.level = level;
        this.stage = new Container();
        this.startGame();

        return this.stage;
    }

    startGame() {
        this.resetBoard();
        this.addRandomFigure();

        this._tick = window.setInterval(() => {
            this.gameTick();
        }, 300);
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
        this.figureMoveDown();
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
