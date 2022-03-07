import React from "react";

import styles from "../../../styling/style-sheet";
import { BookListing, BookDisplay } from "./book_listings";

// props to pass in: target, detailName, detail, headerName, noListingMsg
// <BookListView target={} detailName={} detail={} headerName={} noListingMsg={} />

function BookListView(props) {
    let target = props.target;
    const [uploaded, setUploaded] = React.useState('')

    React.useEffect(() => {
        let p = new Promise((resolve) => {
            let response = target;
            resolve(response);
        });

        p.then((response) => {
            if (!response) {
                return;
            } else if (response.length === 0) {
                setUploaded(<li style={styles.textBold}>{props.noListingMsg}</li>);
            } else {
                const listing = response.map((item) => {
                    return <BookListing item={item} name={props.detailName} detail={props.detail} />;
                });
                setUploaded(listing);
            }
        });
    }, [target]);
    // useEfect gets into a loop when uploaded is used as a dependency
    // if state is listed as a dependency, you create a new object for state every time
    // when you use a dependency that isn't set in useEffect, it won't loop


    return (
        <BookDisplay name={props.headerName} uploaded={uploaded} />
    )
}

export default BookListView;