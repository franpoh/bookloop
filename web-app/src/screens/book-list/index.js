import React, { useState, useEffect } from 'react';
import styles from "../../styling/style-sheet"
// import TextField from "@mui/material/TextField";
import bookAPI from "../../API/book-api";
import Title from "./title"

const BookList = () => {

    // const [book, setBook] = useState({
    //     title: "",
    //     image: ''
    // });
    const [title, setTitle] = useState([]);

    useEffect(() => {
        bookAPI.get(`general/search?title=%20`)
            .then(res => {
                console.log("recieves these..:", res.data)
                setTitle(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    console.log("HEllo", title)
    return (

        <>
            <div>
                <h1>BookList</h1>
                <div style={{ ...styles.container }}>
                    <div>
                        {/* <TextField
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            label="Search Books"
                        /> */}
                    </div>
                    <div style={{ width: "45vw" }} >
                        <Title data={title} />
                    </div>
                </div>


            </div>
        </>
    )
}


export default BookList;