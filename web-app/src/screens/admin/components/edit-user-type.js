import React from "react";

import bookAPI from "../../../API/book-api";
import styles from "../../../styling/style-sheet";
import AuthContext from "../../../components/context";
import authWrapper from "../../../components/auth-wrapper";
import MyButton from "../../../components/button";

// <EditUserType selectUsers={} password={} />
function EditUserType(props) {

    const { signOut } = React.useContext(AuthContext);

    // assigning props
    const selectUsers = props.selectUsers;
    const password = props.password;

    // setting states
    const [msg, setMsg] = React.useState('');
    const [userType, setUserType] = React.useState('');

    // submit edits to user type
    const handleSubmit = async () => {

        // error message
        if (selectUsers.length === 0) {
            setMsg("Please select user(s) first.");
            setTimeout(() => setMsg(''), 3000);
        }

        // call api to edit user
        let p = new Promise((resolve, reject) => {
            selectUsers.map(async (user) => {
                let result = await authWrapper(bookAPI.put("/protected/admin/usertype", {
                    userId: user,
                    type: userType,
                    password: password,
                }),
                    signOut
                );

                if (result.status === 200) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        })

        p.then((response) => {
            setMsg(response.data.message)
            setTimeout(() => {
                setMsg('');
                return window.location.reload();
            }, 3000);
        }).catch((error) => {
            setMsg(error.response.data.message);
            setTimeout(() => setMsg(''), 3000);
        })
    }

    // render
    return (
        <div>
            <h3 style={styles.h3Bold}>Edit User Type:</h3>
            <p style={styles.textNormal}>Select users before selecting user type from dropdown menu</p>
            <p style={styles.textRed}>{msg}</p>
            <select
                onChange={e => setUserType(e.target.value)}
                style={styles.dropdown}
            >
                <option selected disabled>Select User Type</option>
                <option value="USER">User</option>
                <option value="BANNED">Banned</option>
                <option value="ADMIN">Admin</option>
            </select >
            <MyButton type={"button"} name={"Submit"} handle={handleSubmit} />
        </div >

    )
}

export default EditUserType;