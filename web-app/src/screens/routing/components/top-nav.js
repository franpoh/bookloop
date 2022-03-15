import React from "react";
import { Link } from "react-router-dom";

import styles from "../../../styling/style-sheet";
import MyButton from "../../../components/button";
import handleLogout from "../../access/components/logout";
import AuthContext from "../../../components/context";

const logo = require("../../../assets/logo.png")

// Navigation bar on top of website
// checks userToken to decide which buttons to render
function TopNav({ userToken }) {

    const { signOut } = React.useContext(AuthContext);

    // render
    return (
        <div style={{ ...styles.topBar, ...styles.topBarSpace }}>
            <div style={styles.topBarSpace}>
                <Link to="/"><img src={logo} alt="website logo" className="nav" width="70px" height="70px" /></Link>
                <Link to="/" className="nav"><h1 style={styles.headerFont}>BOOK LOOP</h1></Link>
            </div>
            <div style={styles.topBarSpace}>

                {userToken === "ADMIN" ? 
                    (<Link to="/admin"><MyButton name={"Admin"} /></Link>) : (<></>) 
                }

                {userToken === "USER" || userToken === "ADMIN" ? 
                    (<Link to="/uploadbook"><MyButton name={"Upload Book"} /></Link>) : (<></>) 
                }

                {userToken === "USER" || userToken === "ADMIN" ? 
                    (<Link to="/account"><MyButton name={"Account"} /></Link>) : (<></>) 
                }

                {userToken === "BANNED" ? 
                    (<p style={styles.textBold}>You have been banned and is viewing a reduced version of this website</p>) : (<></>) 
                }

                {userToken === "USER" || userToken === "BANNED" || userToken === "ADMIN" ? 
                    (<MyButton name="Logout" handle={() => handleLogout(signOut)} />) : (<Link to="/access"><MyButton name={"Login"} /></Link>) 
                }
                
            </div>
        </div>
    )
}

export default TopNav;