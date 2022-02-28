import bookAPI from "../../API/book-api";

async function login() {
    let result = await bookAPI.post("/general/login",
        {
            email: "shepard@normandy.com",
            password: "fuckreapers"
        }
    ).then((response) => {
        const { data } = response;
        return data;
    });
    return result;
}

export default login;