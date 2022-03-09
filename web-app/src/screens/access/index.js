import React from "react";

import Login from "./components/login";
import Register from "./components/register";

import MyButton from "../../components/button";

function Access() {
    const [display, setDisplay] = React.useState(<Login />);
    const [buttonText, setButtonText] = React.useState("Sign Up Now");

    // Switching between login and sign up display on same page
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
        <div>
            {display}
            <MyButton name={buttonText} handle={handleDisplay} />
        </div>
    )
}

export default Access;