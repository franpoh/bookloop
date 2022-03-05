const callAlertOnce = ((text) => {
    let executed = false;
    return (text) => {
        if (!executed) {
            executed = true;
            alert(text);
            setTimeout(() => {
                executed = false;
            }, 3000);
        }
    } 
})();

export default callAlertOnce;