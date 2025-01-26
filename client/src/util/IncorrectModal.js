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
    bgcolor: 'rgba(178, 0, 0, 0.8)',
    borderRadius: '8px',
    boxShadow: '0px 0px 0px 2px rgba(178, 0, 0, 0.8)', 
    p: 4,
    textAlign: 'center',
};

export default function IncorrectModal({ open, handleClose, correctAnswer }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom color="">
                    Incorrect!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    The correct answer is: <strong>{correctAnswer}</strong>
                </Typography>
                <Button onClick={handleClose} variant="outlined" color="" sx={{ mt: 3 }}>
                    Continue
                </Button>
            </Box>
        </Modal>
    );
}
