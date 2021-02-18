/* Amplify Params - DO NOT EDIT
	API_I4T_GRAPHQLAPIENDPOINTOUTPUT
	API_I4T_GRAPHQLAPIIDOUTPUT
	API_I4T_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const { calculateIntrinsicValue } = require("./calculations/intrinsic-value");

const updateStock = gql`
  mutation updateStock($input: UpdateStockInput!) {
    updateStock(input: $input) {
      id
      symbol
      sector
      employees
      marketCap
      description
      peratio
      dividendYield
      beta
      createdAt
      updatedAt
      intrinsicValue {
        threeYearValue
        fiveYearValue
        fourQuarterTrendUp
      }
      quote {
        price
        date
        volume
      }
      balance
      earnings
    }
  }
`;

const getStock = gql`
  query getStock($id: ID!) {
    getStock(id: $id) {
      symbol
    }
  }
`;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function processQuoteData(o) {
  return Object.entries(o)
    .map(([key, value]) => [key.replace(/\s+/g, ""), value])
    .reduce((result, [normalizedKey, value]) => {
      result[normalizedKey] =
        value && typeof value === "object" ? processQuoteData(value) : value;
      return result;
    }, {});
}

exports.handler = async (event) => {
  try {
    const symbol = await axios({
      url: process.env.API_I4T_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_I4T_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(getStock),
        variables: {
          id: event.arguments.id,
        },
      },
    });

    const overviewData = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol.data.data.getStock.symbol}&apikey=6GUGOE51J9KLH0O2`,
    });

    const quoteData = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol.data.data.getStock.symbol}&apikey=6GUGOE51J9KLH0O2`,
    });

    const earnings = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol.data.data.getStock.symbol}&apikey=6GUGOE51J9KLH0O2`,
    });

    const balance = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol.data.data.getStock.symbol}&apikey=6GUGOE51J9KLH0O2`,
    });

    if (overviewData) {
      const update = await axios({
        url: process.env.API_I4T_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_I4T_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(updateStock),
          variables: {
            input: {
              id: event.arguments.id,
              sector: overviewData.data.Sector,
              employees: overviewData.data.FullTimeEmployees,
              marketCap: overviewData.data.MarketCapitalization,
              peratio: overviewData.data.PERatio,
              dividendYield: overviewData.data.DividendYield,
              beta: overviewData.data.Beta,
              quote: {
                price: processQuoteData(quoteData.data).GlobalQuote["05.price"],
                volume: processQuoteData(quoteData.data).GlobalQuote[
                  "06.volume"
                ],
                date: processQuoteData(quoteData.data).GlobalQuote[
                  "07.latesttradingday"
                ],
              },
              intrinsicValue: calculateIntrinsicValue(
                overviewData.data.PERatio,
                processQuoteData(quoteData.data).GlobalQuote["05.price"],
                earnings.data
              ),
              balance: balance.toString(),
              earnings: earnings.toString()
            },
          },
        },
      });
      return update.data.data.updateStock;
    } else {
      return "Unable to find stock data ... ";
    }
  } catch (err) {
    console.log("We got an error: ", err);
    return "Error updating stock ...";
  }
};
