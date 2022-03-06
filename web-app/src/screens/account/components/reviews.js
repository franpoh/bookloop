import React from "react";
import bookAPI from "../../../API/book-api";

import styles from "../../../styling/style-sheet";
import authWrapper from "../../../components/auth_wrapper";
import { BookListing, BookDisplay } from "./book_listings";

function Reviews() {
    const [uploaded, setUploaded] = React.useState('')

    React.useEffect(() => {
        let p = new Promise(async (resolve) => {
            let profile = await authWrapper(bookAPI.get('/protected/viewprofile'));
            resolve(profile);
        })

        p.then((profile) => {
            if (!profile) {
                return;
            } else if (profile.length === 0) {
                setUploaded(<li style={styles.textBold}>You have not uploaded anything yet!</li>);
            } else {
                let res = profile.data.data.reviews;
                const swap = res.map((item) => {
                    return <BookListing item={item} name="My Review" detail="review" />;
                });
                setUploaded(swap);
            }
        });
    }, [])

    if (!uploaded) {
        return <></>
    } else {
        return (
            <BookDisplay name={"Reviews"} uploaded={uploaded} />
        )
    }
}

export default Reviews;