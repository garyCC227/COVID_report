import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  previewText: {
    color: '#000',
  }
}));

const data = {
  "id": "046fu6uh96V9zlcVlUTK",
  "url": "http://www.cidrap.umn.edu/news-perspective/2020/02/canada-lebanon-report-iran-linked-covid-19-cases-concerns-rise",
  "date_of_publication": "2020-02-21 23:05:21",
  "headline": "Canada, Lebanon report Iran-linked COVID-19 cases as concerns rise",
  "main_text": "University of Minnesota. Driven to Discover.Following recent reports of COV..."
}

export default function ArticleList() {
  const classes = useStyles();

  return (
    <Box m={1}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <div>
                <Link href="https://www.google.com/" color="inherit">
                  <h3>{data.headline}</h3>
                </Link>
              </div>
            }
            secondary={
              <React.Fragment>
                {data.date_of_publication}
                <span> - </span>
                <Link href={data.url}>{data.url}</Link>
                <br />
                <p className={classes.previewText}>{data.main_text}</p>
              </React.Fragment>
            }
          />

        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <div>
                <Link href="https://www.google.com/" color="inherit">
                  <h3>{data.headline}</h3>
                </Link>
              </div>
            }
            secondary={
              <React.Fragment>
                {data.date_of_publication}
                <span> - </span>
                <Link href={data.url}>{data.url}</Link>
                <br />
                <p className={classes.previewText}>{data.main_text}</p>
              </React.Fragment>
            }
          />

        </ListItem>
        <Divider component="li" /><ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <div>
                <Link href="https://www.google.com/" color="inherit">
                  <h3>{data.headline}</h3>
                </Link>
              </div>
            }
            secondary={
              <React.Fragment>
                {data.date_of_publication}
                <span> - </span>
                <Link href={data.url}>{data.url}</Link>
                <br />
                <p className={classes.previewText}>{data.main_text}</p>
              </React.Fragment>
            }
          />

        </ListItem>
      </List>
    </Box>
  );
}