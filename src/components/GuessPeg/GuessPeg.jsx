import React from "react";
import stylez from "./GuessPeg.module.css";

function GuessPeg(props) {
  return (
    <div
      className={stylez.GuessPeg}
      style={{
        backgroundColor: props.color,
        border: props.color ? `1px solid ${props.color}` : "1px dashed grey",
        cursor: props.currentGuess && "pointer",
      }}
    ></div>
  );
}

export default GuessPeg;
