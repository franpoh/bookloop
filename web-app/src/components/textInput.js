import React from "react";

import styles from "../styling/style-sheet";

const TextInput = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.name}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            required={props.req}
            autoComplete="off"
            style={styles.textBox}
        />
    )
}

export default TextInput;