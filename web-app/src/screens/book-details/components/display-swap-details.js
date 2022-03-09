// libraries
import React from 'react';

// styling
import styles from "../../../styling/style-sheet.js";
import colours from '../../../styling/colours.js';

function DisplaySwapDetails ({ data }) {

    return(
        <>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                <h3 style={{ ...styles.textBold, fontSize: '0.7em', color: colours.baseDark }}>(Serial {data.data.swapId}) By user: {data.username}</h3>
                <h3 style={{ ...styles.textBold, fontSize: '0.7em', color: colours.baseDark }}>Cost: {data.data.price}</h3>
            </div>
            <div>
                <h3 style={{ ...styles.textBold, fontSize: '0.7em', color: colours.baseDark }}>Condition:</h3>
                {(data.data.comments !== null) ?
                    <h3 style={{ ...styles.textBold, fontSize: '.7em' }}>{data.data.comments}</h3>
                    :
                    <h3 style={{ ...styles.textBold, fontSize: '.7em', color: 'red' }}>USER DID NOT PROVIDE COMMMENT</h3>}
            </div>
        </>        
    );
};

export default DisplaySwapDetails;