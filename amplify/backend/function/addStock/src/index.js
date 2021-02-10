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

const createStock = gql`
  mutation createStock($input: CreateStockInput!) {
    createStock(input: $input) {
      id
      symbol
      description
      eps
      createdAt
      updatedAt
    }
  }
`;

const listStocks = gql`
  query listStocks {
    listStocks {
      items {
        id
        symbol
      }
    }
  }
`;

exports.handler = async (event) => {

  try {
    const stockData = await axios({
        method: "get",
        url: `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${event.arguments.symbol}&apikey=6GUGOE51J9KLH0O2`
    })
    
    const current = await axios({
      url: process.env.API_I4T_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_I4T_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(listStocks),
      },
    });

    if (
      current.data.data.listStocks.items.findIndex(
        (i) => i.symbol === event.arguments.symbol
      ) === -1
    ) {
      // Then we need to add this stock
      const create = await axios({
        url: process.env.API_I4T_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_I4T_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(createStock),
          variables: {
            input: {
              symbol: event.arguments.symbol,
              description: stockData.data.Name,
              eps: stockData.data.EPS
            },
          },
        },
      });

      return create.data.data.createStock;
    } else {
      // We say we already have this stock
      return "Stock already exists..."
    }
  } catch (err) {
    console.log("Error adding stock: ", err);
    return "Error adding stock ...";
  }
  return "Hello";
};
