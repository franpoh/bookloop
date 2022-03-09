// libraries
import React from 'react';

// styling
import styles from "../../../styling/style-sheet.js";

function ShowBookInfo ({ data }) {

    return (
        <>
            <h1 style={styles.h1Font}>{data.title}</h1>
            <div style={styles.displayRow}>
                <div style={styles.displayCard}>
                    {(data.imageURL != null) ? <img src={data.imageURL} alt="Book Display" style={{ ...styles.profilePic, height: 'auto' }} /> : <div ></div>}
                </div>
                <div style={{ marginLeft: 15 }}>
                    {<h1 style={{ ...styles.textBold, fontSize: '1em' }}>Author: {data.author}</h1>}
                    {<h1 style={{ ...styles.textBold, fontSize: '1em' }}>Year: {(data.year) ? data.year : '-'}</h1>}
                    {<h1 style={{ ...styles.textBold, fontSize: '1em' }}>Genre: {(data.genreId) ? data.Genre.genre : '-'}</h1>}
                </div>
            </div>
        </>
    );
};

export default ShowBookInfo;