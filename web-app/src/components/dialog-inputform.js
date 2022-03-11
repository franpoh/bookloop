import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/DialogTitle';

import styles from "../styling/style-sheet";

export default function DialogInputForm( props ) {

    // props from parent need:

    // open=true/false
    // bodytext='Whatever to appear in box text'

    // placeholder='placeholder text in inputbox'
    // value={some setState value}
    // setValue={corresponding setState function}

    // onClickA={function in parent that sets open to false}    
    // buttonLabelA='Whatever to appear as button'
    // onClickB={function in parent that executes next step}
    // buttonLabelB

    return (
        <div>
            <Dialog
                open={props.open}
                // onClose={props.onClose} disabling this shuts off background clicks
                aria-describedby='dialog-inputform-textbox'
            >
                <DialogContent>
                    <DialogContentText id='dialog-inputform-textbox'>
                        <i>{props.bodytext}</i>
                    </DialogContentText>
                    <input
                        type='text'
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={(e) => props.setValue(e.target.value)}
                        autoComplete="off"
                        style={styles.textBox}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClickA}>{props.buttonLabelA}</Button>
                    <Button onClick={props.onClickB}>{props.buttonLabelB}</Button>
                </DialogActions>

            </Dialog>
        </div>
    );

};