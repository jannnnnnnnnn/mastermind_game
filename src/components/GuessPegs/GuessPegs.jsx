import React from "react";
import GuessPeg from "../GuessPeg/GuessPeg";
import "./GuessPegs.css";

function GuessPegs(props) {
  return (
    <div className="GuessPegs">
      <GuessPeg
        color={props.colors[props.code[0]]}
        currentGuess={props.currentGuess}
        idx={0}
        changeColor={props.changeColor}
      />
      <GuessPeg
        color={props.colors[props.code[1]]}
        currentGuess={props.currentGuess}
        idx={1}
        changeColor={props.changeColor}
      />
      <GuessPeg
        color={props.colors[props.code[2]]}
        currentGuess={props.currentGuess}
        idx={2}
        changeColor={props.changeColor}
      />
      <GuessPeg
        color={props.colors[props.code[3]]}
        currentGuess={props.currentGuess}
        idx={3}
        changeColor={props.changeColor}
      />
    </div>
  );
}

export default GuessPegs;
