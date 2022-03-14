import React, { useState, useEffect, useContext } from "react";
import Popup from 'reactjs-popup';
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import MyButton from "../../components/button";
import TextInput from "../../components/text-input";
// import ImageUploading from "react-images-uploading";             //not in use
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import authWrapper from "../../components/auth-wrapper";
import AuthContext from "../../components/context";
import DialogAlert from '../../components/dialog-alert';
import { CircularProgress, Box, Button } from "@mui/material";

function UploadBook() {
    const navigate = useNavigate()
    const { signOut } = useContext(AuthContext);

    //#region UseStates
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = useState('');
    const [userToken, setUserToken] = useState(false)
    const [bookTitle, setBookTitle] = useState('');                                      //usestate for title selection
    const [bookAuthor, setBookAuthor] = useState('');                                    //useState for author selection
    const [bookGenreId, setBookGenreId] = useState(1);                                   //useState for bookgenre selection
    const [bookCover, setBookCover] = useState('');                                      //useState for bookcover selection
    const [bookYear, setBookYear] = useState('');                                        //useState for year
    const [bookComments, setBookComments] = useState('');                                //useState for comments
    const [msg, setMsg] = useState('');                                                  //useState for message storage
    const [library, setLibrary] = useState([]);                                          //retrieved index stored here
    const [genreList, setGenreList] = useState([]);                                      //retrieved genrelist stored here
    const [showInsertImage, setShowInsertImage] = useState(false);
    // const [bookGenre, setBookGenre] = useState('');                                   //unable to retrieve name of book genre, redundant
    // const [value, setValue] = useState(genreList[0]);                                 //for TextField/Autocomplete
    // const [inputValue, setInputValue] = useState('');                                 //for TextField/Autocomplete
    const [toggleAlert, setToggleAlert] = useState(false);  // for alertdialog trigger
    const [alertText, setAlertText] = useState(""); // for changing alert diablog text
    //#endregion UseStates

    //#region useEffects for necessary params
    useEffect(() => {
        retrieveUser();                 //user id
        retrieveIndex();                //index info stored in *library* to sort author, title and imageURL
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
            const result = await authWrapper(bookAPI.get('/protected/viewprofile'), signOut);
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

    //#region handling genre
    function DisplayOptionGenres() {                            //pretty sure this can be exported
        return genreList.map((element, key) => {
            return (
                <option key={element.genreId} value={element.genreId}> {element.genre} </option>
            )
        });
    }

    function handleOption(e) {
        e.preventDefault();
        console.log("book genre selected, returning genreId: ", e.target.value);
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

        return uniqueAuthorList.map((authorname, index) => {
            return (
                <div key={index} value={authorname} onClick={handleAuthorSelect}>
                    {authorname}
                </div>
            )
        })
    }

    function handleTitleInput() {
        const filteredTitleList = library && library.filter(book => {
            return (bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase()))
        });

        return filteredTitleList.map((book, index) => {
            return (
                <div key={index} value={book.title} onClick={handleSelect}>
                    {book.title}
                </div>
            )
        }
        )
    }

    function handleSelect(e) {
        console.log("Title Selected: ", e.target.lastChild.data);
        setBookTitle(e.target.lastChild.data);
    }

    function handleAuthorSelect(e) {
        console.log("Author Selected: ", e.target.firstChild.data);
        setBookAuthor(e.target.firstChild.data);
    }

    //#endregion handling author title

    //#region handling book cover

    function renderImages(props, key) {          //returns when search params return true
        console.log("renderImages called");
        return (
            <div value={props} key={key} onClick={handleSelectImage}>
                <img style={styles.bookCoverBorder} src={props.imageURL} />
            </div>
        )
    };

    function handleSelectImage(e) {             //onclick image, set bookCover
        console.log("index.js line 164 - e.target.src ", e.target.src);
        setBookCover(e.target.src);
    };

    function handleBookCoverInput() {
        const filteredlist = library && library.filter(book => {      //
            if (bookAuthor && book.author.toLowerCase().includes(bookAuthor.toLowerCase())) {
                if (bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                    return book;
                } else if (!bookTitle) {
                    return book;
                }
            } else if (!bookAuthor && bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                return book;
            }
        });
    };

    function renderInsertImage() {      //returns when search params return false, or if button is clicked
        return (
            <div style={styles.defaultImageBlock}>
                <p style={styles.justifyCenter}> It seems this particular book has yet to be in our library!</p>
                <p style={styles.justifyCenter}> Please upload a valid image URL in our form so that users can see the cover of the book</p>
            </div>
        )
    };

    function renderDefaultImageBlock() {
        return (
            <div style={styles.defaultImageBlock}>
                <p>Key in some info about your book in the fields to your left!</p>
                <img src={logo} alt="splash screen" />
            </div>
        )
    };

    function handleLibraryImg() {
        const filteredlist = library && library.filter(book => {                                                     //filter logic
            if (bookAuthor && book.author.toLowerCase().includes(bookAuthor.toLowerCase())) {
                if (bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                    return book;
                } else if (!bookTitle) {
                    return book;
                }
            } else if (!bookAuthor && bookTitle && book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
                return book;
            }
        });
        // console.log("filtered list :", filteredlist);

        if (filteredlist.length > 0) {
            return filteredlist.map((book, key) => {
                return renderImages(book, key);
            });
        } else if (bookAuthor || bookTitle) {
            return renderInsertImage();
        } else if (bookAuthor === "" && bookTitle === "") {
            return renderDefaultImageBlock();
        };
    };

    //#endregion handling book cover

    //#region alternate image handling (NOT IN USE)

    // function newInsertImage() {            //optional input for user to upload a new book cover
    //     return (
    //         <div style={styles.manualInsertContainer}>
    //             <div style={styles.manualInsertButton} onClick={handleNewImage}>Click here to upload a new cover!</div>
    //             {showInsertImage ? renderInsertImage() : <></> }
    //         </div>
    //     )
    // };

    // function handleNewImage() {             //state changer to show child if user requires
    //     if (showInsertImage) {
    //         setShowInsertImage(false);
    //     } else if (!showInsertImage) {
    //         setShowInsertImage(true);
    //     }
    // };

    //#endregion alternate image handling

    //#region swap image handling (NOT IN USE)

    // function insertSwapImage() {             //component to handle user's book image
    //     return
    //     <ImageUploading></ImageUploading>
    // }

    //#endregion swap image handling

    //#region submit function
    //actual submit function
    const handleSubmit = async (e) => {

        // client side data vetting here
        let errorMsg = 'Error: Please provide ';
        let originalLength = errorMsg.length;        
        if (bookTitle.length === 0 || bookTitle.length > 100) {
            errorMsg = errorMsg + `- a valid title not longer than 100 chars `;
        };
        if (bookAuthor.length === 0 || bookAuthor.length > 100) {
            errorMsg = errorMsg + `- a valid author name not longer than 100 chars`;
        };

        if (errorMsg.length > originalLength) {
            setAlertText(errorMsg);
            setToggleAlert(true);
            return;
        };

        try {

            const result = await authWrapper(bookAPI.post("protected/uploadbook", {
                userid: user.userId,            //done
                booktitle: bookTitle,           //done
                bookauthor: bookAuthor,         //done
                bookgenre: bookGenreId,         //done
                bookyear: bookYear,             //done
                usercomments: bookComments,     //done
                bookcover: bookCover,           //bugged, values managed to pass to backend but post not processing..
            }), signOut)

            if (result.response) {
                if (!result.response.data.data) {
                    console.log("result is null, API call failed");
                    setAlertText(result.response.data.message);
                    setToggleAlert(true);
                    return;
                };
            };

            console.log("Submitted form to backend successfully.");            
            setMsg(result.data.message)
            setLoading(true)
            setTimeout(() => {
                return navigate('/account');
            }, 2000);

        } catch(error) {
            console.log("uncaught error at handleSubmit: ", error);
        };

        // await authWrapper(bookAPI.post("protected/uploadbook", {
        //     userid: user.userId,            //done
        //     booktitle: bookTitle,           //done
        //     bookauthor: bookAuthor,         //done
        //     bookgenre: bookGenreId,         //done
        //     bookyear: bookYear,             //done
        //     usercomments: bookComments,     //done
        //     bookcover: bookCover,           //bugged, values managed to pass to backend but post not processing..
        // }), signOut).then((response) => {
        //     console.log("Submitted form to backend successfully.");
        //     console.log(response);
        //     setMsg(response.data.message)
        //     setLoading(true)
        //     setTimeout(() => {
        //         return navigate('/account');
        //     }, 2000);
        // }).catch((error) => {
        //     console.log("error obj: ", error);
        //     setMsg(error.data.message)         //flagging an error on chrome log.. not sure what's happening here.
        // })
    }

    //#endregion submit function

    //#region CODE RENDERING CHUNK

    return (
        <div style={styles.uploadBookContainer}>
            <div >
                <DialogAlert
                    open={toggleAlert}
                    onClick={() => {
                        setAlertText("");
                        setToggleAlert(false);
                        }
                    }
                    bodytext={alertText}
                    buttonLabel='Ok'
                />
                <form>
                    <h1 style={styles.h1Font}>Upload to BookLoop!</h1>
                    <p style={styles.h2Font}>What book would you like to upload today?</p>

                    <div>
                        <label style={styles.textBold}>Book Author:</label>
                        <br />
                        <TextInput req={true} type="text" name="Author of the book" value={bookAuthor} setValue={setBookAuthor} />
                        <br />
                        {handleAuthorInput()}
                        <br />
                        <label style={styles.textBold}>Book Title: </label>
                        <br />
                        <TextInput req={true} type="text" name="Title of the book" value={bookTitle} setValue={setBookTitle} />
                        {handleTitleInput()}

                        <br /><br />
                        <label style={styles.textBold}>Book Cover Image URL: </label>
                        <br />
                        <TextInput req={true} type="text" name="Image of Book Cover" value={bookCover} setValue={setBookCover} />
                        {handleBookCoverInput()}

                        <br /><br />
                        <label style={styles.textBold}> Genre: </label>
                        {genreList.length > 0 ? <select
                            value={bookGenreId}
                            onChange={handleOption}
                            name="bookgenre"
                            id="bookgenre"
                        > <DisplayOptionGenres /> </select> : <div></div>}

                        <br /><br />

                        <label style={styles.textBold}> Year of Publishing: </label>
                        <br />
                        <TextInput type="text" name="Year book was published" value={bookYear} setValue={setBookYear} />

                        <br /><br />

                        <label style={styles.textBold}> Comments: </label>

                        <br />

                        <TextInput type="text" name="Comments on book's physical condition" value={bookComments} setValue={setBookComments} />

                        <br /><br />
                        {/*
                    Setting this aside temporarily

                    <label for='bookreview'> Book Review (Optional): </label><br/>
                    <textarea>Occaecat nulla deserunt exercitation adipisicing reprehenderit veniam excepteur laborum duis eiusmod elit reprehenderit elit. Pariatur quis consequat qui est occaecat ut enim sit. Laboris enim commodo excepteur excepteur.
                    Est deserunt laboris voluptate duis quis amet eu nisi nostrud proident laborum fugiat occaecat. Voluptate labore qui do dolore. Cillum sunt commodo eiusmod sit adipisicing non. Irure sint dolore in ex labore. Commodo in fugiat et eu irure anim eu nisi adipisicing sint consequat.</textarea><br/><br/> 
                    */}

                        <MyButton name={loading ? "Uploaded!" : "Upload This Book"}
                            type={"button"}
                            handle={
                                () => handleSubmit()
                            }
                        />
                        {/* <LoadingButton
                            style={{ ...styles.loadingButton, textTransform: "inherit" }}
                            onClick={handleSubmit}
                            loading={loading}
                            loadingIndicator="Uploaded!"
                            variant="outlined"
                        >Upload This Book</LoadingButton>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                sx={styles.button}
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                Upload
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: "green",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box> */}
                    </div>
                </form>
            </div>

            <div style={styles.bookCoverContainer}>
                {/* {bookAuthor || bookTitle ? newInsertImage() : <></>} */}
                {handleLibraryImg()}
            </div>
        </div>
    )
};
//#endregion RENDERING CODE CHUNK

export default UploadBook;



