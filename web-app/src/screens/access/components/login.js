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
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [msg, setMsg] = React.useState('')

    // ----------------------------------------------- SUBMIT USER DETAILS TO LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookAPI.post("/general/login",
            {
                email: email,
                password: pwd
            }
        
        // automatically navigate to book list page if login successful
        ).then((response) => {
            setMsg(response.data.message)
            
            setTimeout(() => {
                signIn(response.data.data);
                return navigate('/booklist');
            }, 2000);
        
        // display error message
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }

    // ----------------------------------------------- RENDER
    return (
        <div>
            <h1 style={styles.h1Font}>LOGIN</h1>
            <p style={{ ...styles.msgGap, ...styles.textRed }}>{msg}</p>
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

