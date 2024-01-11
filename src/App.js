import './App.css';
import Header from './header/Header';
import Login from './login/Login';
import Footer from './footer/Footer'
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './signup/Signup';
import ImageScreen from './body/ImageScreen';
import UserPanel from './userpanel/UserPanel';

function App() {
  const [loginDialogToggle, setLoginDialogToggle] = React.useState(false);
  const [signDialogToggle, setSignDialogToggle] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [page, setPage] = React.useState("main");

  React.useEffect(() => {
    if (localStorage.getItem("userName") && localStorage.getItem("userName") != "" && localStorage.getItem("userName") != null) {
      setUserName(localStorage.getItem("userName"));
    }
  }, []);


  const logOut = () => {
    setUserName("");
    setPage("main");
    showSuccessMessage("Logged out.")
    localStorage.setItem("userName", "");
    localStorage.setItem("password", "");
  }


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
    toast.success(message, { position: toast.POSITION.TOP_RIGHT })
  }

  const showErrorMessage = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT })
  }


  return (
    <div className="App">
      <Header loginDialogOpen={loginDialogOpen} userName={userName} logOut={logOut} setPage={setPage} />
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
      <div style={{paddingTop: "2em"}}>
        {page === "main" ? (
          <ImageScreen toastSuccess={showSuccessMessage}
            toastError={showErrorMessage}
            userName={userName} />
        )
          :
          <UserPanel
            toastSuccess={showSuccessMessage}
            toastError={showErrorMessage}
            userName={userName}
            logOut={logOut}
            setUserName={setUserName}
          />
        }
      </div>
      <Footer/>

      <ToastContainer />
    </div>
  );
}

export default App;
