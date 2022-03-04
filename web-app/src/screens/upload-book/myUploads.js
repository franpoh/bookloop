import React from "react";
import {useNavigate} from "react-router-dom";
import styles from "../../styling/style-sheet";
import bookAPI from "../../API/book-api";

function MyUploads() {
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState(8);

    const retrieveUserSwapYes = async (e) => {
        e.preventDefault();
        
        await bookAPI.get("/protected/swap")
    }
    return (
        <div>
            <h1 style={styles.h1Font}>My Uploads</h1>
            <p style={styles.textNormal}>Currently Uploaded Books</p>
            <p style={styles.textNormal}>Previous Uploads</p>
            <p style={styles.textNormal}>Upload a New Book</p>
        </div>
    )
}
export default MyUploads;