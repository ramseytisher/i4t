/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addStock = /* GraphQL */ `
  mutation AddStock($symbol: String) {
    addStock(symbol: $symbol) {
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
      balance
      earnings
      createdAt
      updatedAt
    }
  }
`;
export const updateStockData = /* GraphQL */ `
  mutation UpdateStockData($id: String) {
    updateStockData(id: $id) {
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
      balance
      earnings
      createdAt
      updatedAt
    }
  }
`;
export const createStock = /* GraphQL */ `
  mutation CreateStock(
    $input: CreateStockInput!
    $condition: ModelStockConditionInput
  ) {
    createStock(input: $input, condition: $condition) {
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
      balance
      earnings
      createdAt
      updatedAt
    }
  }
`;
export const updateStock = /* GraphQL */ `
  mutation UpdateStock(
    $input: UpdateStockInput!
    $condition: ModelStockConditionInput
  ) {
    updateStock(input: $input, condition: $condition) {
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
      balance
      earnings
      createdAt
      updatedAt
    }
  }
`;
export const deleteStock = /* GraphQL */ `
  mutation DeleteStock(
    $input: DeleteStockInput!
    $condition: ModelStockConditionInput
  ) {
    deleteStock(input: $input, condition: $condition) {
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
      balance
      earnings
      createdAt
      updatedAt
    }
  }
`;
