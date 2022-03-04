export {
    userA,
    userB,
    indexBooks,
    swap,
    reviews,
    swapReviewMerged,
    retrivedUserSwapYes,
    retrievedUserSwapNo
};

const userA = {
    userId: 3,
    // userImage: require("../assets/user.jpg"),
    username: 'Bob',
    email: 'abc123@hmail.com',
    password: "abcdefg",
    points: 999,
    wishlist: [2, 5, 7, 9, 10, 23, 45, 66],
    type: 'USER'
};

const userB = {
    userId: 4,
    username: 'Aarontest',
    email: 'Aarontest@hmail.com',
    password: 'abcdefg',
    points: 100,
    wishlist: [1, 2, 5],
    type: 'USER'
}

// https://thegreatestbooks.org/the-greatest-fiction-since/1980
const indexBooks = [
    {
        indexId: 9,
        title: 'A Confederacy of Dunces',
        author: 'John Kennedy Toole',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/rstxal8xk784d7288orvapc0xogl',
        }

    },
    {
        indexId: 1,
        title: 'Beloved',
        author: 'Toni Morrison',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/rgbp8t53jgjxf52ibulydun84k0m',
        }

    },
    {
        indexId: 2,
        title: 'Beloved',
        author: 'Salman Rushdie',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/c5ocu6hs583593c4k92ij9y71soe',
        }

    },
    {
        indexId: 5,
        title: 'The Color Purple',
        author: 'Alice Walker',
        year: 1980,
        genreId: 1,
        // imageURL: {
        //     uri: 'https://d3i5mgdwi2ze58.cloudfront.net/2v05vz7oibe2oh00d0jng1amrir9',
        // }      
        imageURL: null,
    },
    {
        indexId: 7,
        title: 'The Handmaids Tale',
        author: 'Margaret Atwood',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/tedjyaopg0lwwmpmt2bepq6kby7p',
        }

    },
    {
        indexId: 10,
        title: 'Atonement',
        author: 'Ian McEwan',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/alnlrd2t0gt0y12ac1r8owz72kjx',
        }

    },
    {
        indexId: 23,
        title: 'White Teeth',
        author: 'Zadie Smith',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/kkrgvs3k1xcg5y4wbjy12crve9ia',
        }

    },
    {
        indexId: 45,
        title: 'Stories of Ernest Hemingway',
        author: 'Ernest Hemingway',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/5wf6o4u0ir8ackb0yfeycgzfpl54',
        }

    },
    {
        indexId: 66,
        title: ' Love in the Time of Cholera',
        author: 'Gabriel Garcia Marquez',
        year: 1980,
        genreId: 1,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/q8z45hoowjkdzz8ehp0rcozm0u2n',
        }

    },
];

const swap = [
    {
        swapId: 4,
        price: 1,
        comments: "good",
        indexId: 2,
        userId: 3,
        availability: "YES"
    },
    {
        swapId: 7,
        price: 1,
        comments: "good",
        indexId: 5,
        userId: 3,
        availability: "YES"
    },
    {
        swapId: 9,
        price: 1,
        comments: "good",
        indexId: 7,
        userId: 3,
        availability: "YES"
    },
    {
        swapId: 44,
        price: 1,
        comments: "good",
        indexId: 9,
        userId: 3,
        availability: "YES"
    },
    {
        swapId: 54,
        price: 1,
        comments: "good",
        indexId: 9,
        userId: 4,
        availability: "YES"
    },
    {
        swapId: 62,
        price: 1,
        comments: "good",
        indexId: 10,
        userId: 4,
        availability: "NO"
    },
    {
        swapId: 70,
        price: 1,
        comments: "good",
        indexId: 23,
        userId: 4,
        availability: "YES"
    },
    {
        swapId: 80,
        price: 1,
        comments: "good",
        indexId: 45,
        userId: 4,
        availability: "YES"
    },
    {
        swapId: 164,
        price: 1,
        comments: "good",
        indexId: 66,
        userId: 4,
        availability: "YES"
    },
];

const reviews = [
    {
        reviewId: 1,
        review: "Good for long rides",
        userId: 4,
        indexId: 66
    },
    {
        reviewId: 1,
        review: "Absolute mind blown",
        userId: 4,
        indexId: 23
    },
    {
        reviewId: 1,
        review: "Recommended. Didnt feel like 6000 pages",
        userId: 3,
        indexId: 5
    },
    {
        reviewId: 1,
        review: "Love the theme",
        userId: 3,
        indexId: 7
    },
    {
        reviewId: 1,
        review: "Best thriller Ive read",
        userId: 4,
        indexId: 9
    },
    {
        reviewId: 1,
        review: "This is not a thriller at all",
        userId: 3,
        indexId: 9
    },
    {
        reviewId: 1,
        review: "Not sure why Salman would do that",
        userId: 3,
        indexId: 2
    }
];

// const books = indexBooks.reduce(function (p, c) {
//     p[c.indexId] = c;
//     return p;
// }, {});

// const book_review = reviews.map(function (c) {
//     const d = books[c.indexId];
//     return {
//         indexId: c.indexId,
//         review: c.review,
//         // userId: c.userId,
//         title: d.title,
//         author: d.author
//     }
// });

