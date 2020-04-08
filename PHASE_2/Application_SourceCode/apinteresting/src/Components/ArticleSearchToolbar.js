import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(1),
//   },
// }));

export default class ArticleSearchToolbar extends React.Component {
  // const classes = useStyles();
  constructor() {
    super();

    this.state = {
      start_date: "2020-03-03T12:00",
      end_date: "2020-03-03T13:00",
      location: "",
      keyword: "",
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onLocChange = this.onLocChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    this.props.onSubmit(this.state);
  }

  onStartDateChange(evt) {
    this.setState({ start_date: evt.target.value });
  }

  onEndDateChange(evt) {
    this.setState({ end_date: evt.target.value });
  }

  onKeyChange(evt) {
    this.setState({ keyword: evt.target.value });
  }

  onLocChange(evt) {
    this.setState({ location: evt.target.value });
  }


  render() {
    return (
      <Box m={1}>
        <form className="{classes.root}" noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField
                    required
                    id="from-date"
                    label="From Date & Time"
                    type="datetime-local"
                    defaultValue={this.state.start_date}
                    className="{classes.textField}"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.onStartDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField
                    required
                    id="to-date"
                    label="To Date & Time"
                    type="datetime-local"
                    defaultValue={this.state.end_date}
                    className="{classes.textField}"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.onEndDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField id="location" label="Location" type="search" value={this.state.location} onChange={this.onLocChange} />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField id="location" label="Keywords" type="search" value={this.state.keyword} onChange={this.onKeyChange} />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
      </Box>
    );
  }
}
