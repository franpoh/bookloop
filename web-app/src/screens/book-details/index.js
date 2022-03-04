import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import bookAPI from '../../API/book-api';

import '../../styling/colours.js';
import '../../styling/styles.css';
import styles from '../../styling/style-sheet';

// icons?? images replacements? emojis?

//mock place data
import { userA, indexBooks, swapReviewMerged } from '../../test-data';
// let userA = {};
// let swapReviewMerged = {};
let userToken = false;

function BookDetails( data ) {

    const {state } = useLocation();
    console.log('TESTING>>>>>>>>', state);

    const { index } = useParams();

    console.log('useParams: ', index);

    // need index from data
    let indexId = 2;
    
    
    const [ matchIndex, updateMatchIndex] = useState({});
    const [ user, setUser ] = useState('')

    useEffect(() => {
        retrieveBookDetails();
        retrieveUser();
        retrieveAll();
        if (user != '') {
            userToken = true;            
        };
        console.log('token: ', userToken);
    }, []);

    // try catch for fetch book info
    async function retrieveBookDetails() {
        try {
            const result = await bookAPI.get(`/general/detail?bookID=${indexId}`);

            console.log(result.data);            
            console.log(result.data.data.title);

            updateMatchIndex({...matchIndex, ...result.data.data});
        } catch (error) {
            console.log('Book Detail error: ', error);
        };
    };

    ////////////////////////////////////////
    // try catch for user info if avail
    async function retrieveUser() {
        try {
            const result = await bookAPI.get('/protected/viewprofile');

            console.log('user: ', result.data.data);

        } catch (error) {
            console.log('User info error', error);
        }
    };

    // G1 test
    async function retrieveAll() {
        try {
            const result = await bookAPI.get('/protected/getusers');

            console.log('All user: ', result.data.data);

        } catch (error) {
            console.log('User info error', error);
        };
    };
    // let p = new Promise(async (resolve) => {
    //     let result = await bookAPI.get('/protected/viewprofile');
    //     let { data } = result;
    //     let user = data.data;
    //     resolve(user);
    // })
    
    // p.then((res) => {
    //     setUser(res.username);
    // });

    // console.log("Test", user);  
    ////////////////////////////////////////


    // need userid
    const [localUser, updateLocalUser] = useState(userA);

    // need swap
    let localSwapBooks = swapReviewMerged;

    
    

    // localUser.points = 0; // for testing when points unable to purchase books

    if (localUser.wishlist === null) { localUser.wishlist = [] };

    // const matchIndex = localIndexBooks.filter(data => data.indexId === indexId);
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

    if (matchIndex.indexId) {
    console.log('image url', matchIndex.imageURL)} else console.log('index empty');
    // matchIndex.imageURL = null; // for testing when book has no imageURL

    return(
        <div style={styles.displayArea}>
            <h1>{matchIndex.title}</h1>
            <div style={styles.displayRow}>
                <div style={styles.displayCard}>
                    {(matchIndex.imageURL != null) ? <img src={matchIndex.imageURL} style={{ height: 'auto', width:'100%' }} /> : <div ></div> }
                </div>                
                <div style={{ marginLeft: 15 }}>
                    {<h1 style={{...styles.textNormal, fontSize: '1em' }}>Author: {matchIndex.author}</h1>}
                    {<h1 style={{...styles.textNormal, fontSize: '1em' }}>Year: {(matchIndex.year)?matchIndex.year:'-'}</h1>}
                </div>
            </div>
            <hr style={styles.divider}/>

            <div style={{ opacity: userToken ? 1 : 0.4 }}>
                <h3 style={styles.textNormal}>Current available points: {(userToken) ? user.points : 'You are not logged in..' }</h3>
                <WishButton />
                <UploadReviewButton />    
            </div>

            
            
            {/* div style to check swap.length to show display as none or inline */}
            <hr style={styles.divider}/>
            <div>
                <DisplaySwapInventory />
                <DisplaySwapInventory />
                <DisplaySwapInventory />
                <DisplaySwapInventory />
                <DisplaySwapInventory />
                <DisplaySwapInventory />
                <DisplaySwapInventory />
                <DisplaySwapInventory />
            </div>


        </div>
        
    )
};

export default BookDetails;