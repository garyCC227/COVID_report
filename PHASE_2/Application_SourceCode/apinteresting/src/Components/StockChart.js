import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation, ArgumentScale } from '@devexpress/dx-react-chart';

// Data derived from https://financialmodelingprep.com/api/v3/historical-price-full/index/^DJI?from=2020-02-01
let data = [
  {
    "date": "2020-04-17",
    "close": 24242.490234
  },
  {
    "date": "2020-04-16",
    "close": 23537.679688
  },
  {
    "date": "2020-04-15",
    "close": 23504.349609
  },
  {
    "date": "2020-04-14",
    "close": 23949.759766
  },
  {
    "date": "2020-04-13",
    "close": 23390.769531
  },
  {
    "date": "2020-04-09",
    "close": 23719.369141
  },
  {
    "date": "2020-04-08",
    "close": 23433.570313
  },
  {
    "date": "2020-04-07",
    "close": 22653.859375
  },
  {
    "date": "2020-04-06",
    "close": 22679.990234
  },
  {
    "date": "2020-04-03",
    "close": 21052.529297
  },
  {
    "date": "2020-04-02",
    "close": 21413.439453
  },
  {
    "date": "2020-04-01",
    "close": 20943.509766
  },
  {
    "date": "2020-03-31",
    "close": 21917.160156
  },
  {
    "date": "2020-03-30",
    "close": 22327.480469
  },
  {
    "date": "2020-03-27",
    "close": 21636.779297
  },
  {
    "date": "2020-03-26",
    "close": 22552.169922
  },
  {
    "date": "2020-03-25",
    "close": 21200.550781
  },
  {
    "date": "2020-03-24",
    "close": 20704.910156
  },
  {
    "date": "2020-03-23",
    "close": 18591.929688
  },
  {
    "date": "2020-03-20",
    "close": 19173.980469
  },
  {
    "date": "2020-03-19",
    "close": 20087.189453
  },
  {
    "date": "2020-03-18",
    "close": 19898.919922
  },
  {
    "date": "2020-03-17",
    "close": 21237.380859
  },
  {
    "date": "2020-03-16",
    "close": 20188.519531
  },
  {
    "date": "2020-03-13",
    "close": 23185.619141
  },
  {
    "date": "2020-03-12",
    "close": 21200.619141
  },
  {
    "date": "2020-03-11",
    "close": 23553.220703
  },
  {
    "date": "2020-03-10",
    "close": 25018.160156
  },
  {
    "date": "2020-03-09",
    "close": 23851.019531
  },
  {
    "date": "2020-03-06",
    "close": 25864.779297
  },
  {
    "date": "2020-03-05",
    "close": 26121.279297
  },
  {
    "date": "2020-03-04",
    "close": 27090.859375
  },
  {
    "date": "2020-03-03",
    "close": 25917.410156
  },
  {
    "date": "2020-03-02",
    "close": 26703.320313
  },
  {
    "date": "2020-02-28",
    "close": 25409.359375
  },
  {
    "date": "2020-02-27",
    "close": 25766.640625
  },
  {
    "date": "2020-02-26",
    "close": 26957.589844
  },
  {
    "date": "2020-02-25",
    "close": 27081.359375
  },
  {
    "date": "2020-02-24",
    "close": 27960.800781
  },
  {
    "date": "2020-02-21",
    "close": 28992.410156
  },
  {
    "date": "2020-02-20",
    "close": 29219.980469
  },
  {
    "date": "2020-02-19",
    "close": 29348.029297
  },
  {
    "date": "2020-02-18",
    "close": 29232.189453
  },
  {
    "date": "2020-02-14",
    "close": 29398.080078
  },
  {
    "date": "2020-02-13",
    "close": 29423.310547
  },
  {
    "date": "2020-02-12",
    "close": 29551.419922
  },
  {
    "date": "2020-02-11",
    "close": 29276.339844
  },
  {
    "date": "2020-02-10",
    "close": 29276.820313
  },
  {
    "date": "2020-02-07",
    "close": 29102.509766
  },
  {
    "date": "2020-02-06",
    "close": 29379.769531
  },
  {
    "date": "2020-02-05",
    "close": 29290.849609
  },
  {
    "date": "2020-02-04",
    "close": 28807.630859
  },
  {
    "date": "2020-02-03",
    "close": 28399.810547
  }
].reverse();


const format = () => tick => tick;
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});


const labelHalfWidth = 80;
let lastLabelCoordinate;

const ArgumentLabel = props => {
  const { x } = props;
  // filter Labels
  if (
    lastLabelCoordinate &&
    lastLabelCoordinate < x &&
    x - lastLabelCoordinate <= labelHalfWidth
  ) {
    return null;
  }
  lastLabelCoordinate = x;
  return <ArgumentAxis.Label {...props} />;
};

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const stockStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
    />
  );
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

class StockChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Chart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} labelComponent={ArgumentLabel} />
          <ValueAxis
            max={50}
            labelComponent={ValueLabel}
          />

          <LineSeries
            name="DJI"
            valueField="close"
            argumentField="date"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Stock Market Chart`}
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(stockStyles, { name: 'StockChart' })(StockChart);
