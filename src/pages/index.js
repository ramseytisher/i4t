import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Box, Grid } from "grommet";

import {
  addStock as AddStock,
  updateStockData as UpdateStockData,
  deleteStock as DeleteStock,
} from "../graphql/mutations";
import { listStocks as ListStocks } from "../graphql/queries";

import Layout from "../components/layout";
import StockCard from "../components/stock-card";
import StockSearch from "../components/stock-search";

// markup
const IndexPage = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  async function fetchStocks() {
    try {
      const stockData = await API.graphql(graphqlOperation(ListStocks));
      const stocks = stockData.data.listStocks.items;
      setStocks(stocks);
    } catch (err) {
      console.log("error fetching stocks");
    }
  }

  async function createStock(symbol) {
    try {
      const temp = await API.graphql(
        graphqlOperation(AddStock, {
          symbol: symbol,
        })
      );
      setStocks([...stocks, temp.data.addStock]);
    } catch (err) {
      console.log("error creating stock", err);
    }
  }

  async function updateStockData(id) {
    try {
      const update = await API.graphql(
        graphqlOperation(UpdateStockData, {
          id: id,
        })
      );
      const stockIndex = stocks.findIndex(
        (e) => e.id === update.data.updateStockData.id
      );
      let newStocks = [...stocks];
      newStocks[stockIndex] = update.data.updateStockData;
      setStocks(newStocks);
    } catch (err) {
      console.log("error updating stock", err);
    }
  }

  async function deleteStock(id) {
    try {
      console.log("Deleting ...");
      const deleteItem = await API.graphql(
        graphqlOperation(DeleteStock, {
          input: {
            id: id,
          },
        })
      );
      console.log("Deleted: ", deleteItem);
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (err) {
      console.log("error deleting stock: ", err);
    }
  }

  return (
    <Layout>
      <Box direction="row-responsive" gap="small">
        <Box>
          <StockSearch createStock={createStock} />
        </Box>
        <Box fill>
          <Grid columns="medium" gap="medium">
            {stocks.map((stock) => (
              <StockCard
                stock={stock}
                remove={deleteStock}
                update={updateStockData}
                key={stock.id}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default IndexPage;
