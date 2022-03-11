import bookAPI from "../../../API/book-api";

import authWrapper from "../../../components/auth-wrapper";
import handleLogout from "../../access/components/logout";

async function editProfile(email, oldPwd, newPwd, signOut, setMsg) {

    await authWrapper(bookAPI.put("/protected/editprofile",
        {
            email: email,
            oldPassword: oldPwd,
            newPassword: newPwd,
        }), signOut).then((response) => {
            setMsg(response.data.message)
            setTimeout(() => {
                // if password was updated, logout, otherwise stay login
                if (response.data.message.includes("Password Updated")) {
                    handleLogout(signOut);
                    setMsg('');
                    return;
                } else {
                    setMsg('');
                    return;
                }
            }, 3000);
        }).catch((error) => {
            setMsg(error.response.data.message)
            return;
        })
}

export default editProfile;