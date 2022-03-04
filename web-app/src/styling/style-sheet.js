import colours from "./colours";

const fontType = "sans-serif";

const styles = {
    topBar: {
        width: "100vw",
        height: "15vh",
        backgroundColor: colours.secondaryLight,
    },

    topBarTemp: {
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
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px"
    },

    containerAlt: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    alignCentre: {
        alignSelf: "center"
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
        color: colours.baseDark
    },

    textBold: {
        fontFamily: fontType,
        fontWeight: 'normal',
        color: colours.secondaryDark
    },

    textBox: {
        height: "50px",
        width: "300px",
        marginTop: "20px"
    },

    // g1
    displayArea: {        
        marginLeft: '3vw',        
        width: "50vw",        
        borderWidth: 1,
    },

    displayRow: {
        display: 'flex',
    },

    displayCard: {
        // width: '10%',
        paddingLeft: '2vw',
        paddingRight: '2vw',
        display: 'block',        
        /* color: black; */    
        alignItems: 'flex-start',
        textAlign: 'start',
        // borderWidth: 'thin',
        /* border-color: black; */
        // borderStyle: 'solid',
    },

    divider: {
        // color: '#000000',
        backgroundColor: 'transparent',
        height: .5,
        width: '80%',
        borderColor : colours.baseGrey,
        marginLeft: '0vw',
    },

}

export default styles;