import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Button, Layer, DataTable, TextInput } from "grommet";
import { Add, LinkPrevious, Search } from "grommet-icons";

const StockSearch = ({ createStock }) => {
  const stockListings = useStaticQuery(graphql`
    query {
      allStockListingCsv {
        nodes {
          id
          ipoDate
          name
          symbol
          status
          exchange
        }
      }
    }
  `);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState(stockListings.allStockListingCsv.nodes);

  useEffect(() => {
    console.log("StockListings", stockListings);
    const filtered = stockListings.allStockListingCsv.nodes.filter(
      ({ symbol, name }) => {
        const check =
          symbol.toString().toUpperCase().trim() +
          name.toString().toUpperCase().trim();
        return check.includes(search.trim().toUpperCase());
      }
    );

    setStocks(filtered);
  }, [search, stockListings]);

  return (
    <>
      <Button icon={<Add />} onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          position="left"
          full="vertical"
        >
          <Box width="large">
            <Box direction="row" pad="small" gap="large">
              <Button
                icon={<LinkPrevious />}
                onClick={() => {
                  setShow(false);
                  setSearch("");
                }}
              />
              <TextInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search />}
                reverse
              />
            </Box>
            <Box flex overflow="auto" pad="small">
              <DataTable
                columns={[
                  { property: "symbol", header: "Symbol", primary: true },
                  { property: "name", header: "Name" },
                  {
                    property: "action",
                    header: "Actions",
                    render: (datum) => (
                      <Button
                        icon={<Add />}
                        onClick={() => {
                          createStock(datum.symbol);
                          setShow(false);
                          setSearch("");
                        }}
                      />
                    ),
                  },
                ]}
                data={stocks}
                step={50}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default StockSearch;
