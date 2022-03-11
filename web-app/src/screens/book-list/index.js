import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from "../../styling/style-sheet";
import "../../styling/style.css"
import colours from "../../styling/colours";
import bookAPI from "../../API/book-api";
// import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import ListAllBooks from './components/list-all-books';

import {
    LinearProgress,
    Grid,
    Box,
    TextField,
    CircularProgress
} from '@mui/material';

const noImage = require("../../assets/no-image.png")

const BookList = () => {

    const [title, setTitle] = useState([]);             // library equivalent
    const [searchInput, setSearchInput] = useState(""); // bookTitle, setBookTitle equiv
    const [isLoading, setIsLoading] = useState(false);  //unnecs
    // const [message, isMessage] = useState("Testing")

    const navigate = useNavigate();

    const retrieve = async () => {
        try {
            await bookAPI.get(`general/searchIndex`)
                .then(res => {
                    // console.log("Fetching items from API....", res)
                    setTitle(res.data.data);
                });
        } catch (err) {
            console.log("You have an error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // setTimeout(() => { // remove in finale
        //     console.log("Delaying for testing");
        retrieve();
        // }, 500);
        setIsLoading(true);
        console.log("API called retrieve()")
    }, [])

    const searchHandler = (event) => {
        console.log(event.target.value);
        setSearchInput(event.target.value);
    }

    return (
        <>

            <h1 style={styles.h1Font}>BookList</h1>
            <h3 className="icon"
                style={styles.h2Font}
                onClick={() => {
                    navigate(`/library`)
                }}> + Browse the entire collection</h3>

            <div>

                <TextField
                    style={{ ...styles.searcher, width: "45vw" }}
                    id="standard-basic"
                    varient="standard"
                    placeholder="Search for more books available"
                    value={searchInput}
                    onChange={searchHandler.bind(this)}
                // InputProps={{
                //     endAdornment: <CollectionsBookmarkOutlinedIcon fontSize='large' color='disabled'
                //         onClick={() => {
                //             navigate(`/library`)
                //         }}
                //         className="icon"
                //     />
                // }}
                />

                <div>
                    {!searchInput ? <h3 style={styles.h2Font}>Here are a few uploads from the users</h3> : <></>}
                    {isLoading ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress color="success" />
                        </Box>
                        /* ref: refactor as Fn for filter({}).map({}) */
                        : searchInput ?
                            (searchInput === " " ? <i>No books found for " "</i> : title && title.filter(data => {
                                if (searchInput === "") {
                                    // return data
                                } else if (data.title.toLowerCase().includes(searchInput.toLowerCase())) {
                                    return data;
                                }
                            }).map((item, key) => {
                                return (
                                    <div style={styles.bookList} key={uuidv4()}>
                                        <Grid
                                            container spacing={0.5}
                                            onClick={() => {
                                                navigate(`/bookdetails/${item.indexId}`)
                                            }}
                                        >

                                            <Grid item sm={5} lg={4}>
                                                <img alt="covers" style={styles.profileBookPics} src={item.imageURL ? item.imageURL : noImage} />
                                            </Grid>
                                            <Grid item sm={6} lg={4}>
                                                <p style={styles.textBold}>{item.title}</p>
                                                <p style={{ color: `${colours.baseDark}` }}><i>by {item.author}</i></p>
                                            </Grid>

                                        </Grid>
                                    </div>
                                )
                            })) : (title.slice(0, 10).map((item, key) => {
                                return (

                                    <div style={{ ...styles.bookList, marginBottom: 10 }} key={uuidv4()}>
                                        <Grid
                                            container spacing={0.5}
                                            onClick={() => {
                                                navigate(`/bookdetails/${item.indexId}`)
                                            }}
                                        >

                                            <Grid item sm={5} lg={4}>
                                                <img alt="Missing Image" style={{ width: 150, height: 200 }} src={item.imageURL ? item.imageURL : noImage} />
                                            </Grid>
                                            <Grid item sm={6} lg={4}>
                                                <p style={styles.textBold}>{item.title}</p>
                                                <p style={{ color: `${colours.baseDark}` }}><i>by {item.author}</i></p>
                                            </Grid>

                                        </Grid>
                                    </div>

                                )
                            }))
                    }

                </div>

            </div>
        </>
    )
}


export default BookList;

