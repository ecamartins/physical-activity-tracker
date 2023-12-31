import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { AppPageType } from './WebsiteWrapper';

interface ResponsiveAppBarProps {
    showProfile: boolean;
    onNavBarClick: (page: AppPageType) => void;
}

function ResponsiveAppBar({ showProfile, onNavBarClick }: ResponsiveAppBarProps) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page: AppPageType) => {
        setAnchorElNav(null);
        onNavBarClick(page);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getMenuItems = () => {
        const items = Object.entries(AppPageType).filter(([_, value]) =>
            isNaN(Number(value)) &&
            value !== AppPageType[AppPageType.HOME] &&
            value !== AppPageType[AppPageType.LOGIN] &&
            value !== AppPageType[AppPageType.LEADERBOARD] &&
            value !== AppPageType[AppPageType.LOG]
        ).map(([key, value]) => {
            return (<MenuItem key={value} onClick={() => onNavBarClick(Number(key) as AppPageType)}>
                <Typography textAlign="center">{value}</Typography>
            </MenuItem>)
        });

        return items;
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DirectionsRunIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={() => onNavBarClick(AppPageType.HOME)} style={{ cursor: "pointer" }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleCloseNavMenu(AppPageType.HOME)}
                    >
                        MvtTracker
                    </Typography>

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
                            {<MenuItem key={AppPageType["LEADERBOARD"]} onClick={() => handleCloseNavMenu(AppPageType.LEADERBOARD)}>
                                <Typography textAlign="center">{AppPageType[AppPageType["LEADERBOARD"]]}</Typography>
                            </MenuItem>}
                            {showProfile && <MenuItem key={AppPageType["LOG"]} onClick={() => handleCloseNavMenu(AppPageType.LOG)}>
                                <Typography textAlign="center">{"ACTIVITY LOG"}</Typography>
                            </MenuItem>}
                        </Menu>
                    </Box>
                    <DirectionsRunIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} style={{ cursor: "pointer" }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleCloseNavMenu(AppPageType.HOME)}
                    >
                        MvtTracker
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {<MenuItem key={AppPageType["LEADERBOARD"]} onClick={() => handleCloseNavMenu(AppPageType.LEADERBOARD)}>
                            <Typography textAlign="center">{AppPageType[AppPageType["LEADERBOARD"]]}</Typography>
                        </MenuItem>}
                        {showProfile && <MenuItem key={AppPageType["LOG"]} onClick={() => handleCloseNavMenu(AppPageType.LOG)}>
                            <Typography textAlign="center">{"ACTIVITY LOG"}</Typography>
                        </MenuItem>}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {showProfile ?
                            <><Tooltip title="Open user options">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar>E</Avatar>
                                </IconButton>
                            </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {getMenuItems()}
                                </Menu></> : <Button size="small" variant="outlined" style={{ backgroundColor: "white" }} onClick={() => onNavBarClick(AppPageType.LOGIN)}>LOGIN</Button>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;