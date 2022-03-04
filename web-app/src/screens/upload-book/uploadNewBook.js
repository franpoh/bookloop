import React from 'react';
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import TextInput from "../../components/textInput";

async function UploadNewBook(data) {
    console.log(data);
    const [bookTitle, setBookTitle] = React.useState('Test Book Frontend Backend');
    const [bookAuthor, setBookAuthor] = React.useState('Test Book Author');
    const [bookGenreId, setBookGenreId] = React.useState('3');
    const [bookComments, setBookComments] = React.useState('test comments 4th march');
    // const [bookReview, setBookReview] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        await bookAPI.post("protected/uploadbook", {
            userid: data.userId,
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

    return (
        <div>
            <h1 style={styles.h1Font}>Upload Book</h1>

            <p style={styles.textNormal}>What book would you like to upload today?</p>

            <div style = {{ ...styles.container}} >
               
                <form onSubmit={handleSubmit} style={styles.containerStart}>

                    <TextInput req={true} type="text" name ="Book Title" value={bookTitle} setValue={setBookTitle}/>
                    <label for='booktitle'> Book Title: </label><br/>

                    <label for='bookauthor'> Author: </label><br/>
                    <TextInput req={true} type="text" name ="Book Author" value={bookAuthor} setValue={setBookAuthor}/>
                    <input type='text' id='bookauthor' name='bookauthor'/><br/><br/>

                    <label for='bookgenre'> Genre: </label><br/>
                    <select name='bookgenre' id='bookgenre'>
                        <option value="1">Fantasy</option>
                        <option value="2">Historical Fiction</option>
                        <option value="3">Horror</option>
                        <option value="4">Action</option>
                        <option value="5">Mystery</option>
                        <option value="6">Sci-fi</option>
                        <option value="7">Romance</option>
                        <option value="8">Thriller</option>
                        <option value="9">Dystopian</option>
                        <option value="10">Non-Fiction</option>
                    </select><br/><br/>

                    <label for='bookyear'> Year of Publishing: </label><br/>
                    <input type='text' id='bookyear' name='bookyear'/><br/><br/>

                    <label for='bookcomments'> Comments: </label><br/>
                    <input type='text' id='bookyear' name='bookyear'/><br/><br/>
                            
                            
                    {/*
                    Setting this aside temporarily

                    <label for='bookreview'> Book Review (Optional): </label><br/>
                    <textarea>Occaecat nulla deserunt exercitation adipisicing reprehenderit veniam excepteur laborum duis eiusmod elit reprehenderit elit. Pariatur quis consequat qui est occaecat ut enim sit. Laboris enim commodo excepteur excepteur.
                    Est deserunt laboris voluptate duis quis amet eu nisi nostrud proident laborum fugiat occaecat. Voluptate labore qui do dolore. Cillum sunt commodo eiusmod sit adipisicing non. Irure sint dolore in ex labore. Commodo in fugiat et eu irure anim eu nisi adipisicing sint consequat.</textarea><br/><br/> 
                    */}
                    </form>
                </div>
            </div>
    )
};

export default UploadNewBook;