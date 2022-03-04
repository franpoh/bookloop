import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import bookAPI from '../../API/book-api';

import MyButton from "../../components/button";
import '../../styling/colours.js';
import styles from '../../styling/style-sheet';

import removeBookfromWishList from './/remove-book-wishlist';
import addBooktoWishList from './/add-book-wishlist';

// icons?? images replacements? emojis?

//mock place data
import { swapReviewMerged } from '../../test-data';
// let userA = {};
// let swapReviewMerged = {};

function BookDetails() {

    const { index } = useParams();

    console.log('URL useParams: ', index);

    // need index from data
    let indexId = parseInt(index);
    
    const [ matchIndex, updateMatchIndex] = useState({});
    const [ user, setUser ] = useState('')
    const [ userToken, setUserToken] = useState(false); // for controlling display for non-login
    const [userWishlist, updateUserWishlist] = useState([]);
    const [currentBookWish, updateCurrentBookWish] = useState(false); // for toggling button status

    // trigger on "component mount"
    useEffect(() => {
        retrieveBookDetails();
        retrieveUser();
        // retrieveAll();
    }, []);

    // trigger on user update
    useEffect(() => {        
        if (user !== '') {
            setUserToken(true);
            updateUserWishlist(user.wishlist);
        };
    }, [user]);

    useEffect(() => {
        // check if already in wishlist
        let xx;        
        for (xx = 0; xx < userWishlist.length; xx++) {
            if (userWishlist[xx] === indexId) {
            console.log('book is already in wishlist');
            updateCurrentBookWish(true);
            } else {
                console.log('book is NOT in wishlist', indexId, userWishlist[xx]);
            };
        };
    }, [userWishlist]);

    // try catch for fetch book info
    async function retrieveBookDetails() {
        try {
            const result = await bookAPI.get(`/general/detail?bookID=${indexId}`);

            console.log(result.data);            
            console.log(result.data.data.title);

            updateMatchIndex(result.data.data);
            // updateMatchIndex({...matchIndex, ...result.data.data});
        } catch (error) {
            console.log('Book Detail error: ', error);
        };
    };

    // try catch for user info if avail
    async function retrieveUser() {
        try {
            const result = await bookAPI.get('/protected/viewprofile');

            console.log('user: ', result.data.data);
            if (result.data.data.user.wishlist === null) { result.data.data.user.wishlist = [] };
            setUser(result.data.data.user); // Comment this out to test no login

        } catch (error) {
            console.log('User info error', error);
        }
    };

    // G1 test
    // async function retrieveAll() {
    //     try {
    //         const result = await bookAPI.get('/protected/getusers');

    //         console.log('All user: ', result.data.data);

    //     } catch (error) {
    //         console.log('User info error', error);
    //     };
    // };
    

    // need userid
    
    // const [localUser, updateLocalUser] = useState(userA);

    // need swap
    let localSwapBooks = swapReviewMerged;

    
    

    // user.points = 0; // for testing when points unable to purchase books

    

    // const matchIndex = localIndexBooks.filter(data => data.indexId === indexId);
    // const matchSwap = localSwapBooks.filter(data => (data.indexId === indexId && data.availability === 'YES')); // check swap for YES/NO

    const [matchSwap, updateMatchSwap] = useState(localSwapBooks.filter(data => (data.indexId === indexId && data.availability === 'YES')));

    

    

    


    /////////
    function wishButton() {

        console.log("wishbutton, token: ", userToken);        

        if (userToken === false){            
            return;
        } else if (currentBookWish) {
            const updateWishlist = removeBookfromWishList({
                indexId: indexId,
                userWishlist: userWishlist
              });
            updateUserWishlist(updateWishlist);
            updateCurrentBookWish(false);
        } else if (!currentBookWish) {
            const updateWishlist = addBooktoWishList({
                indexId: indexId,
                userWishlist: userWishlist
              });            
            updateUserWishlist(updateWishlist);
            updateCurrentBookWish(true);
        };


        return (
            <h2>wishbutton</h2>
        )
    };

    /////////
    function uploadReviewButton() {

        console.log("uploadReviewButton");

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

    
    // matchIndex.imageURL = null; // for testing when book has no imageURL

    return(
        <div style={styles.containerAlt}>
            <h1 style={styles.h1Font}>{matchIndex.title}</h1>
            <div style={styles.displayRow}>
                <div style={styles.displayCard}>
                    {(matchIndex.imageURL != null) ? <img src={matchIndex.imageURL} alt="Book Display" style={{...styles.profilePic, height: 'auto' }} /> : <div ></div> }
                </div>                
                <div style={{ marginLeft: 15 }}>
                    {<h1 style={{...styles.textBold, fontSize: '1em' }}>Author: {matchIndex.author}</h1>}
                    {<h1 style={{...styles.textBold, fontSize: '1em' }}>Year: {(matchIndex.year)?matchIndex.year:'-'}</h1>}
                    {<h1 style={{...styles.textBold, fontSize: '1em' }}>Genre: {(matchIndex.genreId)?matchIndex.genreId:'-'}</h1>}
                </div>
            </div>
            <hr style={styles.divider}/>

            <div style={{ position: 'relative',top: '-3vh', opacity: userToken ? 1 : 0.4 }}>
                <h3 style={styles.textNormal}>Current available points: {(userToken) ? user.points : 'You are not logged in..' } {userToken? 'True':'False' }</h3>
                <div style={styles.containerRow}>
                <MyButton name={currentBookWish?"Now in Wishlist" : "Add to Wishlist"}
                currentBookWish
                    type={"button"}
                    handle={
                        () => wishButton()
                    }
                />
                <MyButton name={"Upload Review"}
                    type={"button"}
                    handle={
                        () => uploadReviewButton()
                    }
                />
                </div>
                {/* <WishButton /> */}
                {/* <UploadReviewButton /> */}
            </div>

            
            
            {/* div style to check swap.length to show display as none or inline */}
            <hr style={{...styles.divider, position: 'relative',top: '-3vh'}}/>
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