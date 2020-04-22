export default function GetCovid19Data(callback = () => { }, options = {}) {
  // TODO: Hard-coded data
  const data = [
    {
      "date": "2020-01-22",
      "worldwide": 555,
    },
    {
      "date": "2020-01-23",
      "worldwide": 654,
    },
    {
      "date": "2020-01-24",
      "worldwide": 941,
    },
    {
      "date": "2020-01-25",
      "worldwide": 1434,
    },
    {
      "date": "2020-01-26",
      "worldwide": 2118,
    },
    {
      "date": "2020-01-27",
      "worldwide": 2927,
    },
    {
      "date": "2020-01-28",
      "worldwide": 5578,
    },
    {
      "date": "2020-01-29",
      "worldwide": 6166,
    },
    {
      "date": "2020-01-30",
      "worldwide": 8234,
    },
    {
      "date": "2020-01-31",
      "worldwide": 9927,
    },
    {
      "date": "2020-02-01",
      "worldwide": 12038,
    },
    {
      "date": "2020-02-02",
      "worldwide": 16787,
    },
    {
      "date": "2020-02-03",
      "worldwide": 19881,
    },
    {
      "date": "2020-02-04",
      "worldwide": 23892,
    },
    {
      "date": "2020-02-05",
      "worldwide": 27635,
    },
    {
      "date": "2020-02-06",
      "worldwide": 30794,
    },
    {
      "date": "2020-02-07",
      "worldwide": 34391,
    },
    {
      "date": "2020-02-08",
      "worldwide": 37120,
    },
    {
      "date": "2020-02-09",
      "worldwide": 40150,
    },
    {
      "date": "2020-02-10",
      "worldwide": 42762,
    },
    {
      "date": "2020-02-11",
      "worldwide": 44802,
    },
    {
      "date": "2020-02-12",
      "worldwide": 45221,
    },
    {
      "date": "2020-02-13",
      "worldwide": 60368,
    },
    {
      "date": "2020-02-14",
      "worldwide": 66885,
    },
    {
      "date": "2020-02-15",
      "worldwide": 69030,
    },
    {
      "date": "2020-02-16",
      "worldwide": 71224,
    },
    {
      "date": "2020-02-17",
      "worldwide": 73258,
    },
    {
      "date": "2020-02-18",
      "worldwide": 75136,
    },
    {
      "date": "2020-02-19",
      "worldwide": 75639,
    },
    {
      "date": "2020-02-20",
      "worldwide": 76197,
    },
    {
      "date": "2020-02-21",
      "worldwide": 76819,
    },
    {
      "date": "2020-02-22",
      "worldwide": 78572,
    },
    {
      "date": "2020-02-23",
      "worldwide": 78958,
    },
    {
      "date": "2020-02-24",
      "worldwide": 79561,
    },
    {
      "date": "2020-02-25",
      "worldwide": 80406,
    },
    {
      "date": "2020-02-26",
      "worldwide": 81388,
    },
    {
      "date": "2020-02-27",
      "worldwide": 82746,
    },
    {
      "date": "2020-02-28",
      "worldwide": 84112,
    },
    {
      "date": "2020-02-29",
      "worldwide": 86011,
    },
    {
      "date": "2020-03-01",
      "worldwide": 88369,
    },
    {
      "date": "2020-03-02",
      "worldwide": 90306,
    },
    {
      "date": "2020-03-03",
      "worldwide": 92840,
    },
    {
      "date": "2020-03-04",
      "worldwide": 95120,
    },
    {
      "date": "2020-03-05",
      "worldwide": 97886,
    },
    {
      "date": "2020-03-06",
      "worldwide": 101801,
    },
    {
      "date": "2020-03-07",
      "worldwide": 105847,
    },
    {
      "date": "2020-03-08",
      "worldwide": 109821,
    },
    {
      "date": "2020-03-09",
      "worldwide": 113590,
    },
    {
      "date": "2020-03-10",
      "worldwide": 118620,
    },
    {
      "date": "2020-03-11",
      "worldwide": 125875,
    },
    {
      "date": "2020-03-12",
      "worldwide": 128352,
    },
    {
      "date": "2020-03-13",
      "worldwide": 145205,
    },
    {
      "date": "2020-03-14",
      "worldwide": 156101,
    },
    {
      "date": "2020-03-15",
      "worldwide": 167454,
    },
    {
      "date": "2020-03-16",
      "worldwide": 181574,
    },
    {
      "date": "2020-03-17",
      "worldwide": 197102,
    },
    {
      "date": "2020-03-18",
      "worldwide": 214821,
    },
    {
      "date": "2020-03-19",
      "worldwide": 242570,
    },
    {
      "date": "2020-03-20",
      "worldwide": 272208,
    },
    {
      "date": "2020-03-21",
      "worldwide": 304507,
    },
    {
      "date": "2020-03-22",
      "worldwide": 336953,
    },
    {
      "date": "2020-03-23",
      "worldwide": 378231,
    },
    {
      "date": "2020-03-24",
      "worldwide": 418041,
    },
    {
      "date": "2020-03-25",
      "worldwide": 467653,
    },
    {
      "date": "2020-03-26",
      "worldwide": 529591,
    },
    {
      "date": "2020-03-27",
      "worldwide": 593291,
    },
    {
      "date": "2020-03-28",
      "worldwide": 660693,
    },
    {
      "date": "2020-03-29",
      "worldwide": 720140,
    },
    {
      "date": "2020-03-30",
      "worldwide": 782389,
    },
    {
      "date": "2020-03-31",
      "worldwide": 857487,
    },
    {
      "date": "2020-04-01",
      "worldwide": 932605,
    },
    {
      "date": "2020-04-02",
      "worldwide": 1013466,
    },
    {
      "date": "2020-04-03",
      "worldwide": 1095917,
    },
    {
      "date": "2020-04-04",
      "worldwide": 1176060,
    },
    {
      "date": "2020-04-05",
      "worldwide": 1249754,
    },
    {
      "date": "2020-04-06",
      "worldwide": 1321481,
    },
    {
      "date": "2020-04-07",
      "worldwide": 1396476,
    },
    {
      "date": "2020-04-08",
      "worldwide": 1480202,
    },
    {
      "date": "2020-04-09",
      "worldwide": 1565278,
    },
    {
      "date": "2020-04-10",
      "worldwide": 1657526,
    },
    {
      "date": "2020-04-11",
      "worldwide": 1735650,
    },
    {
      "date": "2020-04-12",
      "worldwide": 1834721,
    },
    {
      "date": "2020-04-13",
      "worldwide": 1904838,
    },
    {
      "date": "2020-04-14",
      "worldwide": 1976191,
    },
    {
      "date": "2020-04-15",
      "worldwide": 2056054,
    },
    {
      "date": "2020-04-16",
      "worldwide": 2152437,
    },
    {
      "date": "2020-04-17",
      "worldwide": 2240190,
    },
    {
      "date": "2020-04-18",
      "worldwide": 2317758,
    },
    {
      "date": "2020-04-19",
      "worldwide": 2401378,
    },
    {
      "date": "2020-04-20",
      "worldwide": 2472258,
    }
  ];

  return new Promise((resolve, reject) => {
    let result = data;
    if (options.from) {
      result = result.filter((el) => el.date >= options.from);
    }
    if (options.to) {
      result = result.filter((el) => el.date <= options.to);
    }
    resolve(result)
  })
    .then((data) => callback(data));
};