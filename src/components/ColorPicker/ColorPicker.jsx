import React from "react";
import styles from "./ColorPicker.module.css";

function ColorPicker(props) {
  return (
    <div className={styles.ColorPicker}>
      {props.colors.map((color, idx) => (
        <button
          className={styles.button}
          style={{
            borderColor: color,
            backgroundColor: props.selColorIdx === idx ? "white" : color,
          }}
          key={color}
          onClick={() => props.handleColorSelection(idx)}
        ></button>
      ))}
    </div>
  );
}

export default ColorPicker;
