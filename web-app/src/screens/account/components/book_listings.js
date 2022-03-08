import React from "react";
import {  useNavigate } from 'react-router-dom';

import styles from "../../../styling/style-sheet";

// Mapping details of each book into a list item
const BookListing = (props) => {
    const navigate = useNavigate();

    const passIndex = props.index;
    const bookItem = props.item;
    const detailName = props.name;
    const detail = props.detail;

    console.log(props);

    function navBook() {
        navigate(`/bookdetails/${passIndex}`);
    }

    return (
        <div style={styles.containerRowList}>
            <img src={bookItem.Index.imageURL} alt="book covers" style={styles.profileBookPics} className="nav" onClick={navBook} />
            <div style={styles.profileBookDetails} props>
                <p style={styles.textBold} className="nav" onClick={navBook}>{bookItem.Index.title}</p>
                <p style={styles.textNormal}><b>{detailName}:</b> {bookItem[detail]}</p>
            </div>
        </div>
    )
}

// Displaying list items in list
const BookDisplay = (props) => {
    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>{props.name}</h1>
            <hr style={styles.accountDivider} />
            <ul style={styles.listNoBullets}>{props.uploaded}</ul>
        </div>
    )
}

export { BookListing, BookDisplay };