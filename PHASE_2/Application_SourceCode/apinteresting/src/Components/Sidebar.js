import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Toolbar } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import StorageIcon from '@material-ui/icons/Storage';
import WarningIcon from '@material-ui/icons/Warning';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';



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
            <Toolbar></Toolbar>
            <List>

                <Link to="/" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText><b>Home</b></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem disabled >Articles</ListItem>
                <Link to="/article-list" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                        <ListItemText>Article List</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/article-storage" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><StorageIcon /></ListItemIcon>
                        <ListItemText>Storage Overview</ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem disabled >Social Impact</ListItem>
                <Link to="/social-impacts/twitter-trends" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><TwitterIcon /></ListItemIcon>
                        <ListItemText>Twitter Trends</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/social-impacts/trends" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                        <ListItemText>Google Trends</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/social-impacts/stocks" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><TrendingDownIcon /></ListItemIcon>
                        <ListItemText>Stock Market</ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem disabled >Statistics</ListItem>
                <Link to="/alerts" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><InsertChartIcon /></ListItemIcon>
                        <ListItemText>Outbreak Statistics</ListItemText>
                    </ListItem>
                </Link>
                <Link to="/cov19" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><WarningIcon /></ListItemIcon>
                        <ListItemText>COV-19 Statistics</ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem disabled >General Help</ListItem>
                <Link to="/health-care" className={classes.sideNavText}>
                    <ListItem button>
                        <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
                        <ListItemText>Health Care Tips</ListItemText>
                    </ListItem>
                </Link>
            </List>
        </Drawer >);

}
