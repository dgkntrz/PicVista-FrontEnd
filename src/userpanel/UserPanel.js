import './UserPanel.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import { putWithParams } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';
import TextField from '@mui/material/TextField';
import ImageScreen from '../body/ImageScreen';


export default function UserPanel(props) {

    const { userName, toastSuccess, toastError, logOut, setUserName, deleteAccount } = props;
    const userNameRef = React.useRef();
    const passwordRef = React.useRef();

    function update() {
        if (userName === userNameRef.current.value) {
            if (passwordRef.current.value !== "" && passwordRef.current.value.length < 7) {
                toastError("Password must be at least 7 characters");
            }
            else {
                putWithParams(Urls.loginServiceBaseURL + Urls.manageUserBasePath + Urls.updatePassword, { "userName": userName, "password": passwordRef.current.value });
                toastSuccess("Password updated.");
            }
        }
        else {
            putWithParams(Urls.loginServiceBaseURL + Urls.manageUserBasePath + Urls.updateUserName, { "oldUserName": userName, "newUserName": userNameRef.current.value })
            toastSuccess("User name updated.");
            if (passwordRef.current.value !== "") {
                if (passwordRef.current.value.length < 7) {
                    toastError("Password must be at least 7 characters");
                }
                else {
                    putWithParams(Urls.loginServiceBaseURL + Urls.manageUserBasePath + Urls.updatePassword, { "userName": userNameRef.current.value, "password": passwordRef.current.value });
                    toastSuccess("Password updated.");
                }
            }
            setUserName(userNameRef.current.value);


        }


    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={5}>
                <Grid xs={5} container spacing={2} columns={15}>
                    <Grid item xs={15} >
                    </Grid>
                    <Grid item xs={15} className='panelHeader'>
                        User Information
                    </Grid>
                    <Grid item xs={15} spacing={2}>
                        <TextField style={{ marginRight: "1em" }} inputRef={userNameRef} id="outlined-basic" label="User name" variant="outlined" defaultValue={userName} />
                        <TextField style={{ marginLeft: "1em" }} inputRef={passwordRef} id="outlined-basic" label="New Password" variant="outlined" type='password' />
                    </Grid>
                    <Grid item xs={15} spacing={2}>
                        <Button style={{ marginRight: "1em" }} onClick={update} variant='contained'>Update</Button>
                        <Button style={{ marginRight: "1em", marginLeft: "1em" }} onClick={logOut} variant='contained'>Log out</Button>
                        <Button style={{ marginLeft: "1em" }} onClick={deleteAccount} variant='contained'>Delete Account</Button>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={2}>
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