// requires parent to pass swapId as objects

export default function grabABook (data) {
    
    // console.log(`adding ${data.swapItem.price}`);    
    // console.log(`adding ${data.localUser.points}`);
    
    // CAPSTONE, 2nd round of check for points, will be crosscheck token userID with userDB for userId, points
    // if (data.localUser.points < data.swapItem.price) {
    //     // Alert.alert(
    //     //   'Error',
    //     //   `You do not have enough points`,
    //     //   [
    //     //     { text: "OK" }
    //     //   ]
    //     // );
    //     return { status: 'Point Fail' }; // failed transaction
    // };

    // CAPSTONE try catch to reduce user points by book price, if fail, failed transaction
    // data.localUser.points = data.localUser.points - 1;
    // console.log('After deducting for purchase: ', data.localUser.points);
    
    // CAPSTONE try catch to set swapId's availablity to NO, if fail, failed transaction
    // let transactionResult = swapToNO({
    //     swapId: data.swapItem.swapId
    // });

    // if (!transactionResult) { // if fail, need to reimburse credit to user points
    //     // CAPSTONE actual credit back to user points in DB
    //     data.localUser.points = data.localUser.points + 1;
    //     console.log('After credit for failed swap: ', data.localUser.points);
    //     return { status: 'Swap Fail' }; // as likely book has been bought by another user, need to trigger swap refresh
    // };

    // if (transactionResult) { // means swap availabilty set to NO
    //     return { status: 'Swap Done' };
    // };

    // anything pass this line means missed err catch
    return { status: 'Unknown Error' };
};
