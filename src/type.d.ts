interface RootState {
  inc: IncomeState,
  exp: ExpensesState,
}

interface IncomeState {
  salary: number,
  married: boolean,
  taxRate: number,
  state: string,
  deductions: number,
  stdDeduct: boolean,
  retireContributions: number,
  retireRate: number,
  retireRateOf: number,
  netIncome: number,
  effectiveTaxRate: number,
}

interface ExpensesState {
  homeowner: booleanB,
  rent: number,
  rentInsurance: number,
  utilities: number,
  groceries: number,
  misc: number,
  mortgagePay: number,
  mortgageRate: number,
  propertyValue: number,
  hoaFees: number,
  hoInsurance: number,
  downPayment: number,
  mortgageLength: number,
  pmiRate: number,
}

interface taxBracket {
  maxIncome: number
  rate: number
  maxInBracket: number
}

interface StateTaxes {
  [key: string]: {state: string, rate: number}
}

interface TaxInputs {
  income: number, 
  state: string,
  taxRate: number,
  deductions: number, 
  retireContributions: number,
}

interface PropertyInputs {
  propertyValue: number,
  state: string,
}

interface MortgageInputs {
  propertyValue: number,
  propertyTax: number,
  mortgageRate: number,
  downPayment: number,
  mortgageLength: number,
  pmiRate: number,
  hoaFees: number,
}

interface SavingsInputs {
  netIncome: number,
  homeowner: boolean,
  monthlyPropertyTax: number,
  mortgagePay: number,
  hoaFees: number,
  rent: number,
  rentInsurance: number,
  utilities: number,
  groceries: number,
  misc: number,
}