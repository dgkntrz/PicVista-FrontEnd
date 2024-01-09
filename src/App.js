import './App.css';
import Header from './header/Header';
import Login from './login/Login';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './signup/Signup';
import ImageScreen from './body/ImageScreen';

function App() {
  const [loginDialogToggle, setLoginDialogToggle] = React.useState(false);
  const [signDialogToggle, setSignDialogToggle] = React.useState(false);
  const [leftNavBarToggle, setLeftNavBarToggle] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  

  const loginDialogOpen = () => {
    setSignDialogToggle(false);
    setLoginDialogToggle(true);
  };

  const loginDialogClose = () => {
    setLoginDialogToggle(false);
  };

  const signDialogOpen = () => {
    setLoginDialogToggle(false);
    setSignDialogToggle(true);
  };

  const signDialogClose = () => {
    setSignDialogToggle(false);
  };

  const showSuccessMessage = (message) => {
      toast.success(message, {position: toast.POSITION.TOP_RIGHT})
  }

  const showErrorMessage = (message) => {
    toast.error(message, {position: toast.POSITION.TOP_RIGHT})
}
  

  return (
    <div className="App">
      <Header loginDialogOpen={loginDialogOpen} leftNavBar={leftNavBarToggle} setLeftNavBarOpen={setLeftNavBarToggle} userName={userName}/>
      <Login
        open={loginDialogToggle}
        openSignDialog={signDialogOpen}
        onClose={loginDialogClose}
        setUserName={setUserName}
        toastSuccess={showSuccessMessage}
        toastError={showErrorMessage}
      />
      <Signup
        open={signDialogToggle}
        openLoginDialog={loginDialogOpen}
        onClose={signDialogClose}
        toastSuccess={showSuccessMessage}
        toastError={showErrorMessage}
      />
      <ImageScreen toastSuccess={showSuccessMessage}
        toastError={showErrorMessage}
        userName={userName}/>
      <ToastContainer />
    </div>
  );
}

export default App;
