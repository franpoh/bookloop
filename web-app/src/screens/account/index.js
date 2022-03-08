import React from "react";

import UserDetails from "./components/user-details";
import BookListView from "./components/book-listings-view";

import styles from "../../styling/style-sheet";
import bookAPI from "../../API/book-api";
import authWrapper from "../../components/auth-wrapper";
import AuthContext from "../../components/context"

function Account() {
    const { signOut } = React.useContext(AuthContext);

    const [profile, setProfile] = React.useState([])
    const [reviews, setReviews] = React.useState([]);
    const [uploadedBooks, setUploadedBooks] = React.useState([]);
    const [wishlist, setWishlist] = React.useState([]);
    const [purchaseHistory, setPurchaseHistory] = React.useState([]);

    const defaultMsg = "You have not uploaded anything yet!";

    React.useEffect(() => {
        let p = new Promise(async (resolve) => {
            let user = await authWrapper(bookAPI.get('/protected/viewprofile'), signOut);
            let wishlist = await authWrapper(bookAPI.get('/protected/wishlist'), signOut);

            let response = {
                user,
                wishlist,
            };

            resolve(response);
        })

        p.then((response) => {
            if (!response.user) {
                console.log("Error calling viewprofile in screens/account", response.user);
                return;
            } else {
                setProfile(response.user.data.data.user);
                setReviews(response.user.data.data.reviews);
                setUploadedBooks(response.user.data.data.swap);
                setPurchaseHistory(response.user.data.data.purchaseHistory);
            }

            if (!response.wishlist) {
                return;
            } else {
                setWishlist(response.wishlist.data.data);
            }
        });
    }, [])

    if (!profile) {
        return <></>
    } else {
        return (
            <div style={styles.container}>
                <UserDetails target={profile} />
                <BookListView target={reviews} detailName="My Review" detail="review" headerName="Reviews" noListingMsg={defaultMsg} />
                <BookListView target={wishlist} detailName="Availability" detail="availability" headerName="Wishlist" noListingMsg="You have not wishlisted anything yet!" />
                <BookListView target={uploadedBooks} detailName="Condition" detail="comments" headerName="Uploaded Books" noListingMsg={defaultMsg} />
                <BookListView target={purchaseHistory} detailName="Condition" detail="comments" headerName="Purchase History" noListingMsg="You have not bought anything yet!" />
            </div>
        )
    }
}

export default Account;