import React from "react";
import bookAPI from "../../API/book-api";

function handleSubmit() {
    const [userId, setUserId] = React.useState('');
    const [bookTitle, setBookTitle] = React.useState('');
    const [bookAuthor, setBookAuthor] = React.useState('');
    const [bookGenreId, setBookGenreId] = React.useState('');
    const [bookComments, setBookComments] = React.useState('');
    // const [bookReview, setBookReview] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookAPI.post("protected/uploadbook", {
            userid: userId,
            booktitle: bookTitle,
            bookauthor: bookAuthor,
            bookgenre: bookGenreId,
            usercomments: bookComments
        }).then((response) => {
            setMsg(response.data.message)
            setTimeout(() => {
                return window.location.reload();
            }, 2000);
        }).catch((error) => {
            setMsg(error.response.data.message)
        })
    }
}

return (
    <div></div>
)