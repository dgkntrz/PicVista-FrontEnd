import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import './ImagePreview.css';
import { DialogContent } from '@mui/material';

export default function ImagePreview(props) {
    const { setOpen, open, image, title } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={'lg'} >
            <DialogContent style={{ overflowX: "clip", backgroundColor: "darkgrey"}}>
                <div style={{ textAlign: "center" }}>
                    <div className='imageHeader'>
                        Title: {title}
                    </div>
                    <div style={{ paddingTop: "1em" }}>
                        <img src={'data:image/jpeg;base64,' + image}></img>
                    </div>
                </div>
            </DialogContent>


        </Dialog>
    );
}

ImagePreview.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
