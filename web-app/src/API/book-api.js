import axios from "axios";

const bookAPI = axios.create({
    baseURL: "https://book-libraryshop.herokuapp.com/"       
});

export default bookAPI;