import React, { useState } from 'react';

import bookAPI from '../../API/book-api';

import '../../styling/colours.js';
import '../../styling/styles.css';
// import styles from '../../styling/style-sheet';

// icons?? images replacements? emojis?

//mock place data
import { userA, indexBooks, swapReviewMerged } from '../../test-data';
// let userA = {};
// let swapReviewMerged = {};
// let indexBooks = {};
let indexId = 1;

function BookDetails() {

    //try catch to verify if login
    try {

        const result = await bookAPI.get();
        
    } catch (error) {
        
    }


    // need userid
    const [localUser, updateLocalUser] = useState(userA);

    // need swap
    let localSwapBooks = swapReviewMerged;

    // need index
    let localIndexBooks = indexBooks;  
    

    // localUser.points = 0; // for testing when points unable to purchase books

    if (localUser.wishlist === null) { localUser.wishlist = [] };

    const matchIndex = localIndexBooks.filter(data => data.indexId === indexId);
    // const matchSwap = localSwapBooks.filter(data => (data.indexId === indexId && data.availability === 'YES')); // check swap for YES/NO

    const [matchSwap, updateMatchSwap] = useState(localSwapBooks.filter(data => (data.indexId === indexId && data.availability === 'YES')));

    const [userWishlist, updateUserWishlist] = useState(localUser.wishlist);

    // check if already in wishlist
    let xx;
    let wishYes = false;
    for (xx = 0; xx < userWishlist.length; xx++) {
        if (userWishlist[xx] === indexId) {
        console.log('book is already in wishlist');
        wishYes = true;
        ;
        };
    };

    const [currentBookWish, updateCurrentBookWish] = useState(wishYes);


    /////////
    function WishButton() {
        return (
            <h2>wishbutton</h2>
        )
    };

    /////////
    function UploadReviewButton() {
        return (
            <h2>UploadReviewButton</h2>
        )
    };

    /////////
    function DisplaySwapInventory() {
        return (
            <h2 style={{ ...styles.textNormal, fontWeight: 'normal' }}
            >DisplaySwapInventory test</h2>
        )
    };

    console.log(matchIndex[0].imageURL.uri);
    // matchIndex[0].imageURL = null; // for testing when book has no imageURL

    return(
        <div className='displayWindow'>
            <h1>{matchIndex[0].title} (Title of book here)</h1>
            <div className='displayRow'>
                <div className='displayCard' >
                    {(matchIndex[0].imageURL != null) ? <img src={matchIndex[0].imageURL.uri} /> : <div className='displayCard'></div> }
                </div>                
                <div className='displayCard' style={{ marginLeft: 15 }}>
                    <h1>details</h1>
                </div>
            </div>
            <WishButton />
            <UploadReviewButton />
            
            {/* div style to check swap.length to show display as none or inline */}
            <div>
                <DisplaySwapInventory />
            </div>


        </div>
        
    )
};

export default BookDetails;