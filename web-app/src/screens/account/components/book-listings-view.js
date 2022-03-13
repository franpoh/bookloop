import React from "react";

import styles from "../../../styling/style-sheet";
import { BookListing, BookDisplay } from "./book-listings";
import { v4 as uuidv4 } from 'uuid';

// props to pass in: target, detailName, detail, headerName, noListingMsg
// <BookListView target={} detailName={} detail={} headerName={} noListingMsg={} />



function BookListView(props) {

    // target is individual profile elements, to be used in useEffect as dependency
    let target = props.target;

    // mapped list items
    const [uploaded, setUploaded] = React.useState('')

    // ----------------------------------------------- HANDLING RETURN FROM API CALLS FOR VARIOUS BOOK-RELATED DATA ARRAYS
    React.useEffect(() => {
        let p = new Promise((resolve) => {
            let response = target;
            resolve(response);
        });

        p.then((response) => {

            // handling if book data array is null or empty
            if (!response) {
                return;
            } else if (response.length === 0) {
                setUploaded(<li style={styles.textBold}>{props.noListingMsg}</li>);
            } else {

                // WISHLIST FILTER FOR DUPLICATE ITEMS
                if (props.headerName == "Wishlist") {

                    // sort by availability, YES to NO
                    response = response.sort((a, b) => {
                        if (a.availability > b.availability) {
                            return -1;
                        } else if (a.availability < b.availability){
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    // Filter if same availability and availability is equal to NO, then by same indexId
                    response = response.filter((value, index, array) => {
                        return index === array.findIndex((item) => {
                            return item.Index.indexId === value.Index.indexId && (item.availability === value.availability || value.availability == "NO");
                        })
                    })
                }

                // MAPPING BOOK DETAILS OF EACH BOOK INTO A LIST ITEM
                const listing = response.map((item) => {
                    return <BookListing key={uuidv4()} item={item} index={item.Index.indexId} name={props.detailName} detail={props.detail} />;
                });
                setUploaded(listing);
            }
        });
    }, [target]);
    // useEfect gets into a loop when uploaded is used as a dependency
    // if state is listed as a dependency, you create a new object for state every time
    // when you use a dependency that isn't set in useEffect, it won't loop

    // ----------------------------------------------- RENDER
    return (
        <BookDisplay name={props.headerName} uploaded={uploaded} />
    )
}

export default BookListView;