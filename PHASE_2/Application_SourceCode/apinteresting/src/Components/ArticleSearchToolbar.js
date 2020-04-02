import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

export default function ArticleSearchToolbar() {
  const classes = useStyles();

  return (
    <Box m={1}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Grid container spacing={3}>
            <Grid item xs>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  required
                  id="from-date"
                  label="From Date & Time"
                  type="datetime-local"
                  defaultValue="2020-03-01T10:00"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  required
                  id="to-date"
                  label="To Date & Time"
                  type="datetime-local"
                  defaultValue="2020-03-02T10:00"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs>

              <FormControl fullWidth className={classes.margin}>
                <TextField id="location" label="Location" type="search" />
              </FormControl>
            </Grid>
            <Grid item xs>

              <FormControl fullWidth className={classes.margin}>
                <TextField id="location" label="Keywords" type="search" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <br />
        <Button variant="contained" color="primary">
          Search
        </Button>
      </form>
    </Box>
  );
}
