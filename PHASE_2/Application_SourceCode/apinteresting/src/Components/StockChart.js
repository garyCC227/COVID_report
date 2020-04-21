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
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';

import { withStyles } from '@material-ui/core/styles';
import {
  Animation, ArgumentScale, EventTracker,
  ValueScale
} from '@devexpress/dx-react-chart';
import GetCovid19Data from './../Actions/GetCovid19Data';
import GetStockPrices from './../Actions/GetStockPrices';


const stockDetails = [
  //{ "code": "^DJI", "name": "Dow Jones", "range": [0, 1] },
  { "code": "^GSPC", "name": "S&P 500", "range": [0, 1] },
  { "code": "^IXIC", "name": "Nasdaq", "range": [0, 1] },
  { "code": "^AXJO", "name": "S&P/ASX 200", "range": [0, 1] },
  { "code": "000001.SS", "name": "SSE Composite", "range": [0, 1] },
  { "code": "^AORD", "name": "ALL ORDINARIES", "range": [0, 1] },
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

const WorldwideLabel = (props) => {
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

const combineTwoArraysByDate = (array1, array2) => {
  array2.forEach((date) => {
    const existing = array1.filter((el) => el.date == date.date)

    if (existing.length) {
      var existingIndex = array1.indexOf(existing[0]);
      array1[existingIndex] = { ...array1[existingIndex], ...date }
    } else {
      array1.push(date);
    }
  })
  return array1;
}

const linearNormalize = (number, min, max) => (number - min) / (max - min);

const normalizeData = (dataset, propertyName) => {
  propertyName.forEach((name) => {
    const notNullValue = dataset.map(el => el[name]).filter((el) => el != null);
    const min = Math.min(...notNullValue);
    const max = Math.max(...notNullValue);
    stockDetails.forEach((el, index) => {
      if (el.code == name) {
        stockDetails[index].range = [min, max];
      }
    })/* 
    dataset = dataset.map(el => {
      if (el[name]) {
        const result = el;
        result[`${name}Normalized`] = linearNormalize(el[name], min, max)
        return result
      } else {
        return el;
      }
    }) */
  });
  console.log(stockDetails);
  return dataset
}

const combineData = (data) => {
  const dataset = combineTwoArraysByDate(data[0], data[1]);
  return normalizeData(dataset, ["worldwide", "^DJI", "^GSPC"]);
}



class StockChart extends React.PureComponent {
  constructor(props) {
    super(props);
    const setStockDetails = stockDetails => this.setState({ stockDetails });
    const changeData = (data) => { this.setState({ data }) }
    Promise.all([
      GetCovid19Data(data => data),
      GetStockPrices(stockDetails.map(el => el.code), (data => data), { "from": "2020-01-22" })
    ])
      .then((result) => {
        const data = combineData(result);
        changeData(data);
        setStockDetails(stockDetails);
      });
    this.state = {
      data: [],
      targetItem: null,
      stockDetails: stockDetails,
    };

    this.changeTargetItem = targetItem => this.setState({ targetItem });
  }

  changeData(data) {
    this.setState({ data });
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

          <ValueScale
            name="worldwide"
            modifyDomain={() => [0, 2500000]}
          />
          <ValueAxis
            position="right"
            labelComponent={WorldwideLabel}
            scaleName="worldwide"
          />
          <LineSeries
            name="Confirmed Cases Worldwide"
            valueField="worldwide"
            argumentField="date"
            scaleName="worldwide"
          />{/* 
          <ValueScale
            name="^DJI"
            modifyDomain={() => }
          /> */}
          {this.state.stockDetails.map((value, index) => {
            return <ValueScale
              name={value.code}
              modifyDomain={() => value.range}
            />
          })}
          {this.state.stockDetails.map((value, index) => {
            return <LineSeries
              name={value.name}
              valueField={value.code}
              argumentField="date"
            />
          })}{/* 
          <LineSeries
            name="Dow Jones"
            valueField="^DJI"
            argumentField="date"
            scaleName="^DJI"
          /> */}
          {/* 
          <LineSeries
            name="S&P 500"
            valueField="^GSPCNormalized"
            argumentField="date"
          /> */}

          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Stock Market Chart`}
            textComponent={TitleText}
          />
          <EventTracker />
          <ZoomAndPan />
          <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(stockStyles, { name: 'StockChart' })(StockChart);
