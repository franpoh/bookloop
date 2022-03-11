import { history } from "./history";
import callAlertOnce from "./call-alert-once";

const authWrapper = (apiCall, signOut) => {

    // return api call result if successful
    return apiCall.then((res) => {
        return res;
    }).catch((err) => {
        // error catching time
        
        if (err.response.status === 403) {
            signOut();
            callAlertOnce("You are not logged in! Redirecting...");

            return history.push("/access");
            // Push a new entry onto the history stack.
            // part of history library
            // https://github.com/remix-run/history/blob/3e9dab413f4eda8d6bce565388c5ddb7aeff9f7e/docs/navigation.md

        } else if (err.response.status === 401) {
            console.log("AUTHWRAPPER", err.response);
            callAlertOnce(err.response.data.message);
            return history.push("/");

        } else {
            console.log("AUTHWRAPPER", err);
            return err;
        }
    })
}


export default authWrapper;