// const merged = swap.reduce(function (p, c) {
//     p[c.indexId] = c;
//     return p;
// }, {});

// // console.log("merged", merged)

// const swap_review = book_review.map(function (c) {
//     const d = merged[c.indexId];
//     return {
//         indexId: d.indexId,
//         comments: d.comments,
//         price: d.price,
//         swapId: d.swapId,
//         userId: d.userId,
//         availability: d.availability,
//         review: c.review,
//         title: c.title,
//         author: c.author
//     }
// });
// console.log("swapReviewMerged:", swap_review);

// outputs from commented block above
const swapReviewMerged = [
    {
        indexId: 66,
        comments: 'good',
        price: 1,
        swapId: 164,
        userId: 4,
        availability: 'YES',
        review: 'Good for long rides',
        title: ' Love in the Time of Cholera',
        author: 'Gabriel Garcia Marquez'
    },
    {
        indexId: 23,
        comments: 'good',
        price: 1,
        swapId: 70,
        userId: 4,
        availability: 'YES',
        review: 'Absolute mind blown',
        title: 'White Teeth',
        author: 'Zadie Smith'
    },
    {
        indexId: 5,
        comments: 'good',
        price: 1,
        swapId: 7,
        userId: 3,
        availability: 'YES',
        review: 'Recommended. Didnt feel like 6000 pages',
        title: 'The Color Purple',
        author: 'Alice Walker'
    },
    {
        indexId: 7,
        comments: 'good',
        price: 1,
        swapId: 9,
        userId: 3,
        availability: 'YES',
        review: 'Love the theme',
        title: 'The Handmaids Tale',
        author: 'Margaret Atwood'
    },
    {
        indexId: 9,
        comments: 'good',
        price: 1,
        swapId: 54,
        userId: 4,
        availability: 'YES',
        review: 'Best thriller Ive read',
        title: 'A Confederacy of Dunces',
        author: 'John Kennedy Toole'
    },
    {
        indexId: 9,
        comments: 'good',
        price: 1,
        swapId: 54,
        userId: 3,
        availability: 'YES',
        review: 'This is not a thriller at all',
        title: 'A Confederacy of Dunces',
        author: 'John Kennedy Toole'
    },
    {
        indexId: 2,
        comments: 'good',
        price: 1,
        swapId: 4,
        userId: 3,
        availability: 'YES',
        review: 'Not sure why Salman would do that',
        title: 'Beloved',
        author: 'Salman Rushdie'
    }
]

const retrivedUserSwapYes = [
    {
        author: 'John Kennedy Toole',
        title: 'A Confederacy of Dunces',
        indexId: 9,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/rstxal8xk784d7288orvapc0xogl'
        }
    },
    {
        author: 'Zadie Smith',
        title: 'White Teeth',
        indexId: 23,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/kkrgvs3k1xcg5y4wbjy12crve9ia'
        }
    },
    {
        author: 'Ernest Hemingway',
        title: 'Stories of Ernest Hemingway',
        indexId: 45,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/5wf6o4u0ir8ackb0yfeycgzfpl54'
        }
    },
    {
        author: 'Gabriel Garcia Marquez',
        title: ' Love in the Time of Cholera',
        indexId: 66,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/q8z45hoowjkdzz8ehp0rcozm0u2n'
        }
    }
]

const retrievedUserSwapNo = [
    {
        author: 'Ian McEwan',
        title: 'Atonement',
        indexId: 10,
        imageURL: {
            uri: 'https://d3i5mgdwi2ze58.cloudfront.net/alnlrd2t0gt0y12ac1r8owz72kjx'
        }
    }
]

// Merging objects
// const userId = userB.userId;
// const filteredno = swap.filter(data => (data.userId == userId && data.availability == "NO"))
// let obj = {};
// // make new array of user's swap books
// const userSwap = filteredno.map(
//     element => element.indexId
// );

// //make a dictionary of indexbook's indexid
// userSwapDictionary = indexBooks.reduce(function(p, c) {
//     p[c.indexId] = c;
//     return p;
// }, {});

// //compare user's swap books index with dictionary, take out necessary details.
// const retrievedUserSwapNo = userSwap.map(function(c) {
//     var o = userSwapDictionary[c];
//     return {
//         author: o.author,
//         title: o.title,
//         indexId: o.indexId,
//         imageURL: o.imageURL
//     };
// });
// const userId = userB.userId;
// const filteredyes = swap.filter(data => (data.userId == userId && data.availability == "YES"))
// let obj = {};
// // make new array of user's swap books
// const userSwap = filteredyes.map(
//     element => element.indexId
// );

// //make a dictionary of indexbook's indexid
// userSwapDictionary = indexBooks.reduce(function(p, c) {
//     p[c.indexId] = c;
//     return p;
// }, {});

// //compare user's swap books index with dictionary, take out necessary details.
// const retrievedUserSwapYes = userSwap.map(function(c) {
//     var o = userSwapDictionary[c];
//     return {
//         author: o.author,
//         title: o.title,
//         indexId: o.indexId,
//         imageURL: o.imageURL
//     };
// });