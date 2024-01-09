import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import './Signup.css';
import { DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { postRequest } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';


export default function Signup(props) {
    const { onClose, open, openLoginDialog, toastSuccess, toastError } = props;

    const [passwordNotValid, setPasswordNotValid] = React.useState(false);

    const userNameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const retypePasswordRef = React.useRef();



    const handleClose = () => {
        onClose();
    };


    async function signUp() {

        if (passwordRef && passwordRef.current && passwordRef.current.value.length > 6) {

        }
        else {
            toastError("Password must be longer than 6 characters!");
            return;
        }

        try{
            await postRequest(Urls.loginServiceBaseURL + Urls.signupBasePath, 
                { "userName": userNameRef.current.value, "password": passwordRef.current.value, "mail": emailRef.current.value });
            toastSuccess("Account created! Please log in");
            handleClose();
        }catch (ex){
            toastError(ex.response.data);
        }
        
   
        
    };

    function passwordValidation() {
        if (passwordRef && passwordRef.current && retypePasswordRef && retypePasswordRef.current && passwordRef.current.value != '' && retypePasswordRef.current.value != '') {
            if (passwordRef.current.value !== retypePasswordRef.current.value) {
                setPasswordNotValid(true);
                return;
            }
        }
        setPasswordNotValid(false);
    }



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
                <DialogTitle style={{ color: "blue", fontSize: "30px" }}><div className='dialogText'>Create Account</div></DialogTitle>
            </div>

            <div className='loginComp'>
                <TextField inputRef={userNameRef} id="outlined-basic" label="User name" variant="outlined" />
            </div>
            <div className='loginComp'>
                <TextField inputRef={emailRef} id="outlined-basic" label="Email" variant="outlined" />
            </div>
            <div className='loginComp'>
                <TextField onChange={passwordValidation} helperText={"Must be longer than 6 characters"} inputRef={passwordRef} id="outlined-basic" label="Password" variant="outlined" type="password" />
            </div>
            <div className='loginComp'>
                <TextField onChange={passwordValidation} inputRef={retypePasswordRef} error={passwordNotValid} id="outlined-basic" label="Re-type Password" variant="outlined" type="password" />
            </div>
            <div className='loginComp'>
                Already have an account? Click <a onClick={openLoginDialog}>here</a>
            </div>
            <div className='loginComp' >

                <Button onClick={signUp} variant="contained">
                    <div className='dialogText'>Sign Up</div>
                </Button>

            </div>

        </Dialog>
    );
}

Signup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
