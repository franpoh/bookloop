import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styling/style-sheet";
import MyButton from "../../components/button";

const logo = require("../../assets/logo.png")

function TopNav() {
    return (
        <div style={{...styles.topBar, ...styles.topBarTemp}}>
            <img src={logo} alt="website logo" width="70px" height="70px" />
            <h1 style={styles.h1Font}>BOOK LOOP</h1>
            <Link to="/"><MyButton name={"Book List"} /></Link>
            <Link to="/uploadbook"><MyButton name={"Upload Book"} /></Link>
            <Link to="/account"><MyButton name={"Account"} /></Link>
            <Link to="/access"><MyButton name={"Access"} /></Link>
            <Link to="/admin"><MyButton name={"Admin"} /></Link>
        </div>
    )
}

export default TopNav;