import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined
    }
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit"
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9]
];

function createData(id, Country, Confirmed, Suspected, Cured, Death) {
  return { Country, Confirmed, Suspected, Cured, Death };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default class Cov19Table extends React.Component {
  constructor() {
    super()
    this.state = { rows: [] }

    this.OnPageLoad = this.OnPageLoad.bind(this);
  }

  componentDidMount() {
    this.OnPageLoad()
  }

  OnPageLoad = async () => {
    var url = `https://lab.isaaclin.cn/nCoV/api/area?lang=en`;
    var rows = await fetch(url, {
      method: "GET"
    })
      .then(res => {
        // console.log(res.json());
        return res.json();
      })
      .then(res => {
        return res.results;
      }).then(data => {
        var rows = []
        for (var ct of data) {
          rows.push(createData(ct.locationId, ct.countryEnglishName, ct.confirmedCount, ct.suspectedCount, ct.curedCount, ct.deadCount))
        }
        return rows
      });
    rows.sort((a, b) => {
      if (a.countryEnglishName === b.countryEnglishName) {
        return 0;
      }
      if (a.countryEnglishName > b.countryEnglishName) {
        return 1;
      }
      return -1;
    });
    let result = [];
    let length = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].Country === null) {
        continue;
      }
      if (length === 0) {
        result.push(rows[i]);
        length += 1;
        continue;
      }
      const last = result[length - 1];
      const current = rows[i];
      if (current.Country == last.Country) {
        last.Confirmed += current.Confirmed;
        last.Suspected += current.Suspected;
        last.Cured += current.Cured;
        last.Death += current.Death;
        result[length - 1] = last;
      } else {
        result.push(rows[i]);
        length += 1;
      }
    }
    rows = result;
    rows.sort(function (a, b) {
      if (a.Confirmed > b.Confirmed) {
        return -1;
      } else if (a.Confirmed < b.Confirmed) {
        return 1;
      } else {
        return 0;
      }
    })
    this.setState({ rows: rows })
  }

  exportAsJson(json) {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "export.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  exportAsCsv(json) {
    // From https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
    var fields = Object.keys(json[0])
    var replacer = function (key, value) { return value === null ? '' : value }
    var csv = json.map(function (row) {
      return fields.map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
    const element = document.createElement("a");
    const file = new Blob([csv], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = "export.csv";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    return (
      <div>

        <Paper style={{ height: 500, width: "100%" }} elevation={5}>

          <VirtualizedTable
            rowCount={this.state.rows.length}
            rowGetter={({ index }) => this.state.rows[index]}
            columns={[
              {
                width: 300,
                label: "Country",
                dataKey: "Country"
              },
              {
                width: 200,
                label: "Confirmed",
                dataKey: "Confirmed",
                numeric: true
              },
              {
                width: 200,
                label: "Suspected",
                dataKey: "Suspected",
                numeric: true
              },
              {
                width: 200,
                label: "Cured",
                dataKey: "Cured",
                numeric: true
              },
              {
                width: 200,
                label: "Death",
                dataKey: "Death",
                numeric: true
              }
            ]}
          />


        </Paper>

        <Box my={1}>
          <Button
            onClick={() => this.exportAsJson(this.state.rows)}
            color="primary"
            variant="outlined"
          >
            Export As Json
            </Button>&nbsp;
            <Button
            onClick={() => this.exportAsCsv(this.state.rows)}
            color="primary"
            variant="outlined"
          >
            Export As CSV
            </Button>
        </Box>

      </div>
    );
  }
}
