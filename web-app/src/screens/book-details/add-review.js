import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styling/style-sheet"
import "../../styling/style.css"
import colours from "../../styling/colours";
import bookAPI from "../../API/book-api";
import { Portal, TextField, Box } from '@mui/material';
import MyButton from "../../components/button";
import authWrapper from "../../components/auth_wrapper"


const ListReviews = ({ data }) => {
    return (
        <>
            <h3 style={{ ...styles.textBold, fontSize: '1em' }}>Community Reviews</h3>
            {data && data.map((item) => {
                return (
                    <div key={item.reviewId}>
                        <div>

                            <p style={{ color: `${colours.baseDark}` }}><i><b>{item.User.username}</b> : {item.review}</i></p>
                        </div>
                    </div>
                )
            })}
        </>

    )
}

const ReviewInputDialog = ({ data, user, index }) => {

    const container = useRef(null);

    const [submit, setSubmit] = useState();
    // const [isLoading, setIsLoading] = useState(false); // for user perception
    const [reviewInput, setreviewInput] = useState("");
    const getindex = index;
    const getuser = user;

    const addReview = async () => { //  no props ............. move to another file?
        console.log("Fetching items from API....");
        try {
            const addRev = await authWrapper(bookAPI.post(`/protected/${getindex}/addReview`, {
                userId: getuser,
                rev: reviewInput
            }));
            return addRev.data.data.review;
        } catch (err) {
            console.log("You have an error: ", err);
        } finally {
            // setIsLoading(false); // for user perception  
        }
    };

    useEffect(() => {
        addReview();
        // setIsLoading(true); // for user perception
    }, [])

    const handleSubmit = () => {
        addReview();
    }

    const inputHandler = (event) => {
        setreviewInput(event.target.value);
    }


    return (
        <>
            <Box sx={{ width: "85%" }} ref={container}>{data ? (
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
                            () => handleSubmit()
                        }
                    />
                </Portal>
            ) : null} </Box>
        </>

    )
}

const AddReviewButton = ({ data }) => {

    return (
        <>
            {/* {data && data.map((item, key) => {
                return (
                    <div key={key}>
                        <div>
                            <p>{item.Index.title}</p>
                            <img alt="covers" style={{ width: 100, height: 150 }} src={item.Index.imageURL} />
                        </div>
                    </div>
                )
            })} */}
        </>

    )
}

export {
    ListReviews,
    ReviewInputDialog,
    AddReviewButton
};
