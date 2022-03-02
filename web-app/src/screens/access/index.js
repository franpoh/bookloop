import React from "react";

import Login from "./components/login";
import Register from "./components/register";

import styles from "../../styling/style-sheet";
import MyButton from "../../components/button";

function Access() {
    const [display, setDisplay] = React.useState(<Login />);
    const [buttonText, setButtonText] = React.useState("Sign Up Now");

    function handleDisplay() {
        if (buttonText === "Sign Up Now") {
            setDisplay(<Register />);
            setButtonText("Login Now");
        } else if (buttonText === "Login Now") {
            setDisplay(<Login />);
            setButtonText("Sign Up Now");
        }
    }

    return (
        <div style={styles.marginAtTop}>
            {display}
            <MyButton name={buttonText} handle={handleDisplay} />
        </div>
    )
}

export default Access;