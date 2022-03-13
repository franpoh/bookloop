import React from "react";
import Login from "./login";

import bookAPI from "../../../API/book-api";
import styles from "../../../styling/style-sheet";
import TextInput from "../../../components/text-input";
import MyButton from "../../../components/button";

function Register(props) {

    // set states
    const [user, setUser] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [msg, setMsg] = React.useState('');

    // Submitting user details to register
    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookAPI.post("/general/register",
            {
                username: user,
                email: email,
                password: pwd,
            }
        ).then((response) => {
            // reset page and forms if registration is successful, to land back at login
            setMsg(response.data.message)
            setUser('');
            setEmail('');
            setPwd('');
            setTimeout(() => {
                setMsg('');
                props.changeDisplay(<Login />);
                props.changeButton("Sign Up Now");
            }, 2000);
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }

    // render
    return (
        <div>
            <h1 style={styles.h1Font}>SIGN UP</h1>
            <p style={{ ...styles.msgGap, ...styles.textRed }}>{msg}</p>
            <form
                onSubmit={handleSubmit}
                style={styles.containerStart}
            >
                <TextInput req={true} type="text" name="Email" value={email} setValue={setEmail} />
                <TextInput req={true} type="text" name="Username" value={user} setValue={setUser} />
                <TextInput req={true} type="password" name="Password" value={pwd} setValue={setPwd} />
                <MyButton name={"Submit"} />
            </form>
            <p style={styles.textNormal}>Have an account already?</p>
        </div>
    )
}

export default Register;

