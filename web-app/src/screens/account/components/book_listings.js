import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import styles from "../../../styling/style-sheet";

const BookListing = (props) => {
    const navigate = useNavigate();

    const bookItem = props.item;
    const detailName = props.name;
    const detail = props.detail;

    const passIndex = bookItem.Index.indexId;

    function navBook() {
        navigate(`/bookdetails/${passIndex}`);
    }

    return (
        <div key={uuidv4()} style={styles.containerRowList}>
            <img key={uuidv4()} src={bookItem.Index.imageURL} alt="book covers" style={styles.profileBookPics} onClick={navBook} />
            <div key={uuidv4()} style={styles.profileBookDetails} props>
                <p key={uuidv4()} style={styles.textBold} onClick={navBook}>{bookItem.Index.title}</p>
                <p key={uuidv4()} style={styles.textNormal} onClick={navBook}><b>{detailName}:</b> {bookItem[detail]}</p>
            </div>
        </div>
    )
}

const BookDisplay = (props) => {
    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>{props.name}</h1>
            <ul style={styles.listNoBullets}>{props.uploaded}</ul>
        </div>
    )
}

export { BookListing, BookDisplay };