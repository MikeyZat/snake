import React, {Component} from "react";


export const SIZE = 30;
const SCALE = 15;

class Board extends Component {

    state = {
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
        }
    };

    move = () => {
        let newTail;
        if(this.state.grow){
            newTail = this.state.snake.tail.slice(0);
            this.setState({
                grow:false
            })
        }else{
            newTail = this.state.snake.tail.slice(0, this.state.snake.tail.length - 1);
        }
        newTail.unshift({x: this.state.snake.x, y: this.state.snake.y});
        this.setState({
            snake: {
                ...this.state.snake,
                x: (this.state.snake.x + this.state.snake.xV) % SIZE,
                y: (this.state.snake.y + this.state.snake.yV) % SIZE,
                tail: newTail
            }
        });
        this.changeSnakePosition(this.state.snake.x, this.state.snake.y, this.state.snake.tail);
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


    changeSnakePosition = (x, y, tail) => {
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
        tail.forEach(el => {
            newBoard[el.y][el.x] = "X";
        });
        newBoard[this.state.aY][this.state.aX] = "A";
        this.setState({
            board: newBoard
        });
        this.showSnake();
    };


    eatApple = () => {
        this.setState({
            result: this.state.result + 1,
            aX: Math.floor(Math.random() * SIZE),
            aY: Math.floor(Math.random() * SIZE),
            grow:true
        });
    };

    showSnake = () => {
        // this.state.board.forEach(row => {
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
                }
                if (this.state.board[i][j] === 'A') {
                    ctx.fillStyle = "#ff3300";
                    ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
                }
            }
        }

    };


    componentDidMount() {
        document.addEventListener("keydown", (e) => this.changeDirection(e));
        setInterval(this.move, 1000);
    }


    render() {
        return (
            <main>
                <h3>Result: {this.state.result}</h3>
                <canvas width="500" height="500" style={{background: "black"}} id="myCanvas"></canvas>
            </main>
        );
    }
}

export default Board;
