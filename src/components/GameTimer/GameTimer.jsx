import React from "react";
import stylez from "./GameTimer.module.css";

function GameTimer(props) {
  return <div className={`${stylez.GameTimer} flex-h`}>00:00</div>;
}

export default GameTimer;
