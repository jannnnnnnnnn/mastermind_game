import React from "react";
import GameBoard from "../../components/GameBoard/GameBoard";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import GameTimer from "../../components/GameTimer/GameTimer";
import NewGameButton from "../../components/NewGameButton/NewGameButton";
import { Link } from "react-router-dom";
import "./GamePage.css";

const GamePage = (props) => {
  return (
    <div className="GamePage">
      <div className="flex-h align-flex-end">
        <GameBoard
          colors={props.colors}
          guesses={props.guesses}
          changeColor={props.changeColor}
          checkGuess={props.checkGuess}
        />
        <div className="GamePage-controls">
          <ColorPicker
            colors={props.colors}
            handleColorSelection={props.handleColorSelection}
            selColorIdx={props.selColorIdx}
          />
          <GameTimer
            handleTimerUpdate={props.handleTimerUpdate}
            elapsedTime={props.elapsedTime}
            winTries={props.winTries}
          />
          <Link className="btn btn-default GamePage-link-margin" to="/settings">
            Difficulty
          </Link>
          <NewGameButton newGame={props.newGame} />
        </div>
      </div>
      <footer className="GamePage-header-footer">
        {props.winTries
          ? `You Won in ${props.winTries} Guesses!`
          : "Good Luck!"}
      </footer>
    </div>
  );
};

export default GamePage;
