import React from "react";
import bookAPI from "../../../API/book-api";

// email: "shepard@normandy.com",
// password: "fuckreapers"

function Login() {
    const [email, setEmail] = React.useState('shepard@normandy.com');
    const [pwd, setPwd] = React.useState('fuckreapers');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = await bookAPI.post("/general/login",
            { 
                email: email, 
                password: pwd 
            }  
        ).then((response) => {
            return response.data;
        });
        console.log("login.js", result);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    autoComplete="off"
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;

