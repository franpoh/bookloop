import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styling/style-sheet"
import "../../styling/style.css"
import colours from "../../styling/colours";
import bookAPI from "../../API/book-api";
import { Portal, TextField, Box } from '@mui/material';

// used for iteration instead in retrieveReview() 
const ListReviews = ({ data }) => {
    return (
        <>
            {data && data.map((item) => {
                return (
                    <div key={item.reviewId}>
                        <div>
                            <p>{item.review}</p>
                        </div>
                    </div>
                )
            })}
        </>

    )
}

const ReviewInput = ({ data }) => {

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
    ReviewInput,
    AddReviewButton
};
