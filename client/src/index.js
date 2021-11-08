import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// We can create ad-hoc attributes as needed and reference them later.
// It is not totally clear how things work here - for example, we use
// `this.props.value` here, but is it created here, or is it created
// at-render time when `Board` extends the React.Component and renders
// the square (`renderSquare`).
class Square extends React.Component {
  render() {
    // this is a runtime binding determined by how a function is called.
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // Here we define a method, `renderSquare` which takes one argument and returns
  // a rendered Square.
  renderSquare(i) {
    // We take the class square (which is actually an HTML element at it's heart)
    // and give it an attribute, value, set to the argument of render square.
    return <Square value={i}/>;
  }

  // Here, we define a method called 'render', which renders the board with squares.
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);