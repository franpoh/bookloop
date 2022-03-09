import React, { useState, useEffect } from "react";
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import MyButton from "../../components/button";
import TextInput from "../../components/text-input";
import ImageUploading from "react-images-uploading";
import { useNavigate } from 'react-router-dom';
// import authWrapper from '../../components/auth-wrapper'; add authwrapper later
// import {TextField, Autocomplete} from "@mui/material";

function UploadBook() {
    const navigate = useNavigate()

//#region UseStates
    const [user, setUser] = useState('');
    const [userToken, setUserToken] = useState(false)
    const [bookTitle, setBookTitle] = useState('');                                      //usestate for title selection
    const [bookAuthor, setBookAuthor] = useState('');                                    //useState for author selection
    const [bookGenreId, setBookGenreId] = useState(1);                                   //useState for bookgenre selection
    const [bookCover, setBookCover] = useState('');                                      //useState for bookcover selection
    const [bookYear, setBookYear] = useState('');                                        //useState for year
    const [bookComments, setBookComments] = useState('');                                //useState for comments
    const [msg, setMsg] = useState('');                                                  //useState for message storage
    const [library, setLibrary] = useState([])                                           //retrieved index stored here
    const [genreList, setGenreList] = useState([])                                       //retrieved genrelist stored here
    // const [bookGenre, setBookGenre] = useState('');
    // const [value, setValue] = useState(genreList[0]);
    // const [inputValue, setInputValue] = useState('');
    //#endregion UseStates

//#region useEffects for necessary params
    useEffect(() => {
        // retrieveUser();                 //user id
        retrieveIndex();                //index info stored in library to sort author & title
        retrieveGenreList();            //genre list
    }, []);

    useEffect(() => {
        if (user.username !== '') {
            setUserToken(true);
        };
    }, [user]);
    //#endregion useEffects for necessary params

//#region async retrieve functions
    async function retrieveUser() {
        try {
            const result = await bookAPI.get('/protected/viewprofile');
            console.log('user: ', result);
            console.log('userId: ', result.data.data.user.userId);
            setUser(result.data.data.user);
        } catch (err) {
            console.log('User Info Error', err);
        }
    };

    async function retrieveIndex() {
        try {
            const result = await bookAPI.get(`general/searchIndex`);
            console.log('Retrieve Index Success', result.data.data);
            setLibrary(result.data.data)
            // setBookCover(result.data.data)
        } catch (err) {
            console.log('Index Retrieval Error: ', err);
        }
    };

    async function retrieveGenreList() {
        try {
            const result = await bookAPI.get(`general/genres`);
            console.log('Retrieve Genre Success ', result.data.data);
            setGenreList(result.data.data)
        } catch (err) {
            console.log('Genre List Retrieval Error: ', err);
        }
    };

//#endregion async retrieve functions

//#region async post functions
    async function filterLibrary() {
        try{
            const result = await bookAPI.post(`general/searchIndexByParams`);
            console.log('Retrieve Details Success', result.data.data);
            setBookCover(result.data.data)
        } catch (e) {
            console.log('Retrieve Details Failed', e);
        }
    };
//#endregion async post functions

//#region handling genre
    function DisplayOptionGenres() {                            //pretty sure this can be exported
        return genreList.map((element, index) => {
            return (
                <option key={index} value={element.genreId}> {element.genre} </option>
            )
        });
    }

    function handleOption(e) {
        e.preventDefault();
        console.log("book genre - e.target.value", e.target.value);
        setBookGenreId(e.target.value)
    }
    //#endregion handling genre

//#region handling author & title
    function handleAuthorInput() {
        const filteredAuthorList = library && library.filter(book => {
            return (bookAuthor && book.author.toLowerCase().includes(bookAuthor.toLowerCase()))
            });
        const setAuthorList = new Set(filteredAuthorList.map(book => book.author))      //array but only with unique values. set cannot map.
        const uniqueAuthorList = [...setAuthorList]                                     //convert to set, then back to array ( but with unique values)
        
            return uniqueAuthorList.map((authorname) => {
                return (
                    <div value={authorname} onClick={handleAuthorSelect}>           
                        {authorname}
                    </div>
                )
            })
    }

    function handleTitleInput() {
        const filteredTitleList = library && library.filter(book => {
            return (bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase()))
        });
        
        return filteredTitleList.map((book) => {
            return (
                <div value={book.title} onClick={handleSelect}>
                    {book.title}
                </div>
                )
            }
        )
    }

    function handleSelect(e) {
        console.log(e);
        setBookTitle(e.target.lastChild.data);
    }

    function handleAuthorSelect(e) {
        console.log(e);
        setBookAuthor(e.target.firstChild.data);
    }

