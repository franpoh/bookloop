import React, { useState, useRef, useEffect } from 'react';
import styles from "../../../styling/style-sheet"
import "../../../styling/style.css"
import colours from "../../../styling/colours";
import bookAPI from "../../../API/book-api";
import { Portal, TextField, Box } from '@mui/material';
import MyButton from "../../../components/button";
import DialogAlert from '../../../components/dialog-alert';


const ListReviews = ({ data }) => {
    return (
        <>
            <h3 style={{ ...styles.textBold, fontSize: '1em' }}>Community Reviews</h3>
            {(data.length === 0) ? <p><i>No reviews yet.</i></p> : <div></div>}
            {(data.length > 0) && data.map((item) => {
                return (
                    <div style={{ width: "85%" }} key={item.reviewId}>
                        <div>
                            <p style={{ color: `${colours.baseDark}` }}><i><b>{item.User.username}</b> : {item.review}</i></p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}


const ReviewInputDialog = (props) => {

    const container = useRef(null);

    // const [isLoading, setIsLoading] = useState(false); // for user perception
    const [reviewInput, setreviewInput] = useState("");
    const [toggleAlertReview, setToggleAlertReview] = useState(false);

    useEffect(() => {
        // setIsLoading(true); // for user perception
    }, [])

    console.log('review input params: ', props.show, props.user, props.indexId)

    if (!props.user) { // this allows reuse of parent userId under user useState
        return <div></div>;
    };

    // above console log at start would show false, no. of userId, no. of indexId, not keys
    const getindex = props.indexId;

    const addReview = async () => {

        // block if rev string is empty
        if (reviewInput === '') {
            console.log('empty string caught');
            setreviewInput("");
            let status = false; // so that Community reviews refresh is not triggered
            props.passToReviewButton({
                status: status,
                show: props.show,
                passRetrieveReview: props.passRetrieveReview,
                passSetShow: props.passSetShow,
            });
            return;
        };

        console.log("Fetching items from API....");

        try {
            console.log('right before submitting review: ', reviewInput);

            const addRev = await bookAPI.post(`/protected/addReview`, {
                indexId: getindex,
                rev: reviewInput
            });
            console.log('Results of AddReview: ', addRev.data);

            // after successful submission, clear text input, reset review button
            setreviewInput("");
            let status = true;
            props.passToReviewButton({
                indexId: getindex,
                status: status,
                show: props.show,
                passRetrieveReview: props.passRetrieveReview,
                passSetShow: props.passSetShow,
                passSetReviews: props.passSetReviews,
            });

        } catch (err) {
            console.log("You have an error: ", err);
        } finally {
            // setIsLoading(false); // for user perception  
        }
    };

    const cancelReview = async () => {

        // block if rev string is empty
        // if (reviewInput === '') { 
        console.log('empty string caught');
        setreviewInput("");
        let status = false; // so that Community reviews refresh is not triggered
        props.passToReviewButton({
            status: status,
            show: props.show,
            passRetrieveReview: props.passRetrieveReview,
            passSetShow: props.passSetShow,
        });
        // return;
        // };
    }

    const handleSubmit = () => {
        addReview();
    }

    const handleCancel = () => {
        cancelReview();
    }

    const inputHandler = (event) => {
        setreviewInput(event.target.value);
    }

    function handleAlertClose() {
        setToggleAlertReview(false);
    };

    return (
        <>
            <DialogAlert
                open={toggleAlertReview}
                onClick={handleAlertClose}
                bodytext='Review has been added!'
                buttonLabel='Ok'
            />

            <Box sx={{ width: "85%", marginTop: "-3vh" }} ref={container}>{props.show ? (
                <Portal container={container.current}>
                    <TextField
                        id="standard-basic"
                        label="Add your review here"
                        variant="filled"
                        multiline
                        minRows="3"
                        fullWidth
                        value={reviewInput}
                        onChange={inputHandler.bind(this)}
                    />
                    <MyButton
                        name="Submit"
                        handle={
                            () => {
                                handleSubmit()
                                if (reviewInput) {
                                    setToggleAlertReview(true)
                                }
                            }
                        }
                    />
                    <MyButton
                        name="Cancel"
                        handle={() => handleCancel()}
                    />
                </Portal>
            ) : null} </Box>
        </>

    )
}

export {
    ListReviews,
    ReviewInputDialog
};
