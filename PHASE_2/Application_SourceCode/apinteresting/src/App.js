import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Map from './Components/Map'
import Alerts from './Components/Alerts'
import SocialMedia from './Components/SocialMedia'
import HealthCare from './Components/HealthCare'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import ArticleListPage from './Components/ArticleListPage';
import StockMarketPage from './Components/StockMarketPage';


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
  const [title, setTitle] = useState('Home');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar pageName={title} />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/map" component={Map} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/article-list" component={ArticleListPage} />
            <Route path="/social-media/trends" component={SocialMedia} />
            <Route path="/social-media/stocks" component={StockMarketPage} />
            <Route path="/health-care" component={HealthCare} />
            <Route path="/" component={Home} />
          </Switch>


        </main>
      </BrowserRouter>
    </div >
  );
}
