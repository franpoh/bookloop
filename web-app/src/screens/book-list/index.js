import React, { useState, useEffect } from 'react';
import styles from "../../styling/style-sheet"
import "../../styling/style.css"
import colours from "../../styling/colours";
import TextField from "@mui/material/TextField";
// import Autocomplete from '@mui/material/Autocomplete';
import bookAPI from "../../API/book-api";
// import Title from "./title";
// import { useLoading, Audio } from '@agney/react-loading';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


const BookList = () => {

    const [title, setTitle] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const searchHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const retrieve = async () => {
        console.log("Fetching items from API Swap Index....");
        await bookAPI.get(`general/searchIndex`)
            .then(res => {
                console.log("recieves these..:", res.data.data);
                setTitle(res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("You have an error: ", err);
            })

    }

    useEffect(() => {
        retrieve();
        console.log("useEffect")
    }, [])

    // loading animation
    // const { containerProps, indicatorEl } = useLoading({
    //     loading: true,
    //     indicator: <Audio width="50" />,
    // });
    return (
        <>
            <h1 style={styles.h1Font}>BookList</h1>
            <div>

                <TextField
                    style={{ ...styles.searcher, width: "45vw" }}
                    id="standard-basic"
                    varient="standard"
                    placeholder="Search books"
                    value={searchInput}
                    onChange={searchHandler.bind(this)}
                />

                <div>

                    {isLoading ? "Loading" : searchInput ?
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
                                        </Grid>

                                    </Grid>
                                </div>
                            )
                        })) : (title.map((item, key) => {
                            return (
                                <div style={styles.bookList} key={key}>
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
