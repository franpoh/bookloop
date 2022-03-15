import React from "react";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import TextInput from "../../../components/text-input";
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
    const [points, setPoints] = React.useState('');

    
    // ----------------------------------------------- HANDLING USER INFORMATION FROM API CALL
    React.useEffect(() => {
        let p = new Promise((resolve) => {
            let response = target;
            resolve(response);
        })

        // setting displayed user information in accounts page
        p.then((response) => {

            if (!response) {
                return;

            } else {
                setUser(response.username);
                setEmail(response.email);
                setPic(response.imageURL);
                setPoints(response.points);
            }
        });
    }, [target]);

    
    // ----------------------------------------------- EDIT PROFILE INFORMATION
    const handleSubmit = (e) => {
        e.preventDefault();
        editProfile(email, oldPwd, newPwd, signOut, setMsg, setEmail, setOldPwd, setNewPwd);
    }

    // ----------------------------------------------- RENDER
    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>Welcome {user},</h1>
            <p style={{ ...styles.textBold, ...styles.negativeMarginAtTop }}>You have {points} points!</p>
            <hr style={styles.accountDivider} />
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