import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoBook } from "react-icons/io5";
import { Title } from "./PageTemplateStyles";
import GradeIcon from '@mui/icons-material/Grade';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function getIcon(index) {
    if (index === 0) {
        return <AccountBoxIcon />
    } else if (index === 1) {
        return <AddBoxIcon />
    } else if (index === 2) {
        return <GradeIcon />
    } else if (index === 3) {
        return <LogoutIcon />
    }
}

function getList(user) {
    if (user) {
        return [{ name: "Meu perfil", link: "/user/me" }, { name: "Criar novo post", link: "/new-post" }, { name: "Postagens populares", link: "/top-posts" }, { name: "Logout", link: "/logout" }];
    } else {
        return [{ name: "Fazer login", link: "/login" }, { name: "Criar conta", link: "/register" }];
    }
}

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#24292F' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={"/"} style={{ textDecoration: "none" }}><Title><IoBook style={{ marginRight: "10px" }} />TeachMe</Title></Link>
                    <Link to={"/search"}><div>
                        <AiOutlineSearch style={{ color: "#fff", fontSize: "30px" }} />
                    </div></Link>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {getList(user).map((text, index) => (
                        <ListItem key={text.name} disablePadding onClick={() => { navigate(text.link) }} >
                            <ListItemButton>
                                <ListItemIcon>
                                    {getIcon(index)}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open} style={{ width: '100%', padding: "24px 0" }}>
                <DrawerHeader />
                <Outlet />
                <Footer />
            </Main>
        </Box>
    );
}