//#endregion handling author title

//#region handling book cover

function renderImages(props,key) {          //returns when search params return true
    console.log("renderImages called");
    return (
        <div key={key}>
            <img width={50} height={50} src={props.imageURL}/>
        </div>
    )
};

function renderInsertImage() {      //returns when search params return false, or if button is clicked
    return (
    <>
        <p> It seems this particular book has yet to be in our library!</p>
        <p> Please upload a valid image URL so that users can see the cover of the book</p>

        <TextInput type="text" name="Image URL for the book cover" value={bookCover} setValue={setBookCover}/>

    </>
    )
}

function handleLibraryImg(){
        const filteredlist = library && library.filter(book => {                                                     //filter logic
            if (bookAuthor && book.author.toLowerCase().includes(bookAuthor.toLowerCase())) {
                if (bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                    return book;
                } else if (!bookTitle) {
                return book; }
            } else if (!bookAuthor && bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                return book;
            }
        })
        // console.log("filtered list :", filteredlist);

        if (filteredlist.length > 0) {
            return filteredlist.map((book, key) => {
                return renderImages(book, key);
            })
        } else if (bookAuthor || bookTitle) {
            return renderInsertImage();
        }
}

function insertSwapImage() {            //component to handle user's book image
    return
    <ImageUploading></ImageUploading>
}

//#endregion handling book cover

//#region submit function
    //actual submit function
    const handleSubmit = async (e) => {

        await bookAPI.post("protected/uploadbook", {
            userid: user.userId,        //done
            booktitle: bookTitle,       //done
            bookauthor: bookAuthor,     //done
            bookgenre: bookGenreId,     //done
            bookyear: bookYear,         //done
            usercomments: bookComments  //done
        }).then((response) => {
            setMsg(response.data.message)
            setTimeout(() => {
                return navigate('/account');
            }, 2000);
        }).catch((error) => {
            setMsg(error.response.data.message)         //flagging an error on chrome log.. not sure what's happening here.
        })
    }

//#endregion submit function

//#region CODE RENDERING CHUNK

    return (
        <div>
            <form>
            <h1 style={styles.h1Font}>Upload Book</h1>
            <p style={styles.textNormal}>What book would you like to upload today?</p>
            
            <div>
                    {handleLibraryImg()}
                    <label>Book Author:</label>
                    <br/>
                    <TextInput req={true} type="text" name="Author of the book" value ={bookAuthor} setValue={setBookAuthor}/>
                    <br/>
                    {handleAuthorInput()}
                    <br/>
                    <label> Book Title: </label>
                    <br/>
                    <TextInput req={true} type="text" name="Title of the book" value={bookTitle} setValue={setBookTitle}/>
                    {handleTitleInput()}

                    <br/><br/>
                    <label> Genre: </label>
                    { genreList.length > 0 ? <select 
                        value={bookGenreId}
                        onChange={handleOption}
                        name="bookgenre" 
                        id="bookgenre"
                    > <DisplayOptionGenres/> </select> : <div></div> }
                    
                    <br/><br/>

                    <label> Year of Publishing: </label>
                    <br/>
                    <TextInput type="text" name ="Year book was published" value={bookYear} setValue={setBookYear}/>

                    <br/><br/>

                    <label> Comments: </label>
                    
                    <br/>

                    <TextInput type="text" name ="Comments on book's physical condition" value={bookComments} setValue={setBookComments}/>
                    
                    <br/><br/>
                    {/*
                    Setting this aside temporarily

                    <label for='bookreview'> Book Review (Optional): </label><br/>
                    <textarea>Occaecat nulla deserunt exercitation adipisicing reprehenderit veniam excepteur laborum duis eiusmod elit reprehenderit elit. Pariatur quis consequat qui est occaecat ut enim sit. Laboris enim commodo excepteur excepteur.
                    Est deserunt laboris voluptate duis quis amet eu nisi nostrud proident laborum fugiat occaecat. Voluptate labore qui do dolore. Cillum sunt commodo eiusmod sit adipisicing non. Irure sint dolore in ex labore. Commodo in fugiat et eu irure anim eu nisi adipisicing sint consequat.</textarea><br/><br/> 
                    */}

                    <MyButton name={"Upload This Book"}
                        type={"button"}
                        handle={
                            () => handleSubmit() 
                        }
                    />
            </div>
            </form>
        </div>
    )
};
//#endregion RENDERING CODE CHUNK

export default UploadBook;



