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
  const url = 'https://apinteresting.xyz/v1/news?start_date=2020-02-15T00%3A00%3A00&end_date=2020-03-01T00%3A00%3A00&keyterms=coronavirus%2Cflu&location=China';
  const lists = fetch(url, 
                    {
                      method:'GET',
                      headers: {'identity':'header'
                                  }
                    })
                .then(res=>{
                  console.log(res);
                  return res.json;
                })
                .then(res=>{
                  return res.data;
                })
  // articles
  const artiles = [...Array(5)].map(function(){ 
   return(
     <div>
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
    <Divider component="li"/>
    </div>
      );
  });
  
  // console.log(lists);
  return (
    <Box m={1}>
      <List className={classes.root}>
        {artiles}
        {/* {lists} */}
      </List>
    </Box>
  );
}