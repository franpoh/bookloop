import React from "react";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import TextInput from "../../../components/text-input";
import authWrapper from "../../../components/auth-wrapper";
import AuthContext from "../../../components/context";

import editProfile from "./edit-profile";

function UserDetails(props) {

    const { signOut } = React.useContext(AuthContext);

    // target is individual profile elements, to be used in useEffect as dependency
    let target = props.target;

    // set states
    const [user, setUser] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [oldPwd, setOldPwd] = React.useState('');
    const [newPwd, setNewPwd] = React.useState('');
    const [pic, setPic] = React.useState('');
    const [msg, setMsg] = React.useState('');

    // getting user info
    React.useEffect(() => {
        let p = new Promise((resolve) => {
            let response = target;
            resolve(response);
        })

        p.then((response) => {
            if (!response) {
                return;
            } else {
                setUser(response.username);
                setEmail(response.email);
                setPic(response.imageURL);
            }
        });
    }, [target]);

    // editing account info
    const handleSubmit = (e) => {
        e.preventDefault();
        editProfile(email, oldPwd, newPwd, signOut, setMsg);
    }

    // render
    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>Welcome {user}!</h1>
            <div style={styles.containerRow}>
                <img src={pic} alt="profile" style={styles.profilePic} />
                <div>
                    <p style={styles.textRed}>{msg}</p>
                    <form
                        onSubmit={handleSubmit}
                        style={styles.containerStart}
                    >
                        <TextInput req={false} type="text" name="Email" value={email} setValue={setEmail} />
                        <TextInput req={true} type="password" name="Old Password" value={oldPwd} setValue={setOldPwd} />
                        <TextInput req={false} type="password" name="New Password" value={newPwd} setValue={setNewPwd} />
                        <div style={styles.containerRow}>
                            <MyButton name={"Save Profile"} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default UserDetails;