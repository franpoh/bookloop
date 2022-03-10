import bookAPI from '../../../API/book-api';

// folder sub-components
import removeBookfromWishList from './remove-book-wishlist';

// requires to pass swapId as objects
async function grabABook( data ) {

    console.log(`grabbing ${data.swapId}`);

    try {
        const result = await bookAPI.post('/protected/grab', {
            swapId: data.swapId
        });

        console.log('grab result: ', result.data);
        console.log('grab result status: ', result.data.message);

        return { status: 'Grab Done' };

    } catch (error) {
        // transaction failed for some reason
        console.log('grab-book error: ', error);
        return { status: 'Grab Fail' }; // failed transaction
    };
};

async function handleConfirmYes( data ) {
    let submittingSwapId = data.toggleConfirm.swapId;
    data.passSetToggleConfirm({
        status: false,
        swapId: null,
        bodytext: ''
    });
    console.log('Submitting to grabbook', submittingSwapId);

    let grabProcess = await grabABook({
        swapId: submittingSwapId,
    });

    console.log('this should only trigger after grab component finish', grabProcess.status);

    if (grabProcess.status === 'Grab Fail' || grabProcess.status === 'Unknown Error') { // failed transaction
        console.log('Grab error:', grabProcess.status);
        return;
    };

    if (grabProcess.status === 'Grab Done') { // transaction complete

        data.passRetrieveSwap({
            indexId: data.indexId,
            passUpdateMatchSwap: data.passUpdateMatchSwap
        }); // trigger fresh pull from swap for index book
        data.passRetrieveUser({
            passSetUser: data.passSetUser
        }); // same for user points

        // trigger remove index from user wishlist if valid
        console.log('index vs wishlist: ', data.userWishlist.includes(data.indexId));
        if (data.userWishlist.includes(data.indexId)) {
            console.log('also removing from wishlist');
            const updateWishlist = removeBookfromWishList({
                indexId: data.indexId,
                userWishlist: data.userWishlist
            });
            data.passUpdateUserWishlist(updateWishlist);
            data.passUpdateCurrentBookWish(false);
        };
        return;
    };
    return;
};

export {
    grabABook, 
    handleConfirmYes,
};