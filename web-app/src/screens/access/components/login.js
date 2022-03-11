import React from "react";
import { useNavigate } from "react-router-dom";

import bookAPI from "../../../API/book-api";
import styles from "../../../styling/style-sheet";
import TextInput from "../../../components/text-input";
import MyButton from "../../../components/button";
import AuthContext from "../../../components/context";

function Login() {

    const { signIn } = React.useContext(AuthContext);

    // for navigating with react router
    const navigate = useNavigate();

    // set state
    const [email, setEmail] = React.useState('shepard@normandy.com');
    const [pwd, setPwd] = React.useState('fuckreapers');
    const [msg, setMsg] = React.useState('')

    // Submitting user details to login
    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookAPI.post("/general/login",
            {
                email: email,
                password: pwd
            }
        ).then((response) => {
            // automatically navigate to book list page if login successful
            setMsg(response.data.message)
            setTimeout(() => {
                signIn(response.data.data);
                return navigate('/');
            }, 2000);
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }

    // render
    return (
        <div>
            <h1 style={styles.h1Font}>LOGIN</h1>
            <p style={{ ...styles.msgGap, ...styles.textBold }}>{msg}</p>
            <form
                onSubmit={handleSubmit}
                style={styles.containerStart}
            >
                <TextInput req={true} type="text" name="Email" value={email} setValue={setEmail} />
                <TextInput req={true} type="password" name="Password" value={pwd} setValue={setPwd} />
                <MyButton name={"Submit"} />
            </form>
            <p style={styles.textNormal}>Don't have an account yet?</p>
        </div>
    )
}

export default Login;

