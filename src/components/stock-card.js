import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Layer,
} from "grommet";
import { Trash, Update } from "grommet-icons";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const StockCard = ({ stock, remove, update }) => {
  const [show, setShow] = useState(null);

  return (
    <Card>
      <CardHeader pad="small" background="light-2">
        <Box fill direction="row" gap="small" align="center" justify="between">
          <Text weight="bold">{stock.symbol}</Text>
          <Text truncate>{stock.description}</Text>
          {stock.quote && (
            <Button
              color="accent-1"
              label={formatter.format(stock.quote.price)}
              onClick={() => setShow(stock)}
            />
          )}
        </Box>
      </CardHeader>
      <CardBody pad="medium">
        <Text> Market Cap: {formatter.format(stock.marketCap)}</Text>
        <Text> Employees: {stock.employees}</Text>
        {stock.intrinsicValue && (
          <Text>
            {" "}
            Intrinsic Value (Last 3 Year): {parseFloat(stock.intrinsicValue.threeYearValue).toFixed(2)}
          </Text>
        )}
        <Text> PE Ratio: {stock.peratio}</Text>
        <Text> Dividend Yield: {`${stock.dividendYield}%`}</Text>
      </CardBody>
      <CardFooter pad="small" background="light-2">
        <Text size="small">Last Updated: {stock.updatedAt}</Text>
        <Button
          icon={<Trash />}
          hoverIndicator
          onClick={() => remove(stock.id)}
        />
        <Button
          icon={<Update />}
          hoverIndicator
          onClick={() => update(stock.id)}
        />
      </CardFooter>
      {show && (
        <Layer onEsc={() => setShow(null)} onClickOutside={() => setShow(null)}>
          <Box pad="medium">
            <pre>{JSON.stringify(stock, null, 2)}</pre>
            <Button label="close" onClick={() => setShow(null)} />
          </Box>
        </Layer>
      )}
    </Card>
  );
};

export default StockCard;
