import { history } from "../../../components/history";
import bookAPI from "../../../API/book-api";



const handleLogout = async (signOut) => {
    
    await bookAPI.post("/general/logout"

    // automatically navigate to login page if logout successful
    ).then((res) => {
        alert(res.data.message);
        
        setTimeout(() => {
            signOut();
            return history.push("/bookloop/access");
        }, 2000);

    // display error message
    }).catch((error) => {
        alert(error.response.data.message);
    })
}

export default handleLogout;