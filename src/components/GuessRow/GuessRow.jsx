import React from "react";
import GuessPegs from "../GuessPegs/GuessPegs";
import GuessScore from "../GuessScore/GuessScore";
import ScoreButton from "../ScoreButton/ScoreButton";
import stylez from "./GuessRow.module.css";

function GuessRow(props) {
  return (
    <div className={stylez.GuessRow}>
      <div
        className={stylez.textSize}
        style={{ color: props.currentGuess ? "black" : "lightgrey" }}
      >
        {props.rowIdx + 1}
      </div>
      <GuessPegs
        colors={props.colors}
        code={props.guess.code}
        currentGuess={props.currentGuess}
        changeColor={props.changeColor}
      />
      {props.currentGuess && props.guess.score.perfect !== 4 ? (
        <ScoreButton guess={props.guess.code} checkGuess={props.checkGuess} />
      ) : (
        <GuessScore score={props.guess.score} />
      )}
    </div>
  );
}

export default GuessRow;
