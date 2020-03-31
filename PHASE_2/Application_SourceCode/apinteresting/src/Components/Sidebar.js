import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Redirect, Link, Route, Switch, withRouter } from 'react-router-dom'



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
        sidenav_text: {
            textDecoration: 'none',
            fontSize: 18

        }
    }));

    const classes = useStyles()


    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>

                <ListItem>
                    <ListItemText><Link to="/article-list" className={classes.sidenav_text} >Article List</Link></ListItemText>
                </ListItem>
                <ListItem>
                    <Link to="/alerts" className={classes.sidenav_text} >Alerts</Link>
                </ListItem>
                <ListItem>
                    <Link to="/social-media" className={classes.sidenav_text} >Social Media</Link>
                </ListItem>

            </List>
        </Drawer >);

}



