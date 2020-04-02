import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ArticleSearchToolbar from './ArticleSearchToolbar';
import ArticleList from './ArticleList';

const useStyles = makeStyles((theme) => ({
}));


export default function ArticleListPage() {
  const classes = useStyles();

  return (
    <div>
      <ArticleSearchToolbar />
      <Divider />
      <ArticleList />
    </div>
  );
}