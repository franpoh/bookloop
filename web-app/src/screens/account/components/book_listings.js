import React from "react";

import styles from "../../../styling/style-sheet";

const BookListing = (props) => {
    const bookIndex = props.index;
    const bookItem = props.item;
    const detail = props.detail;

    return (
        <div key={bookIndex} style={styles.containerRowList}>
            <img src={bookItem.Index.imageURL} alt="book covers" style={styles.profileBookPics} />
            <div style={styles.profileBookDetails} props>
                <p style={styles.textBold}>{bookItem.Index.title}</p>
                <p style={styles.textNormal}>"{bookItem[detail]}"</p>
            </div>
        </div>
    )
}

const BookDisplay = (props) => {
    return (
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>Reviews</h1>
            <ul style={styles.listNoBullets}>{props.uploaded}</ul>
        </div>
    )
}

export { BookListing, BookDisplay };