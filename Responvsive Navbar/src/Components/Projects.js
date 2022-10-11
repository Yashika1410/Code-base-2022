import React from 'react';
import { Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import '../assets/style.css';
import Image from '../assets/home2.svg';

const Home = () => {
    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>
                <Box className='home-body' style={{ display: 'flex' }}>
                    <h1>Project Page</h1>    
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}
export default Home;