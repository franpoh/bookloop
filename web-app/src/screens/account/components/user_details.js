import React from "react";
import bookAPI from "../../../API/book-api";
import { useNavigate } from "react-router-dom";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import TextInput from "../../../components/textInput";

function UserDetails() {

    const navigate = useNavigate();

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
    }, []);

    // logout, for auto-logout upon password change
    const handleLogout = async () => {
        await bookAPI.post("/protected/logout"
        ).then((res) => {
            alert(res.data.message);
            setTimeout(() => {
                return navigate('/access');
            }, 2000);
        }).catch((error) => {
            alert(error.data.message);
        })
    }

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
            let newMsg = response.data.message;
            setMsg(newMsg)
            setOldPwd('');
            setNewPwd('');

            if (newMsg.indexOf('Password Updated') === -1){
                setTimeout(() => setMsg(''), 5000);
            } else {
                setTimeout(() => {
                    handleLogout();
                }, 5000);
            }

        }).catch((error) => {
            setMsg(error.response.data.message)
            setOldPwd('');
            setNewPwd('');
            setTimeout(() => setMsg(''), 5000);
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