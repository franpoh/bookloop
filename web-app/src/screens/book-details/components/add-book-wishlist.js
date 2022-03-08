import bookAPI from '../../../API/book-api';

// requires parent to pass indexId, userWishList as object keys

export default async function addBooktoWishList(data) {

  // console.log(`adding ${data.indexId}`);
  // console.log(`to wishlist ${data.userWishlist}`);

  try {
    const result = await bookAPI.post('/protected/addwish', {
      indexId: data.indexId
    });
    console.log('addwish result: ', result.data);
    console.log('addwish result wishlist: ', result.data.data.wishlist);

    return result.data.data.wishlist;

  } catch (error) {
    console.log('addwishlist error: ', error)

    return data.userWishlist;
  };
};

