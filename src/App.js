import React, { Component } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard/GameBoard";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import GameTimer from "./components/GameTimer/GameTimer";
import NewGameButton from "./components/NewGameButton/NewGameButton";

const colors = ["#7CCCE5", "#FDE47F", "#E04644", "#B576AD"];

class App extends Component {
  constructor(props) {
    // JS requires that super be called before accessing 'this'
    super(props);
    // this.state is an object that holds "state" in its properties
    this.state = {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode(),
    };
    //do not need to use binding if converted to call back function
    // this.updateColor = this.updateColor.bind(this);
    // this.handleColorSelection = this.handleColorSelection.bind(this);
  }

  newGame = () => {
    this.setState({
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode(),
    });
  };

  checkGuess = () => {
    // console.log("i am checking guesses");
    let currentRow = { ...this.state.guesses[this.state.guesses.length - 1] };
    let perfect = 0;
    let almost = 0;
    let leftoverGuesses = [];
    let leftoverWinningCode = [];
    for (let i = 0; i < currentRow.code.length; i++) {
      if (currentRow.code[i] === this.state.code[i]) {
        perfect++;
      } else {
        leftoverGuesses.push(currentRow.code[i]);
        leftoverWinningCode.push(this.state.code[i]);
      }
    }

    for (let i = 0; i < leftoverGuesses.length; i++) {
      let idx = leftoverWinningCode.indexOf(leftoverGuesses[i]);
      if (idx > -1) {
        almost++;
        leftoverWinningCode.splice(idx, 1);
      }
    }

    currentRow.score.perfect = perfect;
    currentRow.score.almost = almost;
    let allGuesses = [...this.state.guesses];
    allGuesses.pop();
    if (perfect === 4) {
      this.setState({ guesses: [...allGuesses, currentRow] });
    } else {
      this.setState({
        guesses: [...allGuesses, currentRow, this.getNewGuess()],
      });
    }
  };

  // updateColor = () => {
  //   this.setState({
  //     selColorIdx: ++this.state.selColorIdx % 4,
  //   });
  // };

  // updateColor = function yoyo() {
  //   this.setState({
  //     selColorIdx: ++this.state.selColorIdx % 4
  //   });
  // }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      // code: [3, 2, 1, 0],
      score: {
        perfect: 0,
        almost: 0,
      },
    };
  }

  genCode() {
    return new Array(4)
      .fill()
      .map(() => Math.floor(Math.random() * colors.length));
  }

  // updateColor() {
  //   this.setState((prevState, props) => {
  //     return {
  //       selColorIdx: ++prevState.selColorIdx % 4,
  //     };
  //   });
  // }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4
      ? lastGuess + 1
      : 0;
  }

  handleColorSelection = (colorIdx) => {
    this.setState({ selColorIdx: colorIdx });
  };

  changeColor = (idx) => {
    // console.log("i am changing color");
    let currentRow = { ...this.state.guesses[this.state.guesses.length - 1] };
    currentRow.code[idx] = this.state.selColorIdx;
    let allGuesses = [...this.state.guesses];
    allGuesses.pop();
    this.setState({ guesses: [...allGuesses, currentRow] });
  };
  //old way needs binding in the constructor
  // handleColorSelection(colorIdx) {
  //   // alert("color selected" + colorIdx);
  //   this.setState({
  //     selColorIdx: colorIdx,
  //   });
  // }

  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header className="App-header-footer">REACT MASTERMIND</header>
        <div className="flex-h">
          <GameBoard
            colors={colors}
            guesses={this.state.guesses}
            changeColor={this.changeColor}
            checkGuess={this.checkGuess}
          />
          <div className="App-controls">
            <ColorPicker
              colors={colors}
              handleColorSelection={this.handleColorSelection}
              selColorIdx={this.state.selColorIdx}
            />
            <GameTimer />
            <NewGameButton newGame={this.newGame} />
          </div>
        </div>
        <footer className="App-header-footer">
          {winTries ? `You Won in ${winTries} Guesses!` : "Good Luck!"}
        </footer>
      </div>
    );
  }
}
export default App;
