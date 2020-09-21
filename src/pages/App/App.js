import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import GamePage from "../../pages/GamePage/GamePage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";

const colors = {
  Easy: ["#7CCCE5", "#FDE47F", "#E04644", "#B576AD"],
  Moderate: ["#7CCCE5", "#FDE47F", "#E04644", "#B576AD", "#28df99"],
  Difficult: ["#7CCCE5", "#FDE47F", "#E04644", "#B576AD", "#28df99", "#2d4059"],
};
class App extends Component {
  constructor(props) {
    // JS requires that super be called before accessing 'this'
    super(props);
    // this.state is an object that holds "state" in its properties
    this.state = { ...this.getInitialState(), difficulty: "Easy" };
    //do not need to use binding if converted to call back function
    // this.updateColor = this.updateColor.bind(this);
    // this.handleColorSelection = this.handleColorSelection.bind(this);
  }
  componentDidMount() {
    console.log("App: componentDidMount");
  }
  handleTimerUpdate = () => {
    this.setState((state) => ({ elapsedTime: ++state.elapsedTime }));
  };
  getInitialState() {
    return {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode(),
      elapsedTime: 0,
    };
  }

  newGame = () => {
    console.log("i am in new Game");
    this.setState(this.getInitialState());
  };

  checkGuess = () => {
    console.log("i am checking guesses");
    console.log(this.state.code);
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
    let numColors = this.state && colors[this.state.difficulty].length;
    numColors = numColors || 4;
    return new Array(4)
      .fill()
      .map((dummy) => Math.floor(Math.random() * numColors));
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
  changeDifficulty = (level) => {
    console.log("i am in changing difficulty");
    console.log(level);
    this.setState({ difficulty: level, ...this.getInitialState() });
  };
  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header className="App-header-footer">
          R E A C T &nbsp;&nbsp;&nbsp; M A S T E R M I N D
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <GamePage
                winTries={winTries}
                colors={colors[this.state.difficulty]}
                selColorIdx={this.state.selColorIdx}
                guesses={this.state.guesses}
                handleColorSelection={this.handleColorSelection}
                newGame={this.newGame}
                changeColor={this.changeColor}
                checkGuess={this.checkGuess}
                handleTimerUpdate={this.handleTimerUpdate}
                elapsedTime={this.state.elapsedTime}
              />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <SettingsPage
                {...props}
                colors={colors}
                difficulty={this.state.difficulty}
                changeDifficulty={this.changeDifficulty}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
