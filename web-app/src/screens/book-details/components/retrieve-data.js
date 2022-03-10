// internal global components
import bookAPI from "../../../API/book-api";

// try catch for fetch book info
async function retrieveBookDetails( data ) {
    try {
        const result = await bookAPI.get(`/general/detail?bookID=${data.indexId}`);

        console.log('Book Detail: ', result.data);
        console.log(result.data.data[0].title);

        data.passUpdateMatchIndex(result.data.data[0]);
    } catch (error) {
        console.log('Book Detail error: ', error);
    };
};

// try catch for user info if avail
async function retrieveUser( data ) {
    try {
        const result = await bookAPI.get('/protected/viewprofile');

        console.log('user: ', result);
        if (result.data.data.user.wishlist === null) { result.data.data.user.wishlist = [] };
        data.passSetUser(result.data.data.user);
    } catch (error) {
        console.log('User info error', error);
    };        
};

// try catch for related swap data
async function retrieveSwap( data ) {
    try {
        const result = await bookAPI.get(`/general/searchSwap?indexId=${data.indexId}`);

        if (result.data.data.length === 0) {
            data.passUpdateMatchSwap([]);
            console.log('retr Swap by Index is ZERO');
            return;
        } else {
            console.log('retr Swap by Index: ', result.data.data);
            data.passUpdateMatchSwap(result.data.data);
            return;
        };
    } catch (error) {
        console.log('retr Swap by Index error', error);
    };        
};

// try catch for related reviews
async function retrieveReview( data ) {
    try {
        const result = await bookAPI.get(`/general/reviews?indexId=${data.indexId}`);

        if (result.data.data.length === 0) {
            data.passSetReviews([]);
            console.log('retr reviews by Index is ZERO');
            return;
        } else {
            console.log('retr reviews by Index: ', result.data.data);
            data.passSetReviews(result.data.data);
            return;
        };

    } catch (error) {
        console.log('retr reviews by Index error', error);
    };
};

export {
    retrieveBookDetails, 
    retrieveUser,
    retrieveSwap,
    retrieveReview
};