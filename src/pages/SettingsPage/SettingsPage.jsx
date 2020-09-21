import React from "react";
import { Link } from "react-router-dom";
import "./SettingsPage.css";

const SettingsPage = (props) => {
  const colorKeys = Object.keys(props.colors);
  console.log(colorKeys);

  function changeDifficulty(level) {
    props.changeDifficulty(level);
    props.history.push("/");
  }
  return (
    <div className="SettingsPage">
      <h2>Set Difficulty Level</h2>
      {colorKeys.map((level) => (
        <div key={level} className="SettingsPage-levels">
          <button
            className="btn btn-default "
            onClick={() => changeDifficulty(level)}
          >
            {level}
          </button>
          {props.colors[level].map((color) => (
            <div
              key={color}
              className="colorDisplay"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      ))}

      <Link className="btn btn-default" to="/">
        Cancel
      </Link>
    </div>
  );
};

export default SettingsPage;
