import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import Login from "../access/components/login";
import MyUploads from "./myUploads";
import UploadNewBook from "./uploadNewBook";
import MyButton from "../../components/button";
import TextInput from "../../components/textInput";
import FreeSoloCreateOption from "../../components/autocompletebutton";

// what functions do i need?
// 1. handle submit button
// 2. handle input > when they type, show suggestion (according to title of book) based on our list of index
// 3. handle if index exists, handle if index doesn't exist.

// backend > if not logged in > route to login

function UploadBook() {
    const [user, setUser] = useState('');
    const [userToken, setUserToken] = useState(false)
    // const [display, setDisplay] = React.useState(<MyUploads/>);
    // const [display, setDisplay] = React.useState(<UploadNewBook/>);
    // const [buttonText, setButtonText] = React.useState("Upload a New Book");
    const [bookTitle, setBookTitle] = React.useState('Test Book Frontend Backend');
    const [bookAuthor, setBookAuthor] = React.useState('Test Book Author');
    const [bookGenreId, setBookGenreId] = React.useState('3');
    const [bookYear, setBookYear] = React.useState('2009');
    const [bookComments, setBookComments] = React.useState('test comments 4th march');
    const [msg, setMsg] = React.useState('');
    const [value, setValue] = useState(null);
    const [library, setLibrary] = useState([])

//trigger on component mount
    useEffect(() => {
        retrieveUser();
        retrieveIndex();
    }, []);

//trigger on user update
    useEffect(() => {
        if (user !== '') {
            setUserToken(true);
            console.log("User is logged in:", userToken);
        };
    }, [user]);

    async function retrieveUser() {
        try {
            const result = await bookAPI.get('/protected/viewprofile');
            console.log('user: ', result.data.data);
            setUser(result.data.data.user);
        } catch (err) {
            console.log('User Info Error', err);
        }
    };

    async function retrieveIndex() {
        try{
            const result = await bookAPI.get(`general/searchIndex`);
            console.log('retrieve Index Type:', typeof result.data.data);
            console.log('Retrieve Index: ', result.data.data);
            setLibrary(result.data.data)
        } catch (err) {
            console.log('Index Retrieval Error:', err);
        }
    };

    function uploadButton() {
        if (userToken===false){
            return;
        } else if (userToken) {
            console.log("Upload Button pressed");

            return
        }
    }

    // function handleDisplay() {
    //     if (buttonText ==="Upload a New Book") {
    //         setDisplay(<UploadNewBook/>);
    //         setButtonText("Back to My Uploads");
    //     } else if (buttonText ==="Back to My Uploads") {
    //         setDisplay(<MyUploads/>);
    //         setButtonText("Upload a New Book");
    //     }
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();

        await bookAPI.post("protected/uploadbook", {
            userid: user.user.userId,
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

// land on screen, show list of 
return (
    <div>
        <h1 style={styles.h1Font}>Upload Book</h1>

        <p style={styles.textNormal}>Hi What book would you like to upload today?</p>

        <div style = {{ ...styles.container}} >
           
            <form onSubmit={handleSubmit} style={styles.containerStart}>
                
                <label for='booktitle'> Book Title: </label>
                <TextInput type='text' req={true} name='booktitle' value={bookTitle} setValue={setBookTitle}/>
                {/* <FreeSoloCreateOption 
                    value={bookTitle} 
                    setValue={setBookTitle}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                          setValue({
                            title: newValue,
                          });
                        } else if (newValue && newValue.inputValue) {
                          // Create a new value from the user input
                          setValue({
                            title: newValue.inputValue,
                          });
                        } else {
                          setValue(newValue);
                        }
                    }}/> */}
                <label for='bookauthor'> Author: </label>
                <TextInput req={true} type="text" name ="bookauthor" value={bookAuthor} setValue={setBookAuthor}/>

                <label for='bookgenre'> Genre: </label>
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
                </select>

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