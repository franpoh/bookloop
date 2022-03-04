import bookAPI from "../../API/book-api";

async function handleSwapUpload() {
    //try to find book in index, if no index, post index, then post swap.
    //if index exist, add swap to index.
    let result = await bookAPI.post("/protected/uploadbook",
        {
            userid: "8",
            booktitle: "Test Book Title 13",
            bookauthor: "Test Book Author",
            bookgenreId: bookgenre.value,
            bookcomments: "",
            bookreview: "",
        }
    ).then((response) => {
        const { data } = response;
        return data;
    }); 
    return result;
}

export default handleSwapUpload;