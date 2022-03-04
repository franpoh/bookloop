import React from "react";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import { BookListing, BookDisplay } from "./book_listings";

function UploadedBooks() {
    const [uploaded, setUploaded] = React.useState(<li style={styles.textBold}>You have not uploaded anything yet!</li>)

    React.useEffect(() => {
        let p = new Promise(async (resolve) => {
            let profile = await bookAPI.get('/protected/viewprofile');
            let res = profile.data.data.swap;
            resolve(res);
        })

        p.then((res) => {
            if (!res || res.length === 0) {
                return;
            } else {
                const swap = res.map((item, index) => {
                    return <BookListing index={index} item={item} detail="comments" />;
                });

                setUploaded(swap);
            }
        });
    }, [])

    return (
        <BookDisplay uploaded={uploaded} />
    )
}

export default UploadedBooks;