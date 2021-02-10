import React, { useEffect, useState } from "react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import {
  addStock as AddStock,
  deleteStock as DeleteStock,
} from "../graphql/mutations";
import { listStocks as ListStocks } from "../graphql/queries";

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
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (err) {
      console.log("error deleting stock: ", err);
    }
  }

  return (
    <div style={styles.container}>
      <h2>i4t</h2>
      <AmplifyAuthenticator>
        <AmplifySignOut />
        <form
          onSubmit={(e) => {
            createStock(search);
            setSearch("");
            e.preventDefault();
          }}
        >
          <label>
            Add stock:
            <input
              type="text"
              name="symbol"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
        <div>
          {stocks.map((stock) => (
            <div>
              <div>
                <pre>{JSON.stringify(stock, null, 2)}</pre>
              </div>
              <button onClick={() => setSymbol(stock.symbol)}>
                Get Details
              </button>
              <button onClick={() => deleteStock(stock.id)}>
                Delete: {stock.symbol}
              </button>
            </div>
          ))}
        </div>
      </AmplifyAuthenticator>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default IndexPage;
