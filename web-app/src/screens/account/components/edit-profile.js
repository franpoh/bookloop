import bookAPI from "../../../API/book-api";

import authWrapper from "../../../components/auth-wrapper";
import handleLogout from "../../access/components/logout";

async function editProfile(email, oldPwd, newPwd, signOut, setMsg) {


    let p = new Promise(async (resolve, reject) => {
        let result = await authWrapper(bookAPI.put("/protected/editprofile",
            {
                email: email,
                oldPassword: oldPwd,
                newPassword: newPwd,
            }), signOut);

        if (result.status === 200) {
            resolve(result);
        } else {
            reject(result);
        }
    });

    p.then((response) => {
        setMsg(response.data.message)
        setTimeout(() => {
            // if password was updated, logout, otherwise stay login
            if (response.data.message.includes("Password Updated")) {
                handleLogout(signOut);
                return;
            } else {
                return window.location.reload();
            }
        }, 3000);
    }).catch((error) => {
        setMsg(error.response.data.message)
        return;
    })
}

export default editProfile;