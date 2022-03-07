import styles from "../../styling/style-sheet";

const logo = require("../../assets/logo.png")

const SplashScreen = () => {
    return (
        <div style={{ ...styles.container, ...styles.justifyCentre }}>
            <img src={logo} alt="splash screen" />
        </div>
    )
}

export default SplashScreen;