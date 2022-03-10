import React from "react";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import TextInput from "../../../components/textInput";

function UserDetails() {

    const [user, setUser] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [oldPwd, setOldPwd] = React.useState('');
    const [newPwd, setNewPwd] = React.useState('');
    const [pic, setPic] = React.useState('');
    const [msg, setMsg] = React.useState('')

    // getting user info
    React.useEffect(() => {
        let p = new Promise(async (resolve) => {
            let profile = await bookAPI.get('/protected/viewprofile');
            let res = profile.data.data.user;
            resolve(res);
        })

        p.then((res) => {
            setUser(res.username);
            setEmail(res.email);
            setPic(res.imageURL);
        });
    }, [])

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
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }

    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>Welcome {user}!</h1>
            <div style={styles.containerRow}>
                <img src={pic} alt="profile" style={styles.profilePic} />
                <form
                    onSubmit={handleSubmit}
                    style={styles.containerStart}
                >
                    <TextInput req={false} type="text" name="Email" value={email} setValue={setEmail} />
                    <TextInput req={true} type="password" name="Old Password" value={oldPwd} setValue={setOldPwd} />
                    <TextInput req={false} type="password" name="New Password" value={newPwd} setValue={setNewPwd} />
                    <div style={styles.containerRow}>
                        <MyButton name={"Save Profile"} />
                        <MyButton type={"button"} name={"Upload Book"} handle={() => console.log("uploadbook")} />
                        <MyButton type={"button"} name={"Admin"} handle={() => console.log("admin")} />
                    </div>
                    <p style={styles.textBold}>{msg}</p>
                </form>
            </div>
        </div>

    )
}

export default UserDetails;