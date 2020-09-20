import React from "react";
import anyword from "./ScoreButton.module.css";

const ScoreButton = (props) => (
  <button
    className={`${anyword.button} btn btn-default`}
    disabled={props.guess.includes(null)}
    onClick={props.checkGuess}
  >
    ✔
  </button>
);

export default ScoreButton;
