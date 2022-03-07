import React from "react";
import { v4 as uuidv4 } from 'uuid';
import {  useNavigate } from 'react-router-dom';

import styles from "../../../styling/style-sheet";

// Mapping details of each book into a list item
const BookListing = (props) => {
    const navigate = useNavigate();

    let passIndex = props.index;
    const bookItem = props.item;
    const detailName = props.name;
    const detail = props.detail;

    function navBook() {
        navigate(`/bookdetails/${passIndex}`);
    }

    return (
        <div key={uuidv4()} style={styles.containerRowList}>
            <img key={uuidv4()} src={bookItem.Index.imageURL} alt="book covers" style={styles.profileBookPics} className="nav" onClick={navBook} />
            <div key={uuidv4()} style={styles.profileBookDetails} props>
                <p key={uuidv4()} style={styles.textBold} className="nav" onClick={navBook}>{bookItem.Index.title}</p>
                <p key={uuidv4()} style={styles.textNormal}><b>{detailName}:</b> {bookItem[detail]}</p>
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