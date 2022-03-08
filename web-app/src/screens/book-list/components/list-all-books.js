import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from "../../../styling/style-sheet";
import "../../../styling/style.css"
import colours from "../../../styling/colours";
import { Grid } from '@mui/material';

const ListAllBooks = ({ data }) => {

    const navigate = useNavigate();

    return (
        data.map((item, key) => {
            return (
                <div style={{ ...styles.bookList, marginBottom: 10 }} key={uuidv4()}>
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
        })
    )
}

export default ListAllBooks;



