import React from "react";
import { useNavigate } from "react-router-dom";

import bookAPI from "../../../API/book-api";
import styles from "../../../styling/style-sheet";
import TextInput from "../../../components/textInput";
import MyButton from "../../../components/button";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('shepard@normandy.com');
    const [pwd, setPwd] = React.useState('fuckreapers');
    const [msg, setMsg] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookAPI.post("/general/login",
            {
                email: email,
                password: pwd
            }
        ).then((response) => {
            setMsg(response.data.message)
            setTimeout(() => {
                return navigate('/');
            }, 2000);
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }

    return (
        <div>
            <h1 style={styles.h1Font}>LOGIN</h1>
            <p style={{...styles.msgGap, ...styles.textBold}}>{msg}</p>
            <form
                onSubmit={handleSubmit}
                style={styles.containerStart}
            >
                <TextInput type="text" name="Email" value={email} setValue={setEmail} />
                <TextInput type="password" name="Password" value={pwd} setValue={setPwd} />
                <MyButton name={"Submit"} />
            </form>
            <p style={styles.textNormal}>Don't have an account yet?</p>
        </div>
    )
}

export default Login;

