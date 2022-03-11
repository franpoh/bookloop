import { history } from "../../../components/history";
import bookAPI from "../../../API/book-api";

const handleLogout = async (signOut) => {
    await bookAPI.post("/general/logout"
    ).then((res) => {
        // automatically navigate to login page if logout successful
        alert(res.data.message);
        setTimeout(() => {
            signOut();
            return history.push("/access");
        }, 2000);
    }).catch((error) => {
        alert(error.response.data.message);
    })
}

export default handleLogout;