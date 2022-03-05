import React from "react";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import authWrapper from "../../../components/auth_wrapper";
import { BookListing, BookDisplay } from "./book_listings";

function Wishlist() {
    const [uploaded, setUploaded] = React.useState('')

    React.useEffect(() => {
        let p = new Promise(async (resolve) => {
            let list = await authWrapper(bookAPI.get('/protected/wishlist'));
            resolve(list);
        })

        p.then((list) => {
            if (!list) {
                return;
            } else if (list.length === 0) {
                setUploaded(<li style={styles.textBold}>You have not uploaded anything yet!</li>);
            } else {
                let res = list.data.data;
                const swap = res.map((item) => {
                    return <BookListing item={item} name="Availability" detail="availability" />;
                });

                setUploaded(swap);
            }
        });
    }, [])

    if (!uploaded) {
        return <></>
    } else {
        return (
            <BookDisplay name={"Wishlist"} uploaded={uploaded} />
        )
    }
}

export default Wishlist;