import colours from "./colours";

const fontType = "sans-serif";

const styles = {

    // border: { // Guideline for main body styling
    //     borderLeft: "1px solid black",
    //     borderRight: "1px solid black",
    // },

    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: "1vw",
        paddingRight: "1vw",
        width: "97vw",
        height: "10vh",
        backgroundColor: colours.baseWhite,
        borderBottom: `1px solid ${colours.secondaryLight}`,
        marginBottom: "5vh",
    },

    topBarSpace: {
        display: "flex",
        columnGap: "10px",
        textAlign: "center",
        alignItems: 'center',
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

    justifyCentre: {
        justifyContent: "center",
    },

    headerFont: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.primary,
        fontSize: "50px",
    },

    h1Font: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.primary,
        fontSize: "40px"
    },

    h2Font: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.baseDark,
        fontSize: "30px"
    },

    h3Bold: {
        fontFamily: fontType,
        fontWeight: 'bold',
        color: colours.secondaryDark,
        fontSize: "25px"
    },

    h3Normal: {
        fontFamily: fontType,
        fontWeight: 'normal',
        color: colours.baseDark,
        fontSize: "25px"
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
        backgroundColor: colours.secondaryDark,
        border: "none",
        borderRadius: "5px",
        color: colours.baseWhite,
        fontWeight: "400",
        fontSize: "17px",
        marginLeft: "5px"
    },

    loadingButton: {
        height: "40px",
        width: "174px",
        backgroundColor: colours.secondaryDark,
        border: "none",
        borderRadius: "5px",
        color: colours.baseWhite,
        fontWeight: "400",
        fontSize: "17px",
        marginLeft: "5px"
    },

    dropdown: {
        height: "40px",
        width: "160px",
        backgroundColor: colours.primary,
        border: "none",
        borderRadius: "5px",
        color: colours.baseWhite,
        fontWeight: "400",
        fontSize: "17px",
        padding: "5px"
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
        width: '85%',
        borderColor: colours.baseGrey,
        marginLeft: '0vw',
    },

    accountDivider: {
        borderColor: colours.secondaryLight,
        width: "100%",
    },

    marginAtTop: {
        marginTop: "15vh"
    },

    negativeMarginAtTop: {
        marginTop: "-5vh"
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
    },

    bookList: {
        borderBottom: "lightgrey 1px solid",
        paddingLeft: 11,
        cursor: "pointer"
    },

    //aaron
    uploadBookContainer: {
        display: "flex",
        flexFlow: "row",
        rowGap: "20px",
        padding: "40px",
        paddingTop: "25px",
        width: "55vw",
        backgroundColor: colours.secondaryLight,
        borderRadius: "30px",
        columnGap: "15px",
    },

    inputFieldsContainer: {
        flexGrow: 1,
    },

    bookCoverContainer: {
        flexGrow: 2,
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "space-around",
        justifyContent: "center",
        marginLeft: "5px",
        border: `1px solid ${colours.baseWhite}`,
        borderRadius: "30px",
    },

    bookCoverBorder: {
        justifyContent: "space-between",
        display: "flex",
        height: "180px",
        width: "130px",
        border: `1px solid ${colours.baseGrey}`,
        margin: "20px",
    },

    defaultImageBlock: {
        minWidth: "200px",
        maxWidth: "350px",
        margin: "auto",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },

    manualInsertContainer: {
        display: "flex",
        flexFlow: "column reverse",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "20px",
        height: "180px",
        width: "130px",
        backgroundColor: `${colours.primary}`
    },

    manualInsertButton: {
        margin: "20px",
    },

    //end aaron

    overflowScroll: {
        height: "45vh",
        overflowY: "auto",
        scrollbarColor: `${colours.secondaryDark} ${colours.secondaryLight}`
    },

    dataGrid: {
        height: "72vh",
        width: '45vw',
    },
}

export default styles;