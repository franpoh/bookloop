import React from "react";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import { BookListing, BookDisplay } from "./book_listings";

function Wishlist() {
    const [uploaded, setUploaded] = React.useState(<li style={styles.textBold}>You have not uploaded anything yet!</li>)

    React.useEffect(() => {
        let p = new Promise(async (resolve) => {
            let list = await bookAPI.get('/protected/wishlist');
            let res = list.data.data;
            resolve(res);
        })

        p.then((res) => {
            if (!res || res.length === 0) {
                return;
            } else {
                const swap = res.map((item, index) => {
                    return <BookListing item={item} name="Availability" detail="availability" />;
                });

                setUploaded(swap);
            }
        });
    }, [])

    return (
        <BookDisplay name={"Wishlist"} uploaded={uploaded} />
    )
}

export default Wishlist;