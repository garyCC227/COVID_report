import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import { withStyles } from '@material-ui/core/styles';
import { Animation, ArgumentScale, EventTracker } from '@devexpress/dx-react-chart';

// Data derived from https://financialmodelingprep.com/api/v3/historical-price-full/index/^DJI?from=2020-02-01
let data = [
  {
    "date": "2020-01-22",
    "worldwide": 555,
    "worldwidePercentage": 0.000224491,
  },
  {
    "date": "2020-01-23",
    "worldwide": 654,
    "worldwidePercentage": 0.000264535,
  },
  {
    "date": "2020-01-24",
    "worldwide": 941,
    "worldwidePercentage": 0.000380624,
  },
  {
    "date": "2020-01-25",
    "worldwide": 1434,
    "worldwidePercentage": 0.000580037,
  },
  {
    "date": "2020-01-26",
    "worldwide": 2118,
    "worldwidePercentage": 0.000856707,
  },
  {
    "date": "2020-01-27",
    "worldwide": 2927,
    "worldwidePercentage": 0.001183938,
  },
  {
    "date": "2020-01-28",
    "worldwide": 5578,
    "worldwidePercentage": 0.002256237,
  },
  {
    "date": "2020-01-29",
    "worldwide": 6166,
    "worldwidePercentage": 0.002494076,
  },
  {
    "date": "2020-01-30",
    "worldwide": 8234,
    "worldwidePercentage": 0.003330559,
  },
  {
    "date": "2020-01-31",
    "worldwide": 9927,
    "worldwidePercentage": 0.004015358,
  },
  {
    "date": "2020-02-01",
    "worldwide": 12038,
    "worldwidePercentage": 0.004869233,
  },
  {
    "date": "2020-02-02",
    "worldwide": 16787,
    "worldwidePercentage": 0.006790149,
  },
  {
    "date": "2020-02-03",
    "worldwide": 19881,
    "DJI": 28399.81055,
    "worldwidePercentage": 0.008041636,
    "DJIPercentage": 0.96103032
  },
  {
    "date": "2020-02-04",
    "worldwide": 23892,
    "DJI": 28807.63086,
    "worldwidePercentage": 0.00966404,
    "DJIPercentage": 0.974830683
  },
  {
    "date": "2020-02-05",
    "worldwide": 27635,
    "DJI": 29290.84961,
    "worldwidePercentage": 0.01117804,
    "DJIPercentage": 0.991182477
  },
  {
    "date": "2020-02-06",
    "worldwide": 30794,
    "DJI": 29379.76953,
    "worldwidePercentage": 0.01245582,
    "DJIPercentage": 0.994191467
  },
  {
    "date": "2020-02-07",
    "worldwide": 34391,
    "DJI": 29102.50977,
    "worldwidePercentage": 0.013910765,
    "DJIPercentage": 0.984809185
  },
  {
    "date": "2020-02-08",
    "worldwide": 37120,
    "DJI": 29102.50977,
    "worldwidePercentage": 0.015014614,
    "DJIPercentage": 0.984809185
  },
  {
    "date": "2020-02-09",
    "worldwide": 40150,
    "DJI": 29102.50977,
    "worldwidePercentage": 0.016240214,
    "DJIPercentage": 0.984809185
  },
  {
    "date": "2020-02-10",
    "worldwide": 42762,
    "DJI": 29276.82031,
    "worldwidePercentage": 0.017296738,
    "DJIPercentage": 0.990707736
  },
  {
    "date": "2020-02-11",
    "worldwide": 44802,
    "DJI": 29276.33984,
    "worldwidePercentage": 0.018121895,
    "DJIPercentage": 0.990691477
  },
  {
    "date": "2020-02-12",
    "worldwide": 45221,
    "DJI": 29551.41992,
    "worldwidePercentage": 0.018291376,
    "DJIPercentage": 1
  },
  {
    "date": "2020-02-13",
    "worldwide": 60368,
    "DJI": 29423.31055,
    "worldwidePercentage": 0.024418163,
    "DJIPercentage": 0.995664866
  },
  {
    "date": "2020-02-14",
    "worldwide": 66885,
    "DJI": 29398.08008,
    "worldwidePercentage": 0.027054215,
    "DJIPercentage": 0.994811084
  },
  {
    "date": "2020-02-15",
    "worldwide": 69030,
    "DJI": 29398.08008,
    "worldwidePercentage": 0.027921843,
    "DJIPercentage": 0.994811084
  },
  {
    "date": "2020-02-16",
    "worldwide": 71224,
    "DJI": 29398.08008,
    "worldwidePercentage": 0.028809291,
    "DJIPercentage": 0.994811084
  },
  {
    "date": "2020-02-17",
    "worldwide": 73258,
    "DJI": 29398.08008,
    "worldwidePercentage": 0.029632021,
    "DJIPercentage": 0.994811084
  },
  {
    "date": "2020-02-18",
    "worldwide": 75136,
    "DJI": 29232.18945,
    "worldwidePercentage": 0.03039165,
    "DJIPercentage": 0.989197458
  },
  {
    "date": "2020-02-19",
    "worldwide": 75639,
    "DJI": 29348.0293,
    "worldwidePercentage": 0.030595108,
    "DJIPercentage": 0.993117399
  },
  {
    "date": "2020-02-20",
    "worldwide": 76197,
    "DJI": 29219.98047,
    "worldwidePercentage": 0.030820812,
    "DJIPercentage": 0.988784314
  },
  {
    "date": "2020-02-21",
    "worldwide": 76819,
    "DJI": 28992.41016,
    "worldwidePercentage": 0.031072404,
    "DJIPercentage": 0.981083489
  },
  {
    "date": "2020-02-22",
    "worldwide": 78572,
    "DJI": 28992.41016,
    "worldwidePercentage": 0.031781473,
    "DJIPercentage": 0.981083489
  },
  {
    "date": "2020-02-23",
    "worldwide": 78958,
    "DJI": 28992.41016,
    "worldwidePercentage": 0.031937605,
    "DJIPercentage": 0.981083489
  },
  {
    "date": "2020-02-24",
    "worldwide": 79561,
    "DJI": 27960.80078,
    "worldwidePercentage": 0.032181512,
    "DJIPercentage": 0.946174527
  },
  {
    "date": "2020-02-25",
    "worldwide": 80406,
    "DJI": 27081.35938,
    "worldwidePercentage": 0.032523305,
    "DJIPercentage": 0.916414827
  },
  {
    "date": "2020-02-26",
    "worldwide": 81388,
    "DJI": 26957.58984,
    "worldwidePercentage": 0.032920512,
    "DJIPercentage": 0.91222655
  },
  {
    "date": "2020-02-27",
    "worldwide": 82746,
    "DJI": 25766.64063,
    "worldwidePercentage": 0.033469808,
    "DJIPercentage": 0.871925637
  },
  {
    "date": "2020-02-28",
    "worldwide": 84112,
    "DJI": 25409.35938,
    "worldwidePercentage": 0.034022339,
    "DJIPercentage": 0.859835481
  },
  {
    "date": "2020-02-29",
    "worldwide": 86011,
    "DJI": 25409.35938,
    "worldwidePercentage": 0.034790463,
    "DJIPercentage": 0.859835481
  },
  {
    "date": "2020-03-01",
    "worldwide": 88369,
    "DJI": 25409.35938,
    "worldwidePercentage": 0.035744247,
    "DJIPercentage": 0.859835481
  },
  {
    "date": "2020-03-02",
    "worldwide": 90306,
    "DJI": 26703.32031,
    "worldwidePercentage": 0.036527741,
    "DJIPercentage": 0.903622242
  },
  {
    "date": "2020-03-03",
    "worldwide": 92840,
    "DJI": 25917.41016,
    "worldwidePercentage": 0.037552715,
    "DJIPercentage": 0.877027575
  },
  {
    "date": "2020-03-04",
    "worldwide": 95120,
    "DJI": 27090.85938,
    "worldwidePercentage": 0.038474949,
    "DJIPercentage": 0.916736301
  },
  {
    "date": "2020-03-05",
    "worldwide": 97886,
    "DJI": 26121.2793,
    "worldwidePercentage": 0.039593764,
    "DJIPercentage": 0.883926369
  },
  {
    "date": "2020-03-06",
    "worldwide": 101801,
    "DJI": 25864.7793,
    "worldwidePercentage": 0.041177337,
    "DJIPercentage": 0.875246583
  },
  {
    "date": "2020-03-07",
    "worldwide": 105847,
    "DJI": 25864.7793,
    "worldwidePercentage": 0.042813897,
    "DJIPercentage": 0.875246583
  },
  {
    "date": "2020-03-08",
    "worldwide": 109821,
    "DJI": 25864.7793,
    "worldwidePercentage": 0.044421335,
    "DJIPercentage": 0.875246583
  },
  {
    "date": "2020-03-09",
    "worldwide": 113590,
    "DJI": 23851.01953,
    "worldwidePercentage": 0.045945852,
    "DJIPercentage": 0.807102318
  },
  {
    "date": "2020-03-10",
    "worldwide": 118620,
    "DJI": 25018.16016,
    "worldwidePercentage": 0.047980429,
    "DJIPercentage": 0.846597565
  },
  {
    "date": "2020-03-11",
    "worldwide": 125875,
    "DJI": 23553.2207,
    "worldwidePercentage": 0.050914993,
    "DJIPercentage": 0.797025008
  },
  {
    "date": "2020-03-12",
    "worldwide": 128352,
    "DJI": 21200.61914,
    "worldwidePercentage": 0.051916912,
    "DJIPercentage": 0.717414567
  },
  {
    "date": "2020-03-13",
    "worldwide": 145205,
    "DJI": 23185.61914,
    "worldwidePercentage": 0.058733757,
    "DJIPercentage": 0.784585621
  },
  {
    "date": "2020-03-14",
    "worldwide": 156101,
    "DJI": 23185.61914,
    "worldwidePercentage": 0.063141064,
    "DJIPercentage": 0.784585621
  },
  {
    "date": "2020-03-15",
    "worldwide": 167454,
    "DJI": 23185.61914,
    "worldwidePercentage": 0.067733222,
    "DJIPercentage": 0.784585621
  },
  {
    "date": "2020-03-16",
    "worldwide": 181574,
    "DJI": 20188.51953,
    "worldwidePercentage": 0.0734446,
    "DJIPercentage": 0.683165803
  },
  {
    "date": "2020-03-17",
    "worldwide": 197102,
    "DJI": 21237.38086,
    "worldwidePercentage": 0.079725498,
    "DJIPercentage": 0.718658559
  },
  {
    "date": "2020-03-18",
    "worldwide": 214821,
    "DJI": 19898.91992,
    "worldwidePercentage": 0.08689263,
    "DJIPercentage": 0.673365949
  },
  {
    "date": "2020-03-19",
    "worldwide": 242570,
    "DJI": 20087.18945,
    "worldwidePercentage": 0.098116782,
    "DJIPercentage": 0.679736862
  },
  {
    "date": "2020-03-20",
    "worldwide": 272208,
    "DJI": 19173.98047,
    "worldwidePercentage": 0.110105013,
    "DJIPercentage": 0.64883449
  },
  {
    "date": "2020-03-21",
    "worldwide": 304507,
    "DJI": 19173.98047,
    "worldwidePercentage": 0.123169588,
    "DJIPercentage": 0.64883449
  },
  {
    "date": "2020-03-22",
    "worldwide": 336953,
    "DJI": 19173.98047,
    "worldwidePercentage": 0.136293623,
    "DJIPercentage": 0.64883449
  },
  {
    "date": "2020-03-23",
    "worldwide": 378231,
    "DJI": 18591.92969,
    "worldwidePercentage": 0.152990101,
    "DJIPercentage": 0.629138286
  },
  {
    "date": "2020-03-24",
    "worldwide": 418041,
    "DJI": 20704.91016,
    "worldwidePercentage": 0.169092789,
    "DJIPercentage": 0.700640112
  },
  {
    "date": "2020-03-25",
    "worldwide": 467653,
    "DJI": 21200.55078,
    "worldwidePercentage": 0.189160274,
    "DJIPercentage": 0.717412254
  },
  {
    "date": "2020-03-26",
    "worldwide": 529591,
    "DJI": 22552.16992,
    "worldwidePercentage": 0.214213484,
    "DJIPercentage": 0.763150129
  },
  {
    "date": "2020-03-27",
    "worldwide": 593291,
    "DJI": 21636.7793,
    "worldwidePercentage": 0.239979403,
    "DJIPercentage": 0.732173931
  },
  {
    "date": "2020-03-28",
    "worldwide": 660693,
    "DJI": 21636.7793,
    "worldwidePercentage": 0.267242739,
    "DJIPercentage": 0.732173931
  },
  {
    "date": "2020-03-29",
    "worldwide": 720140,
    "DJI": 21636.7793,
    "worldwidePercentage": 0.291288369,
    "DJIPercentage": 0.732173931
  },
  {
    "date": "2020-03-30",
    "worldwide": 782389,
    "DJI": 22327.48047,
    "worldwidePercentage": 0.316467375,
    "DJIPercentage": 0.75554679
  },
  {
    "date": "2020-03-31",
    "worldwide": 857487,
    "DJI": 21917.16016,
    "worldwidePercentage": 0.346843655,
    "DJIPercentage": 0.741661829
  },
  {
    "date": "2020-04-01",
    "worldwide": 932605,
    "DJI": 20943.50977,
    "worldwidePercentage": 0.377228024,
    "DJIPercentage": 0.708714161
  },
  {
    "date": "2020-04-02",
    "worldwide": 1013466,
    "DJI": 21413.43945,
    "worldwidePercentage": 0.409935371,
    "DJIPercentage": 0.724616262
  },
  {
    "date": "2020-04-03",
    "worldwide": 1095917,
    "DJI": 21052.5293,
    "worldwidePercentage": 0.443285854,
    "DJIPercentage": 0.712403308
  },
  {
    "date": "2020-04-04",
    "worldwide": 1176060,
    "DJI": 21052.5293,
    "worldwidePercentage": 0.475702779,
    "DJIPercentage": 0.712403308
  },
  {
    "date": "2020-04-05",
    "worldwide": 1249754,
    "DJI": 21052.5293,
    "worldwidePercentage": 0.505511156,
    "DJIPercentage": 0.712403308
  },
  {
    "date": "2020-04-06",
    "worldwide": 1321481,
    "DJI": 22679.99023,
    "worldwidePercentage": 0.534523905,
    "DJIPercentage": 0.767475482
  },
  {
    "date": "2020-04-07",
    "worldwide": 1396476,
    "DJI": 22653.85938,
    "worldwidePercentage": 0.564858522,
    "DJIPercentage": 0.766591231
  },
  {
    "date": "2020-04-08",
    "worldwide": 1480202,
    "DJI": 23433.57031,
    "worldwidePercentage": 0.598724729,
    "DJIPercentage": 0.79297612
  },
  {
    "date": "2020-04-09",
    "worldwide": 1565278,
    "DJI": 23719.36914,
    "worldwidePercentage": 0.633136995,
    "DJIPercentage": 0.802647359
  },
  {
    "date": "2020-04-10",
    "worldwide": 1657526,
    "DJI": 23719.36914,
    "worldwidePercentage": 0.670450252,
    "DJIPercentage": 0.802647359
  },
  {
    "date": "2020-04-11",
    "worldwide": 1735650,
    "DJI": 23719.36914,
    "worldwidePercentage": 0.702050514,
    "DJIPercentage": 0.802647359
  },
  {
    "date": "2020-04-12",
    "worldwide": 1834721,
    "DJI": 23719.36914,
    "worldwidePercentage": 0.742123597,
    "DJIPercentage": 0.802647359
  },
  {
    "date": "2020-04-13",
    "worldwide": 1904838,
    "DJI": 23390.76953,
    "worldwidePercentage": 0.770485119,
    "DJIPercentage": 0.791527771
  },
  {
    "date": "2020-04-14",
    "worldwide": 1976191,
    "DJI": 23949.75977,
    "worldwidePercentage": 0.799346589,
    "DJIPercentage": 0.810443621
  },
  {
    "date": "2020-04-15",
    "worldwide": 2056054,
    "DJI": 23504.34961,
    "worldwidePercentage": 0.831650257,
    "DJIPercentage": 0.795371243
  },
  {
    "date": "2020-04-16",
    "worldwide": 2152437,
    "DJI": 23537.67969,
    "worldwidePercentage": 0.870636074,
    "DJIPercentage": 0.796499111
  },
  {
    "date": "2020-04-17",
    "worldwide": 2240190,
    "DJI": 24242.49023,
    "worldwidePercentage": 0.906131156,
    "DJIPercentage": 0.820349421
  },
  {
    "date": "2020-04-18",
    "worldwide": 2317758,
    "DJI": 24242.49023,
    "worldwidePercentage": 0.937506522,
    "DJIPercentage": 0.820349421
  },
  {
    "date": "2020-04-19",
    "worldwide": 2401378,
    "DJI": 24242.49023,
    "worldwidePercentage": 0.971329853,
    "DJIPercentage": 0.820349421
  },
  {
    "date": "2020-04-20",
    "worldwide": 2472258,
    "worldwidePercentage": 1,
  }
];


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

const customizeTooltip = (pointInfo) => {
  return pointInfo.value > 100 ? { color: "red" } : {};
}

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
      data,
      targetItem: undefined,
    };

    this.changeTargetItem = targetItem => this.setState({ targetItem });
  }

  render() {
    const { data: chartData, targetItem } = this.state;
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
            name="Confirmed Cases Worldwide"
            valueField="worldwidePercentage"
            argumentField="date"
          />
          <LineSeries
            name="DJI"
            valueField="DJIPercentage"
            argumentField="date"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Stock Market Chart`}
            textComponent={TitleText}
          />
          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(stockStyles, { name: 'StockChart' })(StockChart);
