import React from "react";
import { Routes, Route } from "react-router-dom";

import TopNav from "./components/top-nav";
import CustomRouter from "./components/custom_router";
import Access from "../access";
import Account from "../account";
import Admin from "../admin";
import BookDetails from "../book-details";
import BookList from "../book-list";
import UploadBook from "../upload-book";
import SplashScreen from "../splash/splash";

import styles from "../../styling/style-sheet";
import { history } from "../../components/history";
import AuthContext from "../../components/context";

function RoutePages() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(localStorage.getItem("userToken"));

    // local storage is used, otherwise userToken is lost upon reloading page
    const authContext = {
        signIn: () => {
            setIsLoading(false);
            localStorage.setItem("userToken", "mellon");
            setUserToken(localStorage.getItem("userToken"))
        },
        signOut: () => {
            setIsLoading(false);
            localStorage.setItem("userToken", null);
            setUserToken(localStorage.getItem("userToken"))
        },
    }

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);;
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <AuthContext.Provider value={authContext} >
            <CustomRouter history={history} >
                <div style={{ ...styles.container, ...styles.border }}>
                    <TopNav userToken={userToken} />
                    <div>
                        <Routes>
                            <Route path="/" element={<BookList />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/access" element={<Access />} />
                            <Route path="/bookdetails/:index" element={<BookDetails />} />
                            <Route path="/uploadbook" element={<UploadBook />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </ div>
                </div>
            </CustomRouter>
        </AuthContext.Provider>
    )
}

export default RoutePages;