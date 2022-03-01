import React from "react";
import bookAPI from "../../API/book-api";

function Account() {

    const [user, setUser] = React.useState('')

    let p = new Promise(async (resolve) => {
        let result = await bookAPI.get('/protected/viewprofile');
        let { data } = result;
        let user = data.data;
        resolve(user);
    })
    
    p.then((res) => {
        setUser(res.username);
    });

    console.log("Test", user);    

    return (
        <div>
            <h1>Account</h1>
            <p>testing</p>
            <p>{user}</p>
        </div>
    )
}

export default Account;