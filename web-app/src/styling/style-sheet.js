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
        borderBottom: `1px solid ${colours.secondaryLight}`,
        marginBottom: "5vh",
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
        height: "100vh",
        width: "50vw",
        rowGap: "20px",
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
        rowGap: "20px",
    },

    containerAlt: {
        display: "flex",
        flexFlow: "column",
        rowGap: "20px",
        padding: "50px",
        paddingTop: "25px",
        width: "45vw",
        backgroundColor: colours.secondaryLight,
        borderRadius: "30px",
    },

    containerRow: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        columnGap: "10px",
        lineHeight: "0"
    },

    containerRowList: {
        display: "flex",
        flexFlow: "row",
        alignItems: 'center',
        columnGap: "50px",
        paddingBottom: "20px"
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
        fontWeight: 'bold',
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
        fontSize: "20px"
    },

    textBold: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.secondaryDark,
        fontSize: "20px"
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

    profilePic: {
        height: "200px",
        width: "200px",
        objectFit: "cover",
        border: `5px solid ${colours.secondaryDark}`,
        borderRadius: "30px"
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
    },

    profileBookPics: {
        height: "100px",
        width: "100px",
        objectFit: "cover",
        border: `5px solid ${colours.secondaryDark}`,
        borderRadius: "30px",
    },

    profileBookDetails: {
        width: "30vw",
    },

    listNoBullets: {
        listStyleType: "none"
    }
}

export default styles;