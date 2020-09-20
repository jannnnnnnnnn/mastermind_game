import React from "react";

function NewGameButton(props) {
  return (
    <button className="btn btn-default" onClick={props.newGame}>
      New Game
    </button>
  );
}

export default NewGameButton;
