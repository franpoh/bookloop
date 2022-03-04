import React from "react";
import { useNavigate } from "react-router-dom";

import bookAPI from "../../../API/book-api";
import MyButton from "../../../components/button";

function Logout() {
    const navigate = useNavigate();

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

    return (
        <MyButton name="Logout" handle={handleLogout} />
    )
}

export default Logout;