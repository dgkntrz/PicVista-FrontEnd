import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function Footer() {
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <BottomNavigation
      style={{ position: "fixed", bottom: "0", width: "100%", backgroundColor: "#1976d2" }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <Button variant='primary' onClick={handleOpen}>Contact Me</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"  style={{fontWeight: 'bold'}}>
            About me
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Thank you for visiting my website! I built this website to practice my skills with React, Spring Boot, MongoDB, Jenkins, Docker and Azure.
          </Typography>
          <Typography id="modal-modal-title" sx={{mt: 2}} variant="h6" component="h2" style={{fontWeight: 'bold'}}>
            Contact me:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email: dogukanterzi@gmail.com
          </Typography>

        </Box>
      </Modal>
    </BottomNavigation>

  );
}