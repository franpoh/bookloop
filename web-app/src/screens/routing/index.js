import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopNav from "./top-nav";

import styles from "../../styling/style-sheet";

import Access from "../access";
import Account from "../account";
import Admin from "../admin";
import BookDetails from "../book-details";
import BookList from "../book-list";
import UploadBook from "../upload-book";

function RoutePages() {
    return (
        <BrowserRouter>
            <div style={{ ...styles.container, ...styles.border }}>
                <TopNav />
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
        </BrowserRouter>
    )
}

export default RoutePages;