import colours from "./colours";

const fontType = "sans-serif";

const styles = {
    topBar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: "50px",
        width: "100vw",
        height: "10vh",
        backgroundColor: colours.baseWhite,
        borderBottom: `1px solid ${colours.secondaryLight}`
    },

    topBarTemp: { // Temp styling for top bar
        display: "flex",
        columnGap: "10px",
        textAlign: "center",
    },

    container: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        margin: "auto",
        width: "50vw",
        height: "100vh",
    },

    border: { // Guideline for main body styling
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
    },

    containerStart: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        rowGap: "20px"
    },

    containerAlt: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    alignCentre: {
        alignSelf: "center",
    },

    headerFont: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.primary,
        fontSize: "50px"
    },

    h1Font: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.primary
    },

    h2Font: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.baseDark
    },

    h3Bold: {
        fontFamily: fontType,
        fontWeight: 'normal',
        color: colours.secondaryDark
    },

    h3Normal: {
        fontFamily: fontType,
        fontWeight: 'normal',
        color: colours.baseDark
    },

    textNormal: {
        fontFamily: fontType,
        fontWeight: 'normal',
        color: colours.baseDark,
        fontSize: "17px"
    },

    textBold: {
        fontFamily: fontType,
        fontWeight: 'normal',
        color: colours.secondaryDark,
        fontSize: "17px"
    },

    textBox: {
        height: "20px",
        width: "300px",
        padding: "10px",
        border: `1px solid ${colours.primary}`,
        borderRadius: "5px",
        fontSize: "17px"
    },

    button: {
        height: "40px",
        width: "130px",
        backgroundColor: colours.primary,
        border: "none",
        borderRadius: "5px",
        color: colours.baseWhite,
        fontWeight: "400",
        fontSize: "17px"
    },

    msgGap: {
        height: "20px"
    },

    marginAtTop: {
        marginTop: "15vh"
    },

    searcher: {
        marginTop: 20,
        width: 300,
        height: 60,
        fontSize: 20,
        paddingLeft: 10
    }

}

export default styles;