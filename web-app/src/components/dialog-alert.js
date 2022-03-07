import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import styles from "../styling/style-sheet";

export default function DialogAlert( props ) {

    // props from parent need:
    // open=true/false
    // bodytext='Whatever to appear in box'
    // onClick={function in parent that sets open to false}    
    // buttonLabel='Whatever to appear as button'

    return (
        <div>
            <Dialog
                open={props.open}
                // onClose={props.onClose} disabling this shuts off background clicks
                aria-describedby='dialog-alert-textbox'
            >
                <DialogContent>
                    <DialogContentText id='dialog-alert-textbox'>
                        <i>{props.bodytext}</i>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClick}>{props.buttonLabel}</Button>
                </DialogActions>

            </Dialog>
        </div>
    );

};