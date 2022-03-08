import bookAPI from '../../../API/book-api';

// requires parent to pass swapId as objects

export default async function grabABook(data) {

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

    // anything pass this line means missed err catch
    return { status: 'Unknown Error' };
};
