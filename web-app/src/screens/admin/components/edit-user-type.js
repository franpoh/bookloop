import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import bookAPI from "../../../API/book-api";
import styles from "../../../styling/style-sheet";
import AuthContext from "../../../components/context";
import authWrapper from "../../../components/auth-wrapper";
import MyButton from "../../../components/button";

// <EditUserType selectUsers={} password={} />
function EditUserType(props) {
    const selectUsers = props.selectUsers;
    const password = props.password;

    const { signOut } = React.useContext(AuthContext);

    const [msg, setMsg] = React.useState('');
    const [userType, setUserType] = React.useState('');

    const handleSubmit = async () => {

        if (selectUsers.length === 0) {
            setMsg("Please select user(s) first.");
            setTimeout(() => setMsg(''), 3000);
        }

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

    return (
        <div>
            <h3 style={styles.h3Bold}>Edit User Type:</h3>
            <p style={styles.textNormal}>Select users before selecting user type from dropdown menu</p>
            <p style={styles.textNormal}>{msg}</p>
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