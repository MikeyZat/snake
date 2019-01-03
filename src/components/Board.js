import React, {Component} from "react";
import "../css/Board.css"

export const SIZE = 30;
const SCALE = 15;

class Board extends Component {

    state = {
        board: [],
        result: 0,
        aX: Math.floor(Math.random() * SIZE),                   //position of apple
        aY: Math.floor(Math.random() * SIZE),
        grow: false,                                            //determines if snake's tail should grow in next move
        snake: {
            x: SIZE / 2 - 1,
            y: SIZE / 2 - 1,
            xV: 0,
            yV: 1,
            tail: [{x: SIZE / 2 - 1, y: SIZE / 2 - 2}, {x: SIZE / 2 - 1, y: SIZE / 2 - 3}]
        },
        game: false,
        interval: null,
        haveLost: false                                          //determines if it's first round or not
    };

    changeDirection = (e) => {
        if (e.key === 'a' || e.key === 'ArrowLeft') {
            this.setState({
                snake: {
                    ...this.state.snake,
                    xV: -1,
                    yV: 0
                }
            });
        } else if (e.key === 'w' || e.key === 'ArrowUp') {
            this.setState({
                snake: {
                    ...this.state.snake,
                    xV: 0,
                    yV: -1
                }
            });
        } else if (e.key === 'd' || e.key === 'ArrowRight') {
            this.setState({
                snake: {
                    ...this.state.snake,
                    xV: 1,
                    yV: 0
                }
            });
        } else if (e.key === 's' || e.key === 'ArrowDown') {
            this.setState({
                snake: {
                    ...this.state.snake,
                    xV: 0,
                    yV: 1
                }
            });
        }
    };

    move = () => {                                      //basically changes x and y of snake and its tail
        let newTail;
        if (this.state.grow) {
            newTail = this.state.snake.tail.slice(0);
            this.setState({
                grow: false
            })
        } else {
            newTail = this.state.snake.tail.slice(0, this.state.snake.tail.length - 1);
        }
        newTail.unshift({x: this.state.snake.x, y: this.state.snake.y});
        this.setState({
            snake: {
                ...this.state.snake,
                x: (this.state.snake.x + this.state.snake.xV) >= 0 ? (this.state.snake.x + this.state.snake.xV) % SIZE : SIZE - 1,
                y: (this.state.snake.y + this.state.snake.yV) >= 0 ? (this.state.snake.y + this.state.snake.yV) % SIZE : SIZE - 1,
                tail: newTail
            }
        });
        this.changeSnakePosition(this.state.snake.x, this.state.snake.y, this.state.snake.tail);
    };


    changeSnakePosition = (x, y, tail) => {             //updates board taking the snake's current position ( and its tail)
        let newBoard = [];
        for (let i = 0; i < SIZE; i++) {
            let newRow = [];
            for (let j = 0; j < SIZE; j++) {
                newRow.push("#");
            }
            newBoard.push(newRow);
        }

        if (x === this.state.aX && y === this.state.aY)
            this.eatApple();

        newBoard[y][x] = "X";

        let b = false;                          //bool flag to determine if the game is over
        tail.forEach(el => {
            if (x === el.x && y === el.y) {
                this.lose();
                b = true;
            }
            newBoard[el.y][el.x] = "X";
        });
        if (b) return;                          //finish the game
        newBoard[this.state.aY][this.state.aX] = "A";
        this.setState({
            board: newBoard
        });
        this.showSnake();
    };


    showSnake = () => {                                                 // it shows a board to the player
        // this.state.board.forEach(row => {                            to play snake in the console uncomment this
        //     let r = "";
        //     for (let i = 0; i < SIZE; i++)
        //         r += " " + row[i];
        //     console.log(r);
        // });


        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (this.state.board[i][j] === 'X') {
                    ctx.fillStyle = "#00e64d";
                    ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
                } else if (this.state.board[i][j] === 'A') {
                    ctx.fillStyle = "#ff3300";
                    ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
                } else {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
                }
            }
        }

    };

    eatApple = () => {
        this.setState({
            result: this.state.result + 1,
            aX: Math.floor(Math.random() * SIZE),
            aY: Math.floor(Math.random() * SIZE),
            grow: true
        });
    };

    lose = () => {
        this.clear();
        document.removeEventListener("keydown", this.changeDirection, false);
        clearInterval(this.state.interval);
        this.setState({
            board: [],
            result: 0,
            aX: Math.floor(Math.random() * SIZE),
            aY: Math.floor(Math.random() * SIZE),
            grow: false,
            snake: {
                x: SIZE / 2 - 1,
                y: SIZE / 2 - 1,
                xV: 0,
                yV: 1,
                tail: [{x: SIZE / 2 - 1, y: SIZE / 2 - 2}, {x: SIZE / 2 - 1, y: SIZE / 2 - 3}]
            },
            game: false,
            interval: null,
            haveLost: true
        });
    };

    clear = () => {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    startGame = () => {
        document.addEventListener("keydown", this.changeDirection, false);
        let interval = setInterval(this.move, 100);
        this.setState({
            game: true,
            interval
        });
    };


    render() {
        return (
            <main>
                <h2>Result: {this.state.result}</h2>
                {this.state.haveLost && <h3>You lost!</h3>}
                {!this.state.game &&
                <button onClick={this.startGame} autoFocus>{this.state.haveLost ? "Play again" : "Start"}</button>}
                <canvas width={SIZE * SCALE} height={SIZE * SCALE} style={{background: "black", marginTop: "25px"}}
                        id="myCanvas">
                    Your browser doesn't support canvas
                </canvas>
            </main>
        );
    }
}

export default Board;
