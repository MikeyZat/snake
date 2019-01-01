import React, {Component} from "react";
import Apple from "./Apple";
import Snake from "./Snake";


export const SIZE = 10;

class Board extends Component {

    state = {
        board: [],
        result: 0,
        aX: Math.floor(Math.random() * SIZE),
        aY: Math.floor(Math.random() * SIZE)
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
        if(x===this.state.aX && y===this.state.aY)
            this.eatApple();
        newBoard[y][x] = "X";
        tail.forEach(el => {
            newBoard[el.y][el.x] = "X";
        });
        newBoard[this.state.aY][this.state.aX] = "A";
        this.setState({
            board: newBoard
        });
        //this.showSnake();
    };

    showSnake = () => {
        this.state.board.forEach(row => {
            let r = "";
            for (let i = 0; i < SIZE; i++)
                r += " " + row[i];
            console.log(r);
        });
    };


    eatApple = () => {
        this.setState({
            result: this.state.result + 1,
            aX: Math.floor(Math.random() * SIZE),
            aY: Math.floor(Math.random() * SIZE)
        });
    };


    render() {
        return (
            <main>
                <h3>Result: {this.state.result}</h3>
                <Snake changeSnakePosition={this.changeSnakePosition}/>
                <Apple x={this.state.aX} y={this.state.aY}/>
            </main>
        );
    }
}

export default Board;