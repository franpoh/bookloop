import axios from "axios";

const bookAPI = axios.create({
    baseURL: "https://book-libraryshop.herokuapp.com/",
    withCredentials: true   
});

export default bookAPI;