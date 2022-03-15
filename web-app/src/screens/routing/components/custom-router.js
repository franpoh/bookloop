import React from "react";
import { Router } from "react-router-dom";

// added custom router for navigating outside of react context
// https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components
// you can now navigate to specific path, Example: return history.push("/bookloop/access");
// back and forward navigation as well

// Router: The common low-level interface for all router components. 
// The most common use-case for using the low-level <Router> is to synchronize a custom history with a state management lib like Redux or Mobx

// useLayoutEffect: identical to useEffect, but it fires synchronously after all DOM mutations. 
// Use this to read layout from the DOM and synchronously re-render.

// First create a history object (found in components/history.js)
// to be used in CustomRouter

const CustomRouter = ({ history, ...props }) => {
    const [state, setState] = React.useState({
        action: history.action, // action - (string) The current action (PUSH, REPLACE, or POP)
        location: history.location // location - (object) The current location. we are using pathname, path of the URL
    });

    // history.listen detects route change
    // effect runs every time the history dependency changes
    React.useLayoutEffect(() => history.listen(setState), [history]);

    // Wrap with Router
    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

export default CustomRouter;