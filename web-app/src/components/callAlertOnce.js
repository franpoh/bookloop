const callAlertOnce = ((text) => {
    let executed = false;
    return (text) => {
        if (!executed) {
            executed = true;
            alert(text);
            setTimeout(() => {
                executed = false;
            }, 2000);
        }
    } 
})();

export default callAlertOnce;