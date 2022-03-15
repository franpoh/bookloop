import React from "react";
import { Routes, Route } from "react-router-dom";

import TopNav from "./components/top-nav";
import CustomRouter from "./components/custom-router";
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
import ListAllBooks from "../book-list/components/list-all-books";

function RoutePages() {

    // set state
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(localStorage.getItem("userToken"));

    // local storage is used, otherwise userToken is lost upon reloading page
    const authContext = {
        signIn: (user) => {
            setIsLoading(false);
            localStorage.setItem("userToken", user);
            setUserToken(localStorage.getItem("userToken"))
        },
        signOut: () => {
            setIsLoading(false);
            localStorage.setItem("userToken", null);
            setUserToken(localStorage.getItem("userToken"))
        },
    }

    // when page loading, show splashscreen for 1 second
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);;
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    // render, passing userToken into TopNav and authContext into everything
    return (
        <AuthContext.Provider value={authContext} >
            <CustomRouter history={history} basename="/bookloop" >
                <div style={{ ...styles.container, ...styles.border }}>
                    <TopNav userToken={userToken} />
                    <div>
                        <Routes>
                            <Route exact path="/" element={<BookList />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/access" element={<Access />} />
                            <Route path="/bookdetails/:index" element={<BookDetails />} />
                            <Route path="/uploadbook" element={<UploadBook />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/library" element={<ListAllBooks />} />
                        </Routes>
                    </ div>
                </div>
            </CustomRouter>
        </AuthContext.Provider>
    )
}

export default RoutePages;