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
import { Trash, DocumentTest, Update, Code } from "grommet-icons";

const StockCard = ({ stock, remove, update }) => {
  const [show, setShow] = useState(null);

  return (
    <Card>
      <CardHeader pad="small" background="light-2">
        <Box direction="row" gap="small">
          <Text weight="bold">{stock.symbol}</Text>
          <Text>{stock.description}</Text>
        </Box>
      </CardHeader>
      <CardBody pad="medium">
        <pre>{JSON.stringify(stock, null, 2)}</pre>
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
        <Button
          icon={<DocumentTest />}
          hoverIndicator
          onClick={() => setShow(stock)}
        />
      </CardFooter>
      {show && (
        <Layer onEsc={() => setShow(null)} onClickOutside={() => setShow(null)}>
          <Box pad="medium">
            <pre>{stock.overview}</pre>
            <Button label="close" onClick={() => setShow(null)} />
          </Box>
        </Layer>
      )}
    </Card>
  );
};

export default StockCard;
