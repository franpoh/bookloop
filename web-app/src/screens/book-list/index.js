import React, { useState, useEffect } from 'react';
import styles from "../../styling/style-sheet"
import colours from "../../styling/colours";
import TextField from "@mui/material/TextField";
// import Autocomplete from '@mui/material/Autocomplete';
import bookAPI from "../../API/book-api";
// import Title from "./title";
// import { useLoading, Audio } from '@agney/react-loading';


const BookList = () => {

    // const [book, setBook] = useState({
    //     title: "",
    //     image: ''
    // });
    const [title, setTitle] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [params, setParams] = useState("%20")

    const searchHandler = (event) => {
        setSearchInput(event.target.value);
        setParams(event.target.value)
    }

    const retrieve = async () => {
        console.log("Fetching items from API Swap Index....");
        await bookAPI.get(`general/searchIndex?title=${params}`)
            .then(res => {
                console.log(searchInput)
                console.log("recieves these..:", res.data.data);
                setTitle(res.data.data);
            })
            .catch(err => {
                console.log("You have an error: ", err);
            })

    }

    useEffect(() => {
        // setParams(searchInput)
        retrieve();
        console.log("useEffect")
    }, [])

    // const { containerProps, indicatorEl } = useLoading({
    //     loading: true,
    //     indicator: <Audio width="50" />,
    // });
    // console.log("title data...:", title)
    return (
        <>
            <div>
                <h1>BookList</h1>
                <div style={{ ...styles.container }}>

                    <TextField
                        style={{ ...styles.searcher }}
                        id="outlined-basic"
                        varient="outlined"
                        fullWidth
                        placeholder="search books"
                        value={searchInput}
                        onChange={searchHandler.bind(this)}

                    />

                    <div style={{ width: "45vw" }} >
                        {searchInput ? (title && title.filter(val => {
                            if (searchInput === "") {
                                return val;
                            } else if (val.title.toLowerCase().includes(searchInput.toLowerCase())) {
                                return val;
                            }
                        }).map((item, key) => {
                            return (
                                <div style={{ background: `${colours.secondaryLight}` }} key={key}>
                                    <div >
                                        <p>{item.title}</p>
                                        <img alt="covers" style={{ width: 100, height: 150 }} src={item.imageURL} />
                                    </div>
                                </div>
                            )
                        })) : (title.map((item, key) => {
                            return (
                                <div style={{ background: "lightgrey" }} key={key}>
                                    <div>
                                        <p>{item.title}</p>
                                        <img alt="covers" style={{ width: 100, height: 150 }} src={item.imageURL} />
                                    </div>
                                </div>
                            )
                        }))
                        }
                    </div>
                </div>


            </div>
        </>
    )
}


export default BookList;
