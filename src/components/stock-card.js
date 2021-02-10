import React, { useEffect, useState } from "react";
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Text } from "grommet";
import { Trash } from "grommet-icons";

const StockCard = ({ stock, remove }) => {
  return (
    <Card>
      <CardHeader pad="small" background="accent-4">
        <Box>
          <Text>{stock.symbol}</Text>
          <Text>{stock.description}</Text>
        </Box>
      </CardHeader>
      <CardBody pad="medium">
        <pre>{JSON.stringify(stock, null, 2)}</pre>
      </CardBody>
      <CardFooter pad="small" background="dark-2">
        <Text size="small">Last Updated: {stock.updatedAt}</Text>
        <Button
          icon={<Trash />}
          hoverIndicator
          onClick={() => remove(stock.id)}
        />
      </CardFooter>
    </Card>
  );
};

export default StockCard;
