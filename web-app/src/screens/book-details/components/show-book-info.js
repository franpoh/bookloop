// libraries
import React from 'react';

// styling
import styles from "../../../styling/style-sheet.js";

// assets
const noImage = require("../../../assets/no-image.png");

function ShowBookInfo ({ data }) {

    return (
        <>
            <h1 style={styles.h1Font}>{data.title}</h1>
            <div style={styles.displayRow}>
                <div style={styles.displayCard}>
                    <img src={data.imageURL ? data.imageURL : noImage} alt="Book Display" style={{ ...styles.profilePic, height: 'auto' }} />                    
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