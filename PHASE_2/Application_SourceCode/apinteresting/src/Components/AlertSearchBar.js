import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";

// To Do
// Css, connection of buttons, checkboxs

export default class AlertSearchBar extends React.Component {

    // User should able to use checkbox to represent start date and end date, or enter start date end date themselves.
  render() {
    return (
      <Box m={3}>
        <form className="{classes.root}" noValidate autoComplete="on">
          <div>
          <Grid container spacing={3}>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField id="location" label="Location" type="search" value="Australia" />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}" disable = "true">
                  <TextField id="start" label="start date" type="search"  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}" disable = "true">
                  <TextField id="end" label="end date" type="search"  />
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <FormGroup style={{display: 'flex', flexDirection: 'row'}}>
            <FormControlLabel
                control={<Checkbox  name="gilad" />}
                label="last week"
            />
            <FormControlLabel
                control={<Checkbox  name="jason" />}
                label="last fortnight"
            />
            <FormControlLabel
                control={<Checkbox  name="antoine" checked= "true"/>}
                label="last month"
            />
            <FormControlLabel
                control={<Checkbox  name="antoine" />}
                label="last two month"
            />
        </FormGroup>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
      </Box>
    );
  }
}