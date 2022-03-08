import bookAPI from '../../../API/book-api';

// requires parent to pass indexId, userWishList as object keys

export default async function removeBookfromWishList(data) {

  // console.log(`removing ${data.indexId}`);
  // console.log(`to wishlist ${data.userWishlist}`);

  try {
    const result = await bookAPI.post('/protected/delwish', {
      indexId: data.indexId
    });
    console.log('delwish result: ', result.data);
    console.log('delwish result wishlist: ', result.data.data.wishlist);

    return result.data.data.wishlist;

  } catch (error) {
    console.log('delwishlist error: ', error)

    return data.userWishlist;
  };
};

