import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookAPI from "../../../API/book-api";
import { v4 as uuidv4 } from "uuid";
import styles from "../../../styling/style-sheet";
import "../../../styling/style.css";
import colours from "../../../styling/colours";
import { Grid, Box, LinearProgress } from "@mui/material";

const noImage = require("../../../assets/no-image.png");
const ListAllBooks = () => {
    const [title, setTitle] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const retrieve = async () => {
        try {
            await bookAPI.get(`general/searchIndex`).then((res) => {
                setTitle(res.data.data);
            });
        } catch (err) {
            console.log("You have an error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // setTimeout(() => {
        // remove in finale
        // console.log("Delaying for testing");
        retrieve();
        // }, 2000);
        setIsLoading(true);
    }, []);

    return (
        <>
            <h1 style={styles.h1Font}> BookLibrary</h1>
            {isLoading ?
                <Box sx={{ width: "100%" }}>
                    <LinearProgress color="success" />
                </Box>
                :
                <div className="libraryGrid">
                    {title.map((item, key) => {
                        return (
                            <div className="library" key={uuidv4()}>
                                <Grid
                                    container
                                    spacing={0.5}
                                    onClick={() => {
                                        navigate(`/bookdetails/${item.indexId}`);
                                    }}
                                >
                                    <Grid item sm={5} lg={5}>
                                        <img
                                            alt="cover missing"
                                            style={{ width: 150, height: 200 }}
                                            src={item.imageURL ? item.imageURL : noImage}
                                        />
                                    </Grid>
                                    <Grid item sm={3} lg={6}>
                                        <p style={styles.textBold}>{item.title}</p>
                                        <p style={{ color: `${colours.baseDark}` }}>
                                            <i>by {item.author}</i>
                                        </p>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </>
    );
};

export default ListAllBooks;
