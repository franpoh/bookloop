import React from "react";

import styles from "../styling/style-sheet";
import "../styling/style.css"

const MyButton = (props) => {
    return (
        <button 
            type={props.type}
            style={styles.button} 
            className="mybutton"
            onClick={props.handle}
        >
            {props.name}
        </button>
    )
}

export default MyButton;