import bookAPI from '../../../API/book-api';

// requires parent to pass indexId as object keys

export default async function removeBookfromWishList(data) {

  // console.log(`removing ${data.indexId}`);

  let result = {
    data: {
      data: null
    }
  };

  try {
    result = await bookAPI.post('/protected/delwish', {
      indexId: data.indexId
    });
    console.log('delwish result: ', result.data);
    console.log('delwish result wishlist: ', result.data.data.wishlist);

    // return result.data.data.wishlist;

  } catch (error) {
    console.log('delwishlist error: ', error);
  } finally {
    return result.data;
  };
};

