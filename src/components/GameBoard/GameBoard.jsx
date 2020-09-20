import React from "react";
import GuessRow from "../GuessRow/GuessRow";
import stylez from "./GameBoard.module.css";

function GameBoard(props) {
  // let newColor = [];
  // {
  //   props.colors.forEach((c) => {
  //     newColor.push(<div>{c}</div>);
  //   });
  // }
  return (
    <div className={stylez.GameBoard}>
      {props.guesses.map((guess, idx) => (
        <GuessRow
          guess={guess}
          colors={props.colors}
          rowIdx={idx}
          currentGuess={idx === props.guesses.length - 1}
          key={idx}
          changeColor={props.changeColor}
          checkGuess={props.checkGuess}
        />
      ))}
      {/* {newColor} */}
    </div>
  );
}

export default GameBoard;
