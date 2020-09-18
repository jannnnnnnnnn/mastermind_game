import React from "react";
import GuessPegs from "../GuessPegs/GuessPegs";
import GuessScore from "../GuessScore/GuessScore";
import ScoreButton from "../ScoreButton/ScoreButton";
import stylez from "./GuessRow.module.css";

function GuessRow(props) {
  return (
    <div className={stylez.GuessRow}>
      <div className={stylez.textSize}>{props.rowIdx + 1}</div>
      <GuessPegs
        colors={props.colors}
        code={props.guess.code}
        currentGuess={props.currentGuess}
      />
      {props.currentGuess ? (
        <ScoreButton />
      ) : (
        <GuessScore score={props.guess.score} />
      )}
    </div>
  );
}

export default GuessRow;
