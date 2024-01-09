import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import './Login.css';
import { DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { postRequest } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';


export default function Login(props) {
    const { onClose, open, openSignDialog, setUserName, toastSuccess, toastError } = props;

    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClose = () => {
        onClose();
    };

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    async function login() {
        try{
            const response = await postRequest(Urls.loginServiceBaseURL + Urls.loginBasePath, { "userName": name, "password": password })
            setUserName(response.data);
            toastSuccess("Logged in successfully");
            handleClose();
        } catch (ex){
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
                <DialogTitle style={{ color: "blue", fontSize: "30px" }}><div className='dialogText'>Login Form</div></DialogTitle>
            </div>

            <div className='loginComp'>
                <TextField onChange={onNameChange} id="outlined-basic" label="User name" variant="outlined" />
            </div>
            <div className='loginComp'>
                <TextField onChange={onPasswordChange} id="outlined-basic" label="Password" variant="outlined" type="password" />
            </div>
            <div className='loginComp'>
                Don't have an account? Click <a onClick={openSignDialog}>here</a>
            </div>
            <div className='loginComp'>
                <a>Forgot Password?</a>
            </div>
            <div className='loginComp' >

                <Button onClick={login} variant="contained">
                    <div className='dialogText'>Log in</div>
                </Button>

            </div>

        </Dialog>
    );
}

Login.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
