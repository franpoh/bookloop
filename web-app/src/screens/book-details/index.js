// libraries
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// internal global components
import bookAPI from '../../API/book-api';
// import authWrapper from "../../components/auth_wrapper";
import DialogAlert from '../../components/dialog-alert';
import DialogConfirm from '../../components/dialog-confirm';

// styling
import MyButton from "../../components/button";
import styles from '../../styling/style-sheet';
import colours from '../../styling/colours.js';

// folder sub-components
import ShowBookInfo from './components/show-book-info';
import removeBookfromWishList from './components/remove-book-wishlist';
import addBooktoWishList from './components/add-book-wishlist';
import DisplaySwapInventory from './components/display-swap';
import grabABook from './components/grab-book';
import { ListReviews, ReviewInputDialog } from "./components/add-review";

// icons?? images replacements? emojis?

function BookDetails() {

    const { index } = useParams();
    console.log('URL useParams: ', index);
    let indexId = parseInt(index);

    // data from DBs
    const [user, setUser] = useState('')
    const [matchIndex, updateMatchIndex] = useState({});
    const [matchSwap, updateMatchSwap] = useState([]);

    const [userToken, setUserToken] = useState(false); // for controlling display for non-login
    const [userWishlist, updateUserWishlist] = useState([]);
    const [currentBookWish, updateCurrentBookWish] = useState(false); // for toggling button status

    const [reviews, setReviews] = useState([]);
    const [show, setShow] = useState(false);
    const [toggleAlert, setToggleAlert] = useState(false);
    const [toggleConfirm, setToggleConfirm] = useState({
        status: false,
        swapId: null,
        bodytext: ''
    });

    // trigger on "component mount"
    useEffect(() => {
        retrieveBookDetails();
        retrieveUser();
        retrieveSwap();
        // retrieveAll(); // for testing only
        retrieveReview();
    }, []);

    // trigger on user update
    useEffect(() => {
        if (user !== '') {
            setUserToken(true);
            updateUserWishlist(user.wishlist);
        };
    }, [user]);

    // Update wishlist button, check if already in wishlist
    useEffect(() => {

        let xx;
        for (xx = 0; xx < userWishlist.length; xx++) {
            if (userWishlist[xx] === indexId) {
                updateCurrentBookWish(true);
            };
        };
    }, [userWishlist]);

    // try catch for fetch book info
    async function retrieveBookDetails() {
        try {
            const result = await bookAPI.get(`/general/detail?bookID=${indexId}`);

            console.log('Book Detail: ', result.data);
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
        };
    };

    // try catch for related swap data
    async function retrieveSwap() {
        try {
            const result = await bookAPI.get(`/general/searchSwap?indexId=${indexId}`);

            if (result.data.data.length === 0) {
                updateMatchSwap([]);
                console.log('retr Swap by Index is ZERO');
                return;
            } else {
                console.log('retr Swap by Index: ', result.data.data);
                updateMatchSwap(result.data.data);
                return;
            };
        } catch (error) {
            console.log('retr Swap by Index error', error);
        };
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


    async function wishButton() {

        console.log("wishbutton, token: ", userToken);

        if (userToken === false) {
            return;
        } else if (currentBookWish) {
            const updateWishlist = await removeBookfromWishList({
                indexId: indexId,
                // userWishlist: userWishlist
            });

            if (updateWishlist.data === null) { // if error in updating wishlist in DB
                return;
            };
            updateUserWishlist(updateWishlist);
            updateCurrentBookWish(false);
            return;

        } else if (!currentBookWish) {
            const updateWishlist = await addBooktoWishList({
                indexId: indexId,
                // userWishlist: userWishlist
            });

            if (updateWishlist.data === null) { // if error in updating wishlist in DB
                return;
            };
            updateUserWishlist(updateWishlist.data.wishlist);
            updateCurrentBookWish(true);
            return;
        };
        return;
    };

    /////////
    async function retrieveReview() {
        try {
            const result = await bookAPI.get(`/general/reviews?indexId=${indexId}`);

            if (result.data.data.length === 0) {
                setReviews([]);
                console.log('retr reviews by Index is ZERO');
                return;
            } else {
                console.log('retr reviews by Index: ', result.data.data);
                setReviews(result.data.data);
                return;
            };

        } catch (error) {
            console.log('retr reviews by Index error', error);
        };
    };

    function uploadReviewButton(data) {
        console.log("uploadReviewButton");
        if (userToken === false) { // halt process if not logined
            return;
        };

        if (data !== undefined) {
            if (data.status) {
                console.log('triggering refresh of all reviews');
                data.status = false; // reset status of addreview component
                retrieveReview();
            };
        };

        setShow(!show);
    };

    // control for Dialog-Alert
    function handleAlertClose() {
        setToggleAlert(false);
    };

    function handleConfirmCancel() {
        setToggleConfirm({
            status: false,
            swapId: null
        });
    };

    async function handleConfirmYes() {
        let submittingSwapId = toggleConfirm.swapId;
        setToggleConfirm({
            status: false,
            swapId: null,
            bodytext: ''
        });
        console.log('Submitting to grabbook', submittingSwapId);

        let grabProcess = await grabABook({
            swapId: submittingSwapId,
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
    };

    return (
        <div style={styles.containerAlt}>

            <ShowBookInfo data={matchIndex} />

            <hr style={styles.divider} />

            <DialogAlert
                open={toggleAlert}
                onClick={handleAlertClose}
                bodytext='You do not have enough points'
                buttonLabel='Ok'
            />

            <DialogConfirm
                open={toggleConfirm.status}
                bodytext={toggleConfirm.bodytext}
                onClickA={handleConfirmCancel}
                buttonLabelA='Cancel'
                onClickB={handleConfirmYes}
                buttonLabelB='Confirm'
            />

            <div style={{ position: 'relative', top: '-3vh', opacity: userToken ? 1 : 0.4 }}>
                <h3 style={{ ...styles.textNormal, fontSize: '1em' }}>Current available points: {(userToken) ? user.points : 'You are not logged in..'}</h3>
                <div style={{ ...styles.containerRow, width: '85%' }}>
                    <MyButton name={currentBookWish ? "Now in Wishlist" : "Add to Wishlist"}
                        type={"button"}
                        handle={
                            () => wishButton()
                        }
                    />
                    <MyButton name={show ? "Input Review Upload" : "Upload Review"}
                        type={"button"}
                        handle={
                            () => {
                                uploadReviewButton()
                            }
                        }
                    />

                </div>
            </div>

            <ReviewInputDialog data={show} user={(userToken) ? user.userId : false} index={indexId} passToReviewButton={uploadReviewButton} />

            <hr style={{ ...styles.divider, position: 'relative', top: '-2vh' }} />

            <div style={{ position: 'relative', top: '-5vh', opacity: userToken ? 1 : 0.4 }}>
                <DisplaySwapInventory matchSwap={matchSwap} userToken={userToken} user={user} passToggleAlert={setToggleAlert} passToggleConfirm={setToggleConfirm} matchIndex={matchIndex} />
            </div>

            <hr style={{ ...styles.divider, position: 'relative', top: '-3vh' }} />

            <div style={{ position: 'relative', top: '-6vh' }}>
                <ListReviews data={reviews} />
            </div>
        </div>
    )
};

export default BookDetails;