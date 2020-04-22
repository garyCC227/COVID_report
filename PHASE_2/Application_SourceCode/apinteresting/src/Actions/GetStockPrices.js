export default function getStockPrices(codes = [], callback = data => data, options = {}) {
  return Promise.all(codes.map(code => {
    let url = `https://financialmodelingprep.com/api/v3/historical-price-full/index/${code}?serietype=line`;
    if (options.from) {
      url = `${url}&from=${options.from}`
    }
    if (options.to) {
      url = `${url}&to=${options.to}`
    }

    return fetch(url)
      .then(resp => {
        return resp.json()
      })
      .then(json => callback(json.historical.reverse().map((stockData) => {
        const result = { "date": stockData.date }
        result[`${code}`] = stockData.close
        return result;
      })))
  }))
    .then((data) => {
      const result = [];
      data.forEach((stock) => stock.forEach((date) => {
        const existing = result.filter((el) => el.date == date.date)

        if (existing.length) {
          var existingIndex = result.indexOf(existing[0]);
          result[existingIndex] = { ...result[existingIndex], ...date }
        } else {
          result.push(date);
        }
      }))
      console.log(result);
      return result;
    });
};