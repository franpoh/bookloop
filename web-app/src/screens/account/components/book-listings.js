import React from "react";
import { useNavigate } from 'react-router-dom';

import styles from "../../../styling/style-sheet";



const noImage = require("../../../assets/no-image.png"); // used for books with no covers

// ----------------------------------------------- MAPPING DETAILS OF EACH BOOK INTO A LIST ITEM
const BookListing = (props) => {

    const navigate = useNavigate();

    // assigning props
    const passIndex = props.index;
    const bookItem = props.item;
    const detailName = props.name;
    const detail = props.detail;

    // navigation to specific book URL
    function navBook() {
        navigate(`/bookdetails/${passIndex}`);
    }

    // list item format
    return (
        <div style={styles.containerRowList}>
            <img src={bookItem.Index.imageURL ? bookItem.Index.imageURL : noImage} alt="book covers" style={styles.profileBookPics} className="nav" onClick={navBook} />
            <div style={styles.profileBookDetails}>
                <p style={styles.textBold} className="nav" onClick={navBook}>{bookItem.Index.title}</p>
                <p style={styles.textNormal}><b>{detailName}:</b> {bookItem[detail]}</p>
            </div>
        </div>
    )
}



// ----------------------------------------------- DISPLAY LIST ITEMS IN LIST
const BookDisplay = (props) => {
    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>{props.name}</h1>
            <hr style={styles.accountDivider} />
            <ul style={{ ...styles.listNoBullets, ...styles.overflowScroll }}>{props.uploaded}</ul>
        </div>
    )
}

export { BookListing, BookDisplay };