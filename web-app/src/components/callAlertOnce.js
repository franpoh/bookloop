import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const callAlertOnce = (() => {
    let executed = false;
    return (text) => {
        if (!executed) {
            executed = true;
            alert(text);
            setTimeout(() => {
                executed = false;
            }, 2000);
        }
    } 
})();

export default callAlertOnce;