import React from "react";

import styles from "../styling/style-sheet";
import "../styling/style.css"
import colours from "../styling/colours";

const MyButton = (props) => {

    return (
        <button
            type={props.type}
            style={styles.button}
            className="mybutton"
            onClick={props.handle}
            onMouseOver={(e) => { e.target.style.background = `${colours.secondaryDark}` }}
            onMouseOut={(e) => { e.target.style.background = `${colours.primary}` }}
        >
            {props.name}
        </button>
    )
}

export default MyButton;