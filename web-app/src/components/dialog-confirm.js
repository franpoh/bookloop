import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import styles from "../styling/style-sheet";

export default function DialogConfirm( props ) {

    // props from parent need:
    // open=true/false
    // bodytext='Whatever to appear in box'
    // onClickA={function in parent that sets open to false}    
    // buttonLabelA='Whatever to appear as button'
    // onClickB
    // buttonLabelB

    return (
        <div>
            <Dialog
                open={props.open}
                // onClose={props.onClose} disabling this shuts off background clicks
                aria-describedby='dialog-confirm-textbox'
            >
                <DialogContent>
                    <DialogContentText id='dialog-confirm-textbox'>
                        <i>{props.bodytext}</i>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClickA}>{props.buttonLabelA}</Button>
                    <Button onClick={props.onClickB}>{props.buttonLabelB}</Button>
                </DialogActions>

            </Dialog>
        </div>
    );

};