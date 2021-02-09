import React, { useEffect, useState } from "react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createStock } from "../graphql/mutations";
import { listStocks } from "../graphql/queries";

const initialState = { name: '', description: '' }

// markup
const IndexPage = () => {
  const [formState, setFormState] = useState(initialState);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchStocks() {
    try {
      const stockData = await API.graphql(graphqlOperation(listStocks));
      const stocks = stockData.data.listStocks.items;
      setStocks(stocks);
    } catch (err) {
      console.log("error fetching stocks");
    }
  }

  async function addStock() {
    try {
      if (!formState.name || !formState.description) return;
      const stock = { ...formState };
      setStocks([...stocks, stock]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createStock, { input: stock }));
    } catch (err) {
      console.log("error creating stock:", err);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Stocks</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addStock}>
        Create Stock
      </button>
      {stocks.map((stock, index) => (
        <div key={stock.id ? stock.id : index} style={styles.stock}>
          <p style={styles.stockName}>{stock.name}</p>
          <p style={styles.stockDescription}>{stock.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}


export default IndexPage;
