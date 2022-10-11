import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Theme from './Theme';

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <ThemeProvider theme={Theme}>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* Desktop View */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                          Responsive Navbar
                        </Typography>

                        {/* Mobile View */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu} style={{ display: 'flex', flexDirection: 'column' }}>

                                    <Button
                                    >
                                        <Link className='mobile-nav-link' to="/"><Typography sx={{ color: '', display: 'block', fontFamily: 'Roboto' }} textAlign="center">Home</Typography></Link>
                                    </Button>
                                    <Button
                                    >
                                        <Link
                                        className='mobile-nav-link'
                                         to="/about"><Typography sx={{ color: '', display: 'block', fontFamily: 'Roboto' }} textAlign="center">About</Typography></Link>
                                    </Button>
                                    <Button
                                    
                                    >
                                        <a className='mobile-nav-link' href="#"><Typography sx={{ color: '', display: 'block', fontFamily: 'Roboto' }} textAlign="center">Blog</Typography>
                                        </a>
                                    </Button>
                                    <Button
                                    >
                                        <Link
                                        className='mobile-nav-link'
                                         to="/projects"><Typography sx={{ color: '', display: 'block', fontFamily: 'Roboto' }} textAlign="center">Projects</Typography></Link>
                                    </Button>
                                </MenuItem>

                            </Menu>
                        </Box>

                        {/* Mobile View */}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                           Responsive Navbar
                        </Typography>

                        {/* Desktop View */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>

                            <Button
                            >
                                <Link to="/"><Typography sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Roboto' }} textAlign="center">Home</Typography></Link>
                            </Button>
                            <Button
                            >
                                <Link to="/about"><Typography sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Roboto' }} textAlign="center">About</Typography></Link>
                            </Button>
                            <Button
                            >
                                <a href="#"><Typography sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Roboto' }} textAlign="center">Blog</Typography>
                                </a>
                            </Button>
                            <Button
                            >
                                <Link to="/projects"><Typography sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Roboto' }} textAlign="center">Projects</Typography></Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default NavBar;
