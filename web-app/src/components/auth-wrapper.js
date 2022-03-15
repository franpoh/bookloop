import { history } from "./history";
// part of history library
// https://github.com/remix-run/history/blob/3e9dab413f4eda8d6bce565388c5ddb7aeff9f7e/docs/navigation.md

import callAlertOnce from "./call-alert-once";

const authWrapper = (apiCall, signOut) => {

    // return api call result if successful
    return apiCall.then((res) => {
        return res;
    }).catch((err) => {

        // catch 403 errors, which come from authentication token checking
        if (err.response.status === 403) {
            signOut();
            callAlertOnce("You are not logged in! Redirecting...");
            return history.push("/bookloop/access"); // Push a new entry onto the history stack.

        // catch 401 errors, which come from user permission checking
        } else if (err.response.status === 401) {
            callAlertOnce(err.response.data.message);
            return history.push("/bookloop/");

        } else {
            console.log("AUTHWRAPPER", err.response);
            return err;
        }
    })
}


export default authWrapper;
