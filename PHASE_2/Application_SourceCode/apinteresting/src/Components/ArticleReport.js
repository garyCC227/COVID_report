import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ArticleReport(props) {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}><b>Report {props.index}</b></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <h4>Event Date</h4>
          <div>{props.report.event_date}</div>
          <h4>Addresses Mentioned</h4>
          <div>
            {
              props.report.locations.map(function (el) {
                return (
                  <li>
                    {el.address}&nbsp;
                    (
                      <Link
                        href={`https://www.google.com/maps/place/?q=place_id:${el.google_id}`}
                        target="_blank"
                        >Google Map
                      </Link>
                    )
                  </li>
                )
              })
            }
          </div>
          <h4>Diseases</h4>
          {(props.report.diseases) &&
            <div>
              {
                props.report.diseases.map(function (el) {
                  return (
                    <li>{el}</li>
                  )
                })
              }
            </div>
          }
          <h4>Syndromes</h4>
          {(props.report.syndromes) &&
            <div>
              {
                props.report.syndromes.map(function (el) {
                  return (
                    <li>{el}</li>
                  )
                })
              }
            </div>
          }
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
