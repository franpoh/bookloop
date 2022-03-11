// ensure alert is only called once
const callAlertOnce = (() => {
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