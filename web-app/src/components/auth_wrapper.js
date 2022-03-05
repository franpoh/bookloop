import { history } from "./history";
import callAlertOnce from "./callAlertOnce";

const authWrapper = (apiCall) => {
    return apiCall.then((res) => {
        return res;
    }).catch((err) => {
        callAlertOnce("You are not logged in! Redirecting...");
        return history.push("/access");
        // Push a new entry onto the history stack.
        // part of history library
        // https://github.com/remix-run/history/blob/3e9dab413f4eda8d6bce565388c5ddb7aeff9f7e/docs/navigation.md
    })
}


export default authWrapper;

// Example: let profile = await authWrapper(bookAPI.get('/protected/viewprofile'));

