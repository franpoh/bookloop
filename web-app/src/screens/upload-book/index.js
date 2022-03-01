import React from "react";

// import API from "../API";
import "./UploadBook.css";

function UploadBook() {
    return(
        <>

            <h1>UploadBook</h1>

            <div className='contentContainer'>

                <div className='leftContainer'>

                    <div className='inputContainer'>

                        <h2>What book would you like to upload today?</h2>
                        
                        <form>

                            <label for='booktitle'> Book Title: </label><br/>
                            <input type='text' id='booktitle' name='booktitle'/><br/><br/>

                            <label for='bookauthor'> Author: </label><br/>
                            <input type='text' id='bookauthor' name='bookauthor'/><br/><br/>

                            <label for='bookgenre'> Genre: </label><br/>
                            <select name='bookgenre' id='bookgenre'>
                                <option value="1">Horror</option>
                                <option value="2">Thriller</option>
                                <option value="3">Mystery</option>
                                <option value="4">Sci-fi</option>
                                <option value="5">Romance</option>
                                <option value="6">Dystopian</option>
                                <option value="7">Self-help</option>
                                <option value="8">Biblography</option>
                                <option value="9">Non-Fiction</option>
                                <option value="10">Fiction</option>
                            </select><br/><br/>

                            <label for='bookyear'> Year of Publishing: </label><br/>
                            <input type='text' id='bookyear' name='bookyear'/><br/><br/>

                            <label for='bookcomments'> Comments: </label><br/>
                            <input type='text' id='bookyear' name='bookyear'/><br/><br/>
                            
                            <label for='bookreview'> Book Review (Optional): </label><br/>
                            <textarea>Occaecat nulla deserunt exercitation adipisicing reprehenderit veniam excepteur laborum duis eiusmod elit reprehenderit elit. Pariatur quis consequat qui est occaecat ut enim sit. Laboris enim commodo excepteur excepteur.
                            Est deserunt laboris voluptate duis quis amet eu nisi nostrud proident laborum fugiat occaecat. Voluptate labore qui do dolore. Cillum sunt commodo eiusmod sit adipisicing non. Irure sint dolore in ex labore. Commodo in fugiat et eu irure anim eu nisi adipisicing sint consequat.</textarea><br/><br/>
                            
                            <input type='submit' value="Upload to Bookswap"/>

                        </form>

                    </div>

                </div>

                <div className='rightContainer'>

                    <div className='suggestionsContainer'>
                        Book Suggestions Interface
                    </div>
                    <div className='uploadImageContainer'>
                        Upload Image Interface
                    </div>
                    
                </div>
                
            </div>

        </>
    )
}



export default UploadBook;