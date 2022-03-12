import axios from "axios";

const bookAPI = axios.create({
    baseURL: "https://book-libraryshop.herokuapp.com/",
    withCredentials: true // will ensure cookies are passed too   
});

export default bookAPI;