import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArticleDialog from './ArticleDialog';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';

class ArticleList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const articles = this.props.articles.map(function (data) {
      return (
        <Box mb={1} key={data.id}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.headline}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.date_of_publication}
                <br />
                {data.main_text}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button size="small" href={data.url} target="_blank" variant="outlined" color="primary">
                View Article
              </Button>
              &nbsp;
              <ArticleDialog article={data} />
            </CardActions>
          </Card>
        </Box>
      );
    });

    return (
      <List className="">
        {articles}
      </List>
    );
  }
}


export default ArticleList;