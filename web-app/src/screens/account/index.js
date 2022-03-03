import React from "react";

import styles from "../../styling/style-sheet";
import UserDetails from "./components/user_details";
import Wishlist from "./components/wishlist";
import UploadedBooks from "./components/upload_books"
import PurchaseHistory from "./components/purchase_history";
import Reviews from "./components/reviews"

function Account() {
    return (
        <div style={styles.container}>
            <UserDetails />
            <Reviews />
            <Wishlist />
            <UploadedBooks />
            <PurchaseHistory />
        </div>
    )
}

export default Account;