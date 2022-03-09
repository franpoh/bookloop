// libraries
import React from 'react';

// styling
import styles from "../../../styling/style-sheet.js";
import colours from '../../../styling/colours.js';

// folder sub-components
import DisplaySwapDetails from './display-swap-details';

function DisplaySwapInventory ( props ) {

    return (
        <>
            <h3 style={{ ...styles.textBold, fontSize: '1em' }}>Inventory available: {props.matchSwap.length}</h3>
            {(props.matchSwap.length > 0) && props.matchSwap.map(( swapItem ) => {
                return (
                    <div key={swapItem.data.swapId} style={{ ...styles.containerRowList, lineHeight: '1' }}>
                        <a title="Click to buy item" 
                            onClick={async () => {
                                if (!props.userToken) { // block if no token
                                    return;
                                };
                                if (props.user.points < swapItem.data.price) { // check for enough points
                                    props.passToggleAlert(true)
                                    // setToggleAlert(true);
                                    return;
                                };

                                props.passToggleConfirm({
                                    status: true,
                                    swapId: swapItem.data.swapId,
                                    bodytext: `Confirm purchase of ${props.matchIndex.title}, serial ${swapItem.data.swapId}?`
                                });
                                return;
                            }}
                            style={{
                                ...styles.textBox,
                                textDecoration: 'none',
                                height: 'auto',
                                width: '35vw',
                                backgroundColor: colours.baseWhite
                            }}
                        >
                            <DisplaySwapDetails data={swapItem}/>
                        </a> 
                    </div>                    
                );
            })}
        </>
    );
};

export default DisplaySwapInventory;