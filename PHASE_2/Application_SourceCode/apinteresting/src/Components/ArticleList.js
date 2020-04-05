import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
//   previewText: {
//     color: '#000',
//   }
// }));


class ArticleList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const articles = this.props.articles.map(function (data) {
      return (
        <div key={data.id}>
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
                  {data.main_text}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
        </div>
      );
    });

    return (
      <Box m={1}>
        <List className="">
          {articles}
          {/* {lists} */}
        </List>
      </Box>
    );
  }
}


export default ArticleList;