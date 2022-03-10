import removeBookfromWishList from './remove-book-wishlist';
import addBooktoWishList from './add-book-wishlist';


// userToken, currentBookWish
async function wishButton( data ) {

    console.log("wishbutton, token: ", data.userToken);
    console.log("wishbutton, currentBookWish: ", data.currentBookWish);    

    if (data.userToken === false) {
        return;
    } else if (data.currentBookWish) {
        
        const updateWishlist = await removeBookfromWishList({
            indexId: data.indexId,
            // userWishlist: userWishlist
        });

        if (updateWishlist.data === null) { // if error in updating wishlist in DB
            return;
        };
        
        data.passUpdateUserWishlist(updateWishlist);
        data.passUpdateCurrentBookWish(false);        

    } else if (!data.currentBookWish) {
    
        const updateWishlist = await addBooktoWishList({
            indexId: data.indexId,
            // userWishlist: userWishlist
        });

        if (updateWishlist.data === null) { // if error in updating wishlist in DB
            return;
        };

        data.passUpdateUserWishlist(updateWishlist.data.wishlist);
        data.passUpdateCurrentBookWish(true);
    };
};

function uploadReviewButton( data ) {

    console.log("uploadReviewButton", data);
    
    if (data.userToken === false) { // halt process if not logined
        return;
    };

    if (data !== undefined) {
        if (data.status) {
            console.log('triggering refresh of all reviews');
            data.status = false; // reset status of addreview component
            data.passRetrieveReview({
                indexId: data.indexId,
                passSetReviews: data.passSetReviews
            });
        };
    };   
    data.passSetShow(!(data.show));
    console.log("uploadReviewButton2", data);
};

export {
    wishButton, 
    uploadReviewButton
};