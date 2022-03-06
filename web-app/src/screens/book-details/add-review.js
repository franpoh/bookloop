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
            {(data.length === 0) ? <p><i>No reviews yet.</i></p>: <div></div>}
            {(data.length > 0) && data.map((item) => {
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

const ReviewInputDialog = (props) => {

    const container = useRef(null);

    const [submit, setSubmit] = useState();
    // const [isLoading, setIsLoading] = useState(false); // for user perception
    const [reviewInput, setreviewInput] = useState("");

    useEffect(() => {
        // addReview();
        // setIsLoading(true); // for user perception
    }, [])



    console.log('review input params: ', props.data, props.user, props.index)

    if (!props.user) { // this allows reuse of parent userId under user useState
        return <div></div>;
    };
    
    // above console log at start would show false, no. of userId, no. of indexId, not keys
    const getindex = props.index;
    // const getuser = user;

    const addReview = async () => { //  no props ............. move to another file?
        console.log("Fetching items from API....");
        try {
            // const addRev = await authWrapper(bookAPI.post(`/protected/${getindex}/addReview`, {
            //     // userId: getuser,
            //     rev: { reviewInput }
            // }));
            console.log('right before submitting review: ', reviewInput );
            
            const addRev = await bookAPI.post(`/protected/addReview`, {
                indexId: getindex,
                rev: reviewInput
            });
            console.log('Results of AddReview: ', addRev.data);

            // return addRev.data.data.review;
            
            // after successful submission, clear text input, reset review button
            setreviewInput("");
            let status = true;
            props.passToReviewButton({status});

        } catch (err) {
            console.log("You have an error: ", err);
        } finally {
            // setIsLoading(false); // for user perception  
        }
    };

    

    const handleSubmit = () => {
        addReview();
    }

    const inputHandler = (event) => {
        setreviewInput(event.target.value);
    }


    return (
        <>
            <Box sx={{ width: "85%" }} ref={container}>{props.data ? (
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
