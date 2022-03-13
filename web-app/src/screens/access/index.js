import React from "react";

import Login from "./components/login";
import Register from "./components/register";

import MyButton from "../../components/button";



function Access() {
    
    // set states
    const [display, setDisplay] = React.useState(<Login />);
    const [buttonText, setButtonText] = React.useState("Sign Up Now");

    // ----------------------------------------------- SWITCH BETWEEN LOGIN AND REGISTRATION COMPONENTS
    function handleDisplay() {
        
        if (buttonText === "Sign Up Now") {
            setDisplay(<Register changeDisplay={setDisplay} changeButton={setButtonText} />);
            setButtonText("Login Now");

        } else if (buttonText === "Login Now") {
            setDisplay(<Login />);
            setButtonText("Sign Up Now");
        }
    }

    // ----------------------------------------------- RENDER
    return (
        <div>
            {display}
            <MyButton name={buttonText} handle={handleDisplay} />
        </div>
    )
}

export default Access;