import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

//The majority of browsers currently expose a history object on the DOM's Window object, which is used to access the browser's session history and navigate
// React Router uses the history package, which builds on the browser history API to provide an interface to which we can use easily in React apps.

// https://github.com/remix-run/history

// The history library lets you easily manage session history anywhere JavaScript runs. 
// A history object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.