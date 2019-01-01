import React, {Component} from 'react';
import {SIZE} from './Board';
class Snake extends Component {
    state = {
        x: SIZE/2-1,
        y: SIZE/2-1,
        xV: 1,
        yV: 0,
        tail: [{x: 4, y: 3}, {x: 4, y: 2}]
    };
    changeDirection = (e) => {
        if (e.key === 'a' || e.key === 'ArrowLeft') {
            this.setState({
                xV: -1,
                yV: 0
            });
        } else if (e.key === 'w' || e.key === 'ArrowUp') {
            this.setState({
                xV: 0,
                yV: -1
            });
        } else if (e.key === 'd' || e.key === 'ArrowRight') {
            this.setState({
                xV: 1,
                yV: 0
            });
        } else if (e.key === 's' || e.key === 'ArrowDown') {
            this.setState({
                xV: 0,
                yV: 1
            });
        }
    };

    move = () => {
        let newTail = this.state.tail.slice(0,this.state.tail.length-1);
        newTail.unshift({x: this.state.x, y: this.state.y});
        this.setState({
            x: (this.state.x + this.state.xV) % SIZE,
            y: (this.state.y + this.state.yV) % SIZE,
            tail: newTail
        });
        this.props.changeSnakePosition(this.state.x, this.state.y, this.state.tail);
    };

    componentDidMount() {
        document.addEventListener("keydown", (e) => this.changeDirection(e));
        setInterval(this.move, 1000);
    }


    render() {
        return (
            <div>
                Snake
            </div>
        );
    }
}

export default Snake;