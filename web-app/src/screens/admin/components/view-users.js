import React from "react";

import styles from "../../../styling/style-sheet";
import { BookListing, BookDisplay } from "./book-listings";
import { v4 as uuidv4 } from 'uuid';

// props to pass in: target, detailName, detail, headerName, noListingMsg
// <BookListView target={} detailName={} detail={} headerName={} noListingMsg={} />

function ViewUsers() {
    React.useEffect(() => {
    }, []);
    // useEfect gets into a loop when uploaded is used as a dependency
    // if state is listed as a dependency, you create a new object for state every time
    // when you use a dependency that isn't set in useEffect, it won't loop


    return (
        <></>
    )
}

export default ViewUsers;