import React from "react";
import { Link } from "react-router-dom";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import TextInput from "../../../components/text-input";

function UserDetails(props) {
    let target = props.target;

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookAPI.put("/protected/editprofile",
            {
                email: email,
                oldPassword: oldPwd,
                newPassword: newPwd,
            }
        ).then((response) => {
            setMsg(response.data.message)
            setTimeout(() => setMsg(''), 3000);
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }

    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>Welcome {user}!</h1>
            <div style={styles.containerRow}>
                <img src={pic} alt="profile" style={styles.profilePic} />
                <div>
                    <p style={styles.textBold}>{msg}</p>
                    <form
                        onSubmit={handleSubmit}
                        style={styles.containerStart}
                    >
                        <TextInput req={false} type="text" name="Email" value={email} setValue={setEmail} />
                        <TextInput req={true} type="password" name="Old Password" value={oldPwd} setValue={setOldPwd} />
                        <TextInput req={false} type="password" name="New Password" value={newPwd} setValue={setNewPwd} />
                        <div style={styles.containerRow}>
                            <MyButton name={"Save Profile"} />
                            <Link to="/admin"><MyButton name={"Admin"} /></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default UserDetails;