/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStock = /* GraphQL */ `
  query GetStock($id: ID!) {
    getStock(id: $id) {
      id
      symbol
      sector
      employees
      marketCap
      description
      peratio
      dividendYield
      beta
      quote {
        price
        volume
        date
      }
      intrinsicValue {
        threeYearValue
        fiveYearValue
        fourQuarterTrendUp
      }
      createdAt
      updatedAt
    }
  }
`;
export const listStocks = /* GraphQL */ `
  query ListStocks(
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        sector
        employees
        marketCap
        description
        peratio
        dividendYield
        beta
        quote {
          price
          volume
          date
        }
        intrinsicValue {
          threeYearValue
          fiveYearValue
          fourQuarterTrendUp
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
