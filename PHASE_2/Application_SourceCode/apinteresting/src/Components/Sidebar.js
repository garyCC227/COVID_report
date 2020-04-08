import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Toolbar } from '@material-ui/core';



export default function Sidebar() {
    const drawerWidth = 240;
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
        sideNavText: {
            textDecoration: 'none',
            fontSize: '1rem',
            color: '#000',
        }
    }));

    const classes = useStyles()

    const [state, setState] = React.useState({
        left: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <Toolbar><b>SENG3011 - APInteresting</b></Toolbar>
            <Divider />
            <List>

                <Link to="/" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/article-list" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemText>Article List</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/social-media" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemText>Social Impact</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/alerts" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemText>Outbreak Info</ListItemText>
                    </ListItem>
                </Link>

            </List>
        </Drawer >);

}
