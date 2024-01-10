import './UserPanel.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import { Add, Logout } from '@mui/icons-material';
import { getRequest, getRequestWithConfig, putRequest, putWithParams } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import ImageScreen from '../body/ImageScreen';


export default function UserPanel(props) {

    const { userName, toastSuccess, toastError, logOut, setUserName } = props;
    const userNameRef = React.useRef();
    const passwordRef = React.useRef();

    function update(){
        if (userName === userNameRef.current.value){
            if (passwordRef.current.value !== "" && passwordRef.current.value.length < 7){
                toastError("Password must be at least 7 characters");
            }
            else {
                putWithParams(Urls.loginServiceBaseURL + Urls.manageUserBasePath + Urls.updatePassword, {"userName": userName, "password": passwordRef.current.value});
                toastSuccess("Password updated.");
            }
        }
        else{
            putWithParams(Urls.loginServiceBaseURL + Urls.manageUserBasePath + Urls.updateUserName, {"oldUserName": userName, "newUserName": userNameRef.current.value})
            toastSuccess("User name updated.");
            if (passwordRef.current.value !== ""){
                if (passwordRef.current.value.length < 7){
                    toastError("Password must be at least 7 characters");
                }
                else {
                    putWithParams(Urls.loginServiceBaseURL + Urls.manageUserBasePath + Urls.updatePassword, {"userName": userNameRef.current.value, "password": passwordRef.current.value});
                    toastSuccess("Password updated.");
                }
            }
            setUserName(userNameRef.current.value);
            
            
        }
        
       
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={2}>
                <Grid xs={5} container spacing={2} columns={15}>

                    <Grid item xs={15} >
                    </Grid>
                    <Grid item xs={15} className='panelHeader'>
                        User Information
                    </Grid>
                    <Grid item xs={15}>
                        <TextField inputRef={userNameRef} id="outlined-basic" label="User name" variant="outlined" defaultValue={userName} />
                    </Grid>
                    <Grid item xs={15}>
                        <TextField inputRef={passwordRef} id="outlined-basic" label="New Password" variant="outlined" type='password' />
                    </Grid>
                    <Grid item xs={15}>
                        <Button onClick={update} variant='contained'>Update</Button>
                    </Grid>
                    <Grid item xs={15}>
                        <Button onClick={logOut} variant='contained'>Log out</Button>
                    </Grid>

                    

                </Grid>
                <Grid item xs={1}>
                        <ImageScreen

                            userName={userName}
                            toastSuccess={toastSuccess}
                            toastError={toastError}
                            singleRequest={true}

                        />
                    </Grid>
            </Grid>

        </Box>
    )
}