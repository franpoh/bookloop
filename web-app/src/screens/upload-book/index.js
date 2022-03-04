import React, { useState, useEffect } from "react";
import bookAPI from "../../API/book-api";
import styles from "../../styling/style-sheet";
import Login from "../access/components/login";
import MyUploads from "./myUploads";
import UploadNewBook from "./uploadNewBook";
import MyButton from "../../components/button";

// what functions do i need?
// 1. handle submit button
// 2. handle input > when they type, show suggestion (according to title of book) based on our list of index
// 3. handle if index exists, handle if index doesn't exist.

function UploadBook() {
    const [display, setDisplay] = React.useState(<MyUploads/>);
    const [buttonText, setButtonText] = React.useState("Upload a New Book");

    function handleDisplay() {
        if (buttonText ==="Upload a New Book") {
            setDisplay(<UploadNewBook/>);
            setButtonText("Back to My Uploads");
        } else if (buttonText ==="Back to My Uploads") {
            setDisplay(<MyUploads/>);
            setButtonText("Upload a New Book");
        }
    }
// land on screen, show list of 
    return (
            <div style={styles.marginAtTop}>
                {display}
                <MyButton name={buttonText} handle={handleDisplay}/>
            </div>
    )
}

//             </div>

                            
//                             <div>

//                                 <div>
//                                     Book Suggestions Interface
//                                 </div>

//                                 <br/>

//                                 <div>
//                                     Upload Image Interface
//                                 </div>
                    
//                             </div>
//                             <br/>
//                             <input type='submit' value="Upload to Bookswap"/>

//                         </form>

//                     </div>

//                 </div>
                
//             </div>

//         </>
//     )
// }



export default UploadBook;