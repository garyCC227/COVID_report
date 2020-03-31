import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Map from './Components/Map'
import { BrowserRouter, Redirect, Link, Route, Switch, withRouter } from 'react-router-dom'


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
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <BrowserRouter>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/map" component={Map} />
            <Route path="/" component={Home} />
          </Switch>


        </main>
      </BrowserRouter>
    </div >
  );
}
