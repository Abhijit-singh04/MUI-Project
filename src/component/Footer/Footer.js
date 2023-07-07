import React from 'react'
import {Typography, Box } from '@mui/material';

function Footer() {
  return (
               
                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright ©AbhijitSingh || '}

                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
           
  )
}

export default Footer