import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import Login from "../access/components/login";
import MyUploads from "./myUploads";
import UploadNewBook from "./uploadNewBook";
import MyButton from "../../components/button";
import TextInput from "../../components/textInput";
import {TextField, Autocomplete} from "@mui/material";

// what functions do i need?
// 1. handle submit button
// 2. handle input > when they type, show suggestion (according to title of book) based on our list of index
// 3. handle if index exists, handle if index doesn't exist (frontend?) maybe a popup to confirm add new book?
// backend > if not logged in > route to login

function UploadBook() {
    const [user, setUser] = useState('');
    const [userToken, setUserToken] = useState(false)
    const [bookTitle, setBookTitle] = React.useState('Test Book Frontend Backend');
    const [bookAuthor, setBookAuthor] = React.useState('Test Book Author');
    const [bookGenreId, setBookGenreId] = React.useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookYear, setBookYear] = React.useState('2009');
    const [bookComments, setBookComments] = React.useState('test comments 4th march');
    const [msg, setMsg] = React.useState('');
    const [library, setLibrary] = useState([])
    const [genreList, setGenreList] = useState([])
    const [value, setValue] = useState(genreList[0]);
    const [inputValue, setInputValue] = useState('');

//trigger on component mount
    useEffect(() => {
        retrieveUser();                 //user id
        retrieveIndex();                //author and book title
        retrieveGenreList();            //genre list
    }, []);

//trigger on user update
    useEffect(() => {
        if (user.username !== '') {
            setUserToken(true);
        };
    });

    async function retrieveUser() {
        try {
            const result = await bookAPI.get('/protected/viewprofile');
            console.log('user: ', result.data.data.user.username);
            console.log('userId: ', result.data.data.user.userId);
            setUser(result.data.data.user);
        } catch (err) {
            console.log('User Info Error', err);
        }
    };

    async function retrieveIndex() {
        try{
            const result = await bookAPI.get(`general/searchIndex`);
            console.log('Retrieve Index Success', result.data.data);
            setLibrary(result.data.data)
        } catch (err) {
            console.log('Index Retrieval Error: ', err);
        }
    };

    async function retrieveGenreList() {
        try{
            const result = await bookAPI.get(`general/genres`);
            console.log('Retrieve Genre Success ', result.data.data);
            setGenreList(result.data.data)
        } catch (err) {
            console.log('Genre List Retrieval Error: ', err);
        }
    }

    function uploadButton() {
        if (userToken===false){
            return;
        } else if (userToken) {
            console.log("Upload Button pressed");

            return
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        await bookAPI.post("protected/uploadbook", {
            userid: user.userId,
            booktitle: bookTitle,
            bookauthor: bookAuthor,
            bookgenre: bookGenreId,
            bookyear: bookYear,
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
                
                <label for='booktitle'> Book Title: </label>
                <TextInput type='text' req={true} name='booktitle' value={bookTitle} setValue={setBookTitle}/>

                <label for='bookauthor'> Author: </label>
                <TextInput req={true} type="text" name ="bookauthor" value={bookAuthor} setValue={setBookAuthor}/>

                <Autocomplete
                    value={bookGenre}
                    onChange={(event, newValue) => {
                        setBookGenre(newValue);
                        console.log(bookGenre);
                    }} 
                    inputValue={bookGenre}
                    onInputChange={(event, newInputValue) => {
                        setBookGenre(newInputValue)
                        console.log(bookGenre);
                    }}
                    id="combo-box-demo"
                    options={genreList}
                    getOptionLabel={(option) => option.genre}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Genre" />}
                />

                <label for='bookyear'> Year of Publishing: </label>
                <TextInput req={true} type="text" name ="bookyear" value={bookYear} setValue={setBookYear}/>

                <label for='bookcomments'> Comments: </label>
                <TextInput req={true} type="text" name ="bookcomments" value={bookComments} setValue={setBookComments}/>
                        
                {/*
                Setting this aside temporarily

                <label for='bookreview'> Book Review (Optional): </label><br/>
                <textarea>Occaecat nulla deserunt exercitation adipisicing reprehenderit veniam excepteur laborum duis eiusmod elit reprehenderit elit. Pariatur quis consequat qui est occaecat ut enim sit. Laboris enim commodo excepteur excepteur.
                Est deserunt laboris voluptate duis quis amet eu nisi nostrud proident laborum fugiat occaecat. Voluptate labore qui do dolore. Cillum sunt commodo eiusmod sit adipisicing non. Irure sint dolore in ex labore. Commodo in fugiat et eu irure anim eu nisi adipisicing sint consequat.</textarea><br/><br/> 
                */}
                <MyButton name={"Upload This Book"}
                    type={"button"}
                    handle={
                        () => uploadButton() 
                    }
                />
                </form>
            </div>
        </div>
)
};

export default UploadBook;