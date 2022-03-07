import React from "react";
import { useNavigate } from "react-router-dom";

import bookAPI from "../../../API/book-api";
import MyButton from "../../../components/button";
import AuthContext from "../../../components/context";
import authWrapper from "../../../components/auth_wrapper";

function Logout() {
    const { signOut } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authWrapper(bookAPI.post("/protected/logout", signOut)
        ).then((res) => {
            alert(res.data.message);
            setTimeout(() => {
                signOut();
                return navigate('/access');
            }, 2000);
        }).catch((error) => {
            alert(error.data.message);
        })
    }

    return (
        <MyButton name="Logout" handle={handleLogout} />
    )
}

export default Logout;