import React, { useState, useEffect } from "react";
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import MyButton from "../../components/button";
import TextInput from "../../components/textInput";
import { useNavigate } from 'react-router-dom';
// import {TextField, Autocomplete} from "@mui/material";

function UploadBook() {
    const navigate = useNavigate()
//#region UseStates
    const [user, setUser] = useState('');
    const [userToken, setUserToken] = useState(false)     
    const [bookTitle, setBookTitle] = useState('');                                      //usestate for title selection
    const [bookAuthor, setBookAuthor] = useState('');                                    //useState for author selection
    const [bookGenreId, setBookGenreId] = useState(1);                                   //useState for bookgenre selection
    const [bookYear, setBookYear] = useState('2009');                                    //useState for year
    const [bookComments, setBookComments] = useState('test comments 4th march');         //useState for comments
    const [msg, setMsg] = useState('');                                                  //no clue
    const [library, setLibrary] = useState([])                                           //retrieved index stored here
    const [genreList, setGenreList] = useState([])                                       //retrieved genrelist stored here
    // const [bookGenre, setBookGenre] = useState('');
    // const [value, setValue] = useState(genreList[0]);
    // const [inputValue, setInputValue] = useState('');
//#endregion UseStates

//#region useEffects for necessary params
    useEffect(() => {
        retrieveUser();                 //user id
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
            console.log('user: ', result.data.data.user.username);
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
//#endregion async retrieve functions

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

    function handleSelect(e) {
        // console.log(e.target.firstChild.data);
        setBookTitle(e.target.firstChild.data);
    }

    function handleAuthorSelect(e) {
        setBookAuthor(e.target.firstChild.data);
    }

//#endregion handling author title

//#region submit function
    //actual submit function
    const handleSubmit = async(e) => {

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
            setMsg(error.response.data.message)
        })
    }

    //placeholder submit function
    function uploadButton() {
        if (userToken===false){
            return;
        } else if (userToken) {
            console.log("Upload Button pressed");

            return
        }
    }
//#endregion submit function

return (
    <div>

        <h1 style={styles.h1Font}>Upload Book</h1>
        <p style={styles.textNormal}>What book would you like to upload today?</p>
        <div style={{ ...styles.container}} >

            <form onSubmit={handleSubmit} style={styles.containerStart}>

                <label> Author: </label>
                <TextInput type="text" name ="Name of the author" value={bookAuthor} setValue={setBookAuthor}/>

                {bookAuthor ?
                (library && library.filter(val => {
                    if(bookAuthor===" ") {
                        <></>
                    } else if (val.author.toLowerCase().includes(bookAuthor.toLowerCase())) {
                        return val;
                    }
                }).map((item) => {
                    return(
                        <div value={item.author} onClick={handleAuthorSelect}>
                            {item.author}
                        </div>
                    )
                })): (library.map((item) => {
                    return (
                        <></>
                    )
                }))
                }

                <label> Book Title: </label>
                <TextInput
                req={true}
                type="text"
                name="Title of the book"
                value={bookTitle}
                setValue={setBookTitle}
                />

                {bookTitle ? 
                    (library && library.filter(val => {
                        if (bookTitle === " ") {
                            <></>
                        } else if (val.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                            // console.log("val returns :", val);
                            return val;
                        }
                    }).map((item) => {
                        // console.log("item: ", item);
                        return (
                            <div value={item.title} onClick={handleSelect} >
                                {/* define styling for above div display block*/}
                                {item.title}
                            </div>
                        )
                    })) : (library.map((item, key) => {
                        return (
                            <></>
                        )   
                    }))
                }

                <label htmlFor='bookgenre'> Genre: </label>
                { genreList.length > 0 ? <select 
                    value={bookGenreId}
                    onChange={handleOption}
                    name="bookgenre" 
                    id="bookgenre"
                > <DisplayOptionGenres/> </select> : <div></div> }

                <label htmlFor='bookyear'> Year of Publishing: </label>
                <TextInput type="text" name ="bookyear" value={bookYear} setValue={setBookYear}/>

                <label htmlFor='bookcomments'> Comments: </label>
                <TextInput type="text" name ="bookcomments" value={bookComments} setValue={setBookComments}/>
                        
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
                </form>
            </div>
        </div>
)
};

export default UploadBook;

                

