import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styling/style-sheet"
import "../../styling/style.css"
import colours from "../../styling/colours";
import bookAPI from "../../API/book-api";
import {
    LinearProgress,
    Grid,
    Box,
    TextField,
    CircularProgress
} from '@mui/material';


const BookList = () => {

    const [title, setTitle] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const searchHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const retrieve = async () => {
        console.log("Fetching items from API....");
        try {
            await bookAPI.get(`general/searchIndex`)
                .then(res => {
                    console.log("Fetching items from API....", res)
                    console.log("to read these..:", res.data.data);
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
        console.log("useEffect-ed")
    }, [])

    return (
        <>
            <h1 style={styles.h1Font}>BookList</h1>
            <div>

                <TextField
                    style={{ ...styles.searcher, width: "45vw" }}
                    id="standard-basic"
                    varient="standard"
                    placeholder="Search for more books available"
                    value={searchInput}
                    onChange={searchHandler.bind(this)}
                />

                <div>

                    {isLoading ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress color="success" />
                        </Box>
                        : searchInput ?
                            (title && title.filter(val => {
                                if (searchInput === " ") {

                                } else if (val.title.toLowerCase().includes(searchInput.toLowerCase())) {
                                    console.log("val returns:", val)
                                    return val;
                                }
                            }).map((item, key) => {
                                return (
                                    <div style={styles.bookList} key={key}>
                                        <Grid
                                            container spacing={0.5}
                                            onClick={() => {
                                                navigate(`/bookdetails/${item.indexId}`)
                                            }}
                                        >

                                            <Grid item sm={5} lg={4}>
                                                <img alt="covers" style={styles.profileBookPics} src={item.imageURL} />
                                            </Grid>
                                            <Grid item sm={6} lg={4}>
                                                <p style={styles.textBold}>{item.title}</p>
                                                <p style={{ color: `${colours.baseDark}` }}><i>by {item.author}</i></p>
                                            </Grid>

                                        </Grid>
                                    </div>
                                )
                            })) : (title.map((item, key) => {
                                return (
                                    <div style={{ ...styles.bookList, marginBottom: 10 }} key={key}>
                                        <Grid
                                            container spacing={0.5}
                                            onClick={() => {
                                                navigate(`/bookdetails/${item.indexId}`)
                                            }}
                                        >

                                            <Grid item sm={5} lg={4}>
                                                <img alt="covers" style={{ width: 150, height: 200 }} src={item.imageURL} />
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
