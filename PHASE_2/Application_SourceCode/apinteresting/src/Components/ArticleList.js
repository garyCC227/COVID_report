import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArticleDialog from './ArticleDialog';

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
                  <Link href={data.url} color="inherit" target="_blank">
                    <h3>{data.headline}</h3>
                  </Link>

                </div>
              }
              secondary={
                <React.Fragment>
                  {data.date_of_publication}
                  <br />
                  <p>{data.main_text}</p>
                  <Button size="small" href={data.url} variant="outlined" color="primary">
                    View Article
                  </Button>
                  &nbsp;
                  <ArticleDialog article={data} />
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
        </List>
      </Box>
    );
  }
}


export default ArticleList;