import React, { useState, useEffect } from 'react';
import "../../styling/styles.css";
import TextField from "@mui/material/TextField";
import bookAPI from "../../API/book-api";

function BookList() {

    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);


    return (
        <div>
            <h1>BookList</h1>
            <div className="search">
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search Books"
                    />
                </div>

            </div>
        </div>

    )
}

export default BookList;