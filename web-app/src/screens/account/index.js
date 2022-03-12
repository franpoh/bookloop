import React from "react";

import UserDetails from "./components/user-details";
import BookListView from "./components/book-listings-view";

import styles from "../../styling/style-sheet";
import bookAPI from "../../API/book-api";
import authWrapper from "../../components/auth-wrapper";
import AuthContext from "../../components/context"

function Account() {

    const { signOut } = React.useContext(AuthContext);

    // message for if reviews/uploaded books/wishlist/purchase history is empty
    const defaultMsg = "You have not uploaded anything yet!";

    // set state
    const [profile, setProfile] = React.useState([])
    const [reviews, setReviews] = React.useState([]);
    const [uploadedBooks, setUploadedBooks] = React.useState([]);
    const [wishlist, setWishlist] = React.useState([]);
    const [purchaseHistory, setPurchaseHistory] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('');

    // get profile details and wishlist
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
                setErrorMsg("Loading profile failed, please login again.");
                return;
            } else {
                // set states for data to be sent to various handling components
                const userData = response.user.data.data;

                setProfile(userData.user);
                setReviews(userData.reviews);
                setUploadedBooks(userData.swap);
                setPurchaseHistory(userData.purchaseHistory);
            }

            if (!response.wishlist.data) {
                return;
            } else {
                setWishlist(response.wishlist.data.data);
            }
        });
    }, [])

    // render
    if (profile.length === 0) {
        return <></>
    } else if (errorMsg) {
        return <h3 style={styles.h3Bold}>{errorMsg}</h3>
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