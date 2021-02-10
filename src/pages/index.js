import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Box, Grid, Form, FormField, Button, TextInput } from "grommet";

import {
  addStock as AddStock,
  deleteStock as DeleteStock,
} from "../graphql/mutations";
import { listStocks as ListStocks } from "../graphql/queries";

import Layout from "../components/layout";
import StockCard from "../components/stock-card";

// markup
const IndexPage = () => {
  const [symbol, setSymbol] = useState("CERN");
  const [search, setSearch] = useState("");
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

  async function createStock() {
    try {
      console.log("Trying ...", search);
      const temp = await API.graphql(
        graphqlOperation(AddStock, {
          symbol: search,
        })
      );
      setStocks([...stocks, temp.data.addStock]);
      setSearch("");
    } catch (err) {
      console.log("error creating stock", err);
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
      <div>
        <Box align="center">
          <Form
            value={search}
            onChange={({ symbol }) => setSearch(symbol)}
            onReset={() => setSearch("")}
            onSubmit={({ value }) => {
              createStock(search);
            }}
          >
            <FormField name="symbol" htmlFor="text-input-id" label="Symbol">
              <TextInput id="text-input-id" name="symbol" value={search} />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </Box>
        <Box pad="large">
          <Grid columns="medium" gap="medium">
            {stocks.map((stock) => (
              <StockCard stock={stock} remove={deleteStock} key={stock.id} />
            ))}
          </Grid>
        </Box>
      </div>
    </Layout>
  );
};

export default IndexPage;
