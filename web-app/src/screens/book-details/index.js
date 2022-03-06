import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import bookAPI from '../../API/book-api';

import MyButton from "../../components/button";
import styles from '../../styling/style-sheet';
import colours from '../../styling/colours.js';

import removeBookfromWishList from './/remove-book-wishlist';
import addBooktoWishList from './/add-book-wishlist';
import grabABook from './/grab-book';

// icons?? images replacements? emojis?

function BookDetails() {

    const { index } = useParams();

    console.log('URL useParams: ', index);

    // need index from data
    let indexId = parseInt(index);
    
    const [ matchIndex, updateMatchIndex ] = useState({});
    const [ user, setUser ] = useState('')
    const [ userToken, setUserToken ] = useState(false); // for controlling display for non-login
    const [ userWishlist, updateUserWishlist ] = useState([]);
    const [ currentBookWish, updateCurrentBookWish ] = useState(false); // for toggling button status
    const [ matchSwap, updateMatchSwap ] = useState([]);

    // trigger on "component mount"
    useEffect(() => {
        retrieveBookDetails();
        retrieveUser();
        retrieveSwap();        
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
            // console.log('book is already in wishlist');
            updateCurrentBookWish(true);
            } else {
                // console.log('book is NOT in wishlist', indexId, userWishlist[xx]);
            };
        };
    }, [userWishlist]);

    // try catch for fetch book info
    async function retrieveBookDetails() {
        try {
            const result = await bookAPI.get(`/general/detail?bookID=${indexId}`);

            console.log(result.data);
            console.log(result.data.data[0].title);

            updateMatchIndex(result.data.data[0]);
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
        return;
    };

    // try catch for related swap data
    async function retrieveSwap() {
        try {
            const result = await bookAPI.get(`/general/searchSwap?indexId=${indexId}`);

            console.log(result.data);
            console.log('retr Swap by Index: ', result.data.data);
            
            updateMatchSwap(result.data.data);
        } catch(error) {
            console.log('retr Swap by Index error', error);
        };
        return;
    };


    /////////////////////////////////////
    // G1 test
    async function retrieveAll() {
        try {
            const result = await bookAPI.get('/protected/getusers?swapId=33');

            console.log('All user: ', result.data.data);

        } catch (error) {
            console.log('User info error', error);
        };
    };
    /////////////////////////////////////

    
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
        return;
    };

    /////////
    function uploadReviewButton() {

        console.log("uploadReviewButton");

        return;
    };

    function DisplaySwapInventory() {

        if (matchSwap.length === 0) {
            return(
                <div></div>
            );
        };

        return matchSwap.map((swapItem, index) => {
            // console.log(swapItem, index);
            return (
                // <div style={styles.containerRowList}>
                <div key={swapItem.data.swapId} style={{...styles.containerRowList, lineHeight:'1'}}>
                    <a title="Click to buy item" /* href="#" */
                    onClick={async () => {
                        if (!userToken) { // block if no token
                            return;
                        };
                        if (user.points < swapItem.data.price) { // check for enough points
                            alert('You do not have enough points');
                            return;
                        };
                        // eslint-disable-next-line no-restricted-globals
                        let buyConfirm = confirm(`Confirm purchase of ${matchIndex.title}, serial ${swapItem.data.swapId}`);

                        if (!buyConfirm) {
                            console.log('confirm: ', buyConfirm);
                            return;
                        };

                        // start grab process
                        let grabProcess = await grabABook({
                            swapId: swapItem.data.swapId,
                        });

                        console.log('this should only trigger after grab component finish', grabProcess.status);

                        if (grabProcess.status === 'Grab Fail' || grabProcess.status === 'Unknown Error') { // failed transaction
                            console.log('Grab error:', grabProcess.status);
                            return;
                        };

                        if (grabProcess.status === 'Grab Done') { // transaction complete
                            
                            retrieveSwap(); // trigger fresh pull from swap for index book
                            retrieveUser(); // same for user points

                            // trigger remove index from user wishlist if valid
                            console.log('index vs wishlist: ', userWishlist.includes(indexId));
                            if (userWishlist.includes(indexId)) {
                                console.log('also removing from wishlist');
                                const updateWishlist = removeBookfromWishList({
                                    indexId: indexId,
                                    userWishlist: userWishlist
                                  });
                                updateUserWishlist(updateWishlist);
                                updateCurrentBookWish(false);
                            };
                            return;
                        };
                        return;
                    }}
                    style={{
                        ...styles.textBox, 
                        textDecoration: 'none',
                        height:'auto',
                        width:'35vw',
                        backgroundColor: colours.baseWhite
                    }}
                    >
                    
                        <div style={{ justifyContent:'space-between', display: 'flex' }}>
                            <h3 style={{...styles.textBold, fontSize:'0.7em', color: colours.baseDark}}>(Serial {swapItem.data.swapId}) By user: {swapItem.username}</h3> 
                            <h3 style={{...styles.textBold, fontSize:'0.7em', color: colours.baseDark}}>Cost: {swapItem.data.price}</h3> 
                        </div>
                        <div>
                            <h3 style={{...styles.textBold, fontSize:'0.7em', color: colours.baseDark}}>Condition:</h3>
                            {(swapItem.data.comments !== null ) ? 
                                <h3 style={{ ...styles.textBold, fontSize:'.7em'}}>{swapItem.data.comments}</h3> 
                                : 
                                <h3 style={{ ...styles.textBold, fontSize:'.7em', color:'red'}}>USER DID NOT PROVIDE COMMMENT</h3>}
                        </div>                            
                    </a>
                </div>
            )
        });
    };

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
                    {<h1 style={{...styles.textBold, fontSize: '1em' }}>Genre: {(matchIndex.genreId)?matchIndex.Genre.genre:'-'}</h1>}
                </div>
            </div>
            <hr style={styles.divider}/>

            <div style={{ position: 'relative',top: '-3vh', opacity: userToken ? 1 : 0.4 }}>
                <h3 style={{...styles.textNormal, fontSize: '1em'}}>Current available points: {(userToken) ? user.points : 'You are not logged in..' }</h3>
                <div style={{...styles.containerRow, width:'85%'}}>
                    <MyButton name={currentBookWish?"Now in Wishlist" : "Add to Wishlist"}
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
            </div>

            <hr style={{...styles.divider, position: 'relative',top: '-3vh'}}/>

            <div style={{ position: 'relative',top: '-6vh', opacity: userToken ? 1 : 0.4 }}>
                <h3 style={{...styles.textBold, fontSize: '1em'}}>Inventory available: {matchSwap.length}</h3>
                {matchSwap.length > 0 ? <DisplaySwapInventory /> : <div></div>}
            </div>
        </div>
    )
};

export default BookDetails;