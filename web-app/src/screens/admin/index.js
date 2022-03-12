import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import EditUserType from "./components/edit-user-type";
import { users } from "./components/datagrid-columns"

import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import AuthContext from "../../components/context";
import authWrapper from "../../components/auth-wrapper";
import TextInput from "../../components/text-input";

function Admin() {

    const { signOut } = React.useContext(AuthContext);

    // set column headers and properties
    const columns = users;

    // set state
    const [rows, setRows] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [selectUsers, setSelectUsers] = React.useState([]);
    const [password, setPassword] = React.useState('');

    // get list of users and map into table rows
    React.useEffect(() => {
        let p = new Promise(async (resolve, reject) => {
            let users = await authWrapper(bookAPI.get("/protected/admin/viewusers"), signOut);

            if (users.status === 200) {
                resolve(users.data.data);
            } else {
                reject(users);
            }
        });

        p.then((res) => {
            if (res.length === 0 || !res) {
                setErrorMsg(res.message);
            } else {

                // map items into table
                const listing = res.map((item) => {
                    return { id: item.userId, username: item.username, email: item.email, points: item.points, type: item.type, createdAt: item.createdAt }
                })
                setRows(listing);
            }
        }).catch((error) => {
            setErrorMsg(error.response.data.message);
        })
    }, [signOut]);

    // render
    if (rows.length === 0) {
        return <></>
    } else if (errorMsg) {
        return <h3 style={styles.h3Bold}>{errorMsg}</h3>
    } else {
        return (
            <div style={{ ...styles.containerStart, ...styles.negativeMarginAtTop }}>
                <h1 style={styles.h1Font}>Admin</h1>
                <div>
                    <h3 style={styles.h3Bold}>Enter Password to Submit Changes:</h3>
                    <TextInput req={true} type="password" name="Password" value={password} setValue={setPassword} />
                </div>
                <EditUserType selectUsers={selectUsers} password={password} />
                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        components={{ Toolbar: GridToolbar }}
                        onSelectionModelChange={(users) => setSelectUsers(users)}
                        style={styles.dataGrid}
                    />
                </div>
            </div >
        )
    }
}

export default Admin;