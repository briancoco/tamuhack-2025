import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)', 
    width: 400,
    bgcolor: 'rgba(25, 195, 109, 0.8)',
    borderRadius: '8px',
    boxShadow: '0px 0px 0px 2px green', 
    p: 4,
    textAlign: 'center',
    zIndex: 1300, 
};

export default function CorrectModal({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom color="">
                    Correct!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Well done! You selected the correct answer.
                </Typography>
                <Button onClick={handleClose} variant="outlined" color="black" sx={{ mt: 3 }}>
                    Continue
                </Button>
            </Box>
        </Modal>
    );
}
