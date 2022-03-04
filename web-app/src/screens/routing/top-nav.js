import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styling/style-sheet";
import MyButton from "../../components/button";
import Logout from "../access/components/logout";

const logo = require("../../assets/logo.png")

function TopNav() {
    return (
        <div style={{...styles.topBar, ...styles.topBarTemp}}>
            <img src={logo} alt="website logo" width="70px" height="70px" />
            <h1 style={styles.headerFont}>BOOK LOOP</h1>
            <Link to="/"><MyButton name={"Book List"} /></Link>
            <Link to="/uploadbook"><MyButton name={"Upload Book"} /></Link>
            <Link to="/account"><MyButton name={"Account"} /></Link>
            <Link to="/access"><MyButton name={"Access"} /></Link>
            <Link to="/admin"><MyButton name={"Admin"} /></Link>
            <Logout />
        </div>
    )
}

export default TopNav;