import React, { useEffect, useState } from "react";
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
import { Trash, DocumentTest } from "grommet-icons";

const StockCard = ({ stock, remove }) => {
  const [show, setShow] = useState(null);

  return (
    <Card>
      <CardHeader pad="small" background="accent-4">
        <Box direction="row" gap="small">
          <Text weight="bold">{stock.symbol}</Text>
          <Text>{stock.description}</Text>
        </Box>
      </CardHeader>
      <CardBody pad="medium">
        <Text>EPS: {stock.eps}</Text>
      </CardBody>
      <CardFooter pad="small" background="dark-2">
        <Button
          icon={<Trash />}
          hoverIndicator
          onClick={() => remove(stock.id)}
        />
        <Text size="small">Last Updated: {stock.updatedAt}</Text>
        <Button
          icon={<DocumentTest />}
          hoverIndicator
          onClick={() => setShow(stock)}
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
