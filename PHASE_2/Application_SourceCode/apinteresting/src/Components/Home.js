import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider
} from '@material-ui/core';
import background from './stockbackground.jpg';

const useStyles = makeStyles((theme) => ({
  headerBackground: {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
    backgroundSize: 'auto',
    backgroundPosition: 'center center',
    padding: '30px',
    minHeight: '200px',
    color: 'white',
  },
  headerIntroduction: {
    fontSize: '1.2rem'
  },
  root: {
    flexGrow: 1,
    fontSize: '1rem'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  description: {
    fontSize: '1rem',
    padding: '0.5rem'
  },
  functionLinks: {
    fontSize: '1rem',
  }
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.headerBackground}>
            <h1>APInteresting</h1>
            <article className={classes.headerIntroduction}>
              Welcome to our application! We are aiming to provide data related to
              diseases collected from multiple data sources for...
              <ul>
                <li>Data Scientists</li>
                <li>Medical Officers</li>
                <li>Academic Medical Researchers</li>
                <li>Public people</li>
                <li>Whoever wishes to visualize or examine the impact of diseases</li>
              </ul>
            </article >
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Articles
                </Typography>

              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                Looking for articles for specific disease?
                Have a look into the list of articles stored in our database,
                with reports generated from the content.
                or you may also filter the list by keyword or time interval.
                </Typography>
            </CardContent>
            <Divider />
            <CardActionArea href="/article-list">
              <CardActions>
                <Button size="small" color="primary" className={classes.functionLinks}>
                  Enter
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Social Impact
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                Diseases can sometimes impactful to the world. Public are searching for diseases.
                Stock markets are trading...
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                We tried to integrate as much as data that may imply those impacts on the diseases.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button size="small" color="primary" href="/social-impacts/trends" className={classes.functionLinks}>
                Google Trends
                </Button>
              <Button size="small" color="primary" href="/social-impacts/stocks" className={classes.functionLinks}>
                Stock Market
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Statistics
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                Data, data, data! Numbers are changing and they are telling stoies.
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                We provides raw data or visualized data. Take whatever you need for further analysing,
                or even just for your interested.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button size="small" color="primary" href="/alerts" className={classes.functionLinks}>
                General
              </Button>
              <Button size="small" color="primary" href="/cov19" className={classes.functionLinks}>
                COV-19 Impact
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Health Care Tips
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                Know more to protect well in the outbreak.
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                Here are some ideas and tips that you should know to protect yourself or you family members
                from being infected. Check this out!
              </Typography>
            </CardContent>
            <Divider />
            <CardActionArea href="/health-care">
              <CardActions>
                <Button size="small" color="primary" className={classes.functionLinks}>
                  Enter
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>



    </div>

  );
}
