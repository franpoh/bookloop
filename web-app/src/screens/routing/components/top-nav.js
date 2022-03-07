import React from "react";
import { Link } from "react-router-dom";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import Logout from "../../access/components/logout";

const logo = require("../../../assets/logo.png")

// Navigation bar on top of website
function TopNav({ userToken }) {

    return (
        <div style={{ ...styles.topBar, ...styles.topBarSpace }}>
            <div style={styles.topBarSpace}>
                <Link to="/"><img src={logo} alt="website logo" className="nav" width="70px" height="70px" /></Link>
                <Link to="/" className="nav"><h1 style={styles.headerFont}>BOOK LOOP</h1></Link>
            </div>
            <div style={styles.topBarSpace}>
                {userToken === "mellon" ? (<Link to="/uploadbook"><MyButton name={"Upload Book"} /></Link>) : (<></>) }
                {userToken === "mellon" ? (<Link to="/account"><MyButton name={"Account"} /></Link>) : (<></>) }
                {userToken === "mellon" ? (<Logout />) : (<Link to="/access"><MyButton name={"Login"} /></Link>) }
            </div>
        </div>
    )
}

export default TopNav;