import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import './FileUpload.css';
import { DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { postRequest, postRequestWithConfig } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';
import { styled } from '@mui/material/styles';
import FileUpload from 'react-material-file-upload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileUploadComponent(props) {
    const { open, fileUploadState, toastSuccess, toastError, userName, imagesUpdated } = props;

    const [files, setFiles] = React.useState(null);

    const titleRef = React.useRef();
    const descriptionRef = React.useRef();

    const handleClose = () => {
        fileUploadState(false);
    };

    const onFileSelected = (event) => {
        setFiles(event)
    }

    async function upload() {
        try {
            const formData = new FormData();
            formData.append("author", userName);
            formData.append("description", descriptionRef.current.value);
            formData.append("title", titleRef.current.value);
            formData.append("image", files[0]);

            await postRequest(Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.addImagePath,
                formData)

            setFiles([]);

            imagesUpdated();

            toastSuccess("Image Posted!");
            handleClose();
        } catch (ex) {
            toastError(ex.response.data);
        }



    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <div className='loginTitle'>
                <DialogTitle style={{ color: "blue", fontSize: "30px" }}><div className='dialogText'>Upload Image</div></DialogTitle>
            </div>

            <div className='loginComp'>
                <TextField inputRef={titleRef} id="outlined-basic" label="Title" variant="outlined" />
            </div>
            <div className='loginComp'>
                <TextField inputRef={descriptionRef} id="outlined-basic" label="Description" variant="outlined" />
            </div>

            <div className='loginComp' >

                <FileUpload value={files} onChange={onFileSelected} />
            </div>


            <div className='loginComp' >

                <Button onClick={upload} variant="contained">
                    <div className='dialogText'>Upload!</div>
                </Button>

            </div>

        </Dialog>
    );
}

FileUploadComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
