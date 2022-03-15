// libraries
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import authWrapper from "../../components/auth_wrapper";
import DialogAlert from '../../components/dialog-alert';
import DialogConfirm from '../../components/dialog-confirm';

// styling
import MyButton from "../../components/button";
import styles from '../../styling/style-sheet';

// folder sub-components
import ShowBookInfo from './components/show-book-info';
import DisplaySwapInventory from './components/display-swap';
import { handleConfirmYes } from './components/grab-book';
import { ListReviews, ReviewInputDialog } from "./components/add-review";
import { wishButton, uploadReviewButton } from './components/handle-buttons';
import { retrieveBookDetails, retrieveUser, retrieveSwap, retrieveReview } from "./components/retrieve-data";

// icons?? images replacements? emojis?

function BookDetails() {

    const { index } = useParams();
    console.log('URL useParams: ', index);
    let indexId = parseInt(index);

    // data from DBs
    const [user, setUser] = useState('');
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
        retrieveBookDetails({
            indexId: indexId,
            passUpdateMatchIndex: updateMatchIndex
        });
        retrieveUser({
            passSetUser: setUser
        });
        retrieveSwap({
            indexId: indexId,
            passUpdateMatchSwap: updateMatchSwap
        });
        retrieveReview({
            indexId: indexId,
            passSetReviews: setReviews
        });
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

    return (
        <div style={styles.containerAlt}>

            <ShowBookInfo data={matchIndex} />

            <hr style={styles.divider} />

            <DialogAlert
                open={toggleAlert}
                onClick={() => setToggleAlert(false)}
                bodytext='You do not have enough points.'
                buttonLabel='Ok'
            />

            <DialogConfirm
                open={toggleConfirm.status}
                bodytext={toggleConfirm.bodytext}
                onClickA={() => setToggleConfirm({
                    status: false,
                    swapId: null
                })}
                // onClickA={handleConfirmCancel}
                buttonLabelA='Cancel'
                onClickB={() => handleConfirmYes({
                    toggleConfirm: toggleConfirm,
                    passSetToggleConfirm: setToggleConfirm,
                    passRetrieveSwap: retrieveSwap,
                    passRetrieveUser: retrieveUser,
                    userWishlist: userWishlist,
                    indexId: indexId,
                    passUpdateUserWishlist: updateUserWishlist,
                    passUpdateCurrentBookWish: updateCurrentBookWish,
                    passUpdateMatchSwap: updateMatchSwap,
                    passSetUser: setUser
                })}
                buttonLabelB='Confirm'
            />

            <div style={{ position: 'relative', top: '-1vh', opacity: userToken ? 1 : 0.4 }}>
                <h3 style={{ ...styles.textNormal, fontSize: '1em' }}>Current available points: {(userToken) ? user.points : 'You are not logged in..'}</h3>
                <div style={{ ...styles.containerRow, width: '85%' }}>
                    <MyButton name={currentBookWish ? "Now in Wishlist" : "Add to Wishlist"}
                        type={"button"}
                        handle={
                            () => wishButton({
                                userToken: userToken,
                                indexId: indexId,
                                currentBookWish: currentBookWish,
                                passUpdateCurrentBookWish: updateCurrentBookWish,
                                passUpdateUserWishlist: updateUserWishlist
                            })
                        }
                    />
                    <MyButton name={show ? "Input Review Upload" : "Upload Review"}
                        type={"button"}
                        handle={
                            () => uploadReviewButton({
                                userToken: userToken,
                                show: show,
                                passRetrieveReview: retrieveReview,
                                passSetShow: setShow,
                                passSetReviews: setReviews,
                                indexId: indexId
                            })
                        }
                    />

                </div>
            </div>

            <div style={{ position: 'relative', top: '3vh' }}>
                <ReviewInputDialog show={show} user={(userToken) ? user.userId : false} indexId={indexId} passToReviewButton={uploadReviewButton} passRetrieveReview={retrieveReview} passSetShow={setShow} passSetReviews={setReviews} />
            </div>

            <hr style={{ ...styles.divider, position: 'relative', top: '3vh' }} />

            <div style={{ position: 'relative', top: '2vh', opacity: userToken ? 1 : 0.4 }}>
                <DisplaySwapInventory matchSwap={matchSwap} userToken={userToken} user={user} passToggleAlert={setToggleAlert} passToggleConfirm={setToggleConfirm} matchIndex={matchIndex} />
            </div>

            <hr style={{ ...styles.divider, position: 'relative', top: '1vh' }} />

            <div style={{ position: 'relative', top: '0vh' }}>
                <ListReviews data={reviews} />
            </div>
        </div>
    )
};

export default BookDetails;