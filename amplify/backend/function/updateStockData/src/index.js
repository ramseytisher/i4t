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

const updateStock = gql`
  mutation updateStock($input: UpdateStockInput!) {
    updateStock(input: $input) {
      id
      overview
      symbol
      description
      createdAt
      updatedAt
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

exports.handler = async (event) => {
  console.log("ID is: ", event.arguments.id);
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
              overview: JSON.stringify(overviewData.data),
            },
          },
        },
      });
      return update.data.data.updateStock
    } else {
      return "Unable to find stock data ... "
    }
  } catch (err) {
    return "Error updating stock ...";
  }
};