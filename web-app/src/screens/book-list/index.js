import React, { useState, useEffect } from 'react';
import styles from "../../styling/style-sheet"
// import TextField from "@mui/material/TextField";
// import Autocomplete from '@mui/material/Autocomplete';
import bookAPI from "../../API/book-api";
// import Title from "./title";

const BookList = () => {

    // const [book, setBook] = useState({
    //     title: "",
    //     image: ''
    // });
    const [title, setTitle] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    // const retrieveTitles = async (titles) => {
    //     const res = await bookAPI.get(`general/search?title=${titles.title}`, titles);
    //     const {title} = res.data.data;
    //     setTitle(
    //         title.map(titles => {
    //             return titles.
    //         })
    //     )
    // }

    const retrieve = async () => {
        console.log("Fetching items from API Swap Index....");
        await bookAPI.get(`general/search?title=%20`)
            .then(res => {
                console.log("recieves these..:", res.data.data.Index);
                setTitle(res.data.data);
            })
            .catch(err => {
                console.log("You have an error: ", err);
            })

    }

    useEffect(() => {
        retrieve();
    }, [])

    console.log("title data...:", title)
    return (
        <>
            <div>
                <h1>BookList</h1>
                <div style={{ ...styles.container }}>

                    <input
                        style={{ ...styles.searcher }}
                        type="text"
                        placeholder="search for books..."
                        onChange={event => {
                            setSearchInput(event.target.value)
                        }}
                    />

                    <div style={{ width: "45vw" }} >
                        {title && title.filter(val => {
                            if (searchInput === "") {
                                return val;
                            } else if (val.Index.title.toLowerCase().includes(searchInput.toLowerCase())) {
                                return val;
                            }
                        }).map((item, key) => {
                            return (
                                <div key={key}>
                                    <div>
                                        <p>{item.Index.title}</p>
                                        <img alt="covers" style={{ width: 100, height: 150 }} src={item.Index.imageURL} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div>
        </>
    )
}


export default BookList;
