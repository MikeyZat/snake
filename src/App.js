import React, { Component } from 'react';
import './App.css';
import Board from "./components/Board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Snake</h1>
        </header>
        <Board/>
      </div>
    );
  }
}

export default App;
