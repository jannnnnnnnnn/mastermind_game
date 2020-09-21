import React from "react";
import stylez from "./GameTimer.module.css";

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  let secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

class GameTimer extends React.Component {
  handleTick = () => {
    if (this.props.winTries !== 0) return;
    this.props.handleTimerUpdate();
  };

  /*--- Lifecycle Methods ---*/

  componentDidMount() {
    this.timerId = setInterval(this.handleTick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className={`${stylez.GameTimer} flex-h`}>
        {formatTime(this.props.elapsedTime)}
      </div>
    );
  }
}

export default GameTimer;
