const stateTaxRatesUnsorted: StateTaxes = {
  'AK': {state: 'Alaska', rate: 0},
  'FL': {state: 'Florida', rate: 0},
  'NV': {state: 'Nevada', rate: 0},
  'SD': {state: 'South Dakota', rate: 0},
  'TN': {state: 'Tennessee', rate: 0},
  'TX': {state: 'Texas', rate: 0},
  'WA': {state: 'Washington', rate: 0},
  'WY': {state: 'Wyoming', rate: 0},
  'CO': {state: 'Colorado', rate: 4.55},
  'IL': {state: 'Illinois', rate: 4.95},
  'IN': {state: 'Indiana', rate: 3.23},
  'KY': {state: 'Kentucky', rate: 5},
  'MA': {state: 'Massachusetts', rate: 5},
  'MI': {state: 'Michigan', rate: 4.25},
  'NH': {state: 'New Hampshire', rate: 0},
  'NC': {state: 'North Carolina', rate: 5.25},
  'PA': {state: 'Pennsylvania', rate: 3.07},
  'UT': {state: 'Utah', rate: 4.95},
}

export const stateTaxRates = Object.keys(stateTaxRatesUnsorted).sort().reduce(
  (p: StateTaxes, c: string) => {
    p[c] = stateTaxRatesUnsorted[c]
    return p
  },
  {}
)

const federalTaxBrackets: taxBracket[] = [
  { maxIncome: 9875, rate: 10, maxInBracket: 987.5 },
  { maxIncome: 40125, rate: 12, maxInBracket: 3630 },
  { maxIncome: 85525, rate: 22, maxInBracket: 9987.78 },
  { maxIncome: 163300, rate: 24, maxInBracket: 18665.76 },
  { maxIncome: 207350, rate: 32, maxInBracket: 14095.68 },
  { maxIncome: 518400, rate: 35, maxInBracket: 108867.15 },
  { maxIncome: 1000001, rate: 37, maxInBracket: 108867.15 },
]

const ficaTaxRate = 7.65

export const effectiveTaxFormula = ({
  income, 
  state,
  taxRate,
  deductions, 
  retireContributions,
}: TaxInputs): {etr: number, netpay: number} => {
  let output = { 
    etr: 0,
    netpay: income - retireContributions,
  }
  let taxableIncome = income - deductions - retireContributions
  let tax = 0

  if (state !== '') {
    let stateTaxRate = stateTaxRates[state].rate
    let stateTax = taxableIncome * stateTaxRate / 100

    let ficaTax = taxableIncome * ficaTaxRate / 100

    let bracket = federalTaxBrackets.findIndex(b => b.maxIncome > taxableIncome)
    let lowerBracketsTaxSum = federalTaxBrackets.slice(0, bracket).reduce((a: number, b: taxBracket)=>a+b.maxInBracket,0)
    let highestBracketTax = (taxableIncome - federalTaxBrackets[bracket-1].maxIncome) * federalTaxBrackets[bracket].rate / 100
    tax = stateTax + lowerBracketsTaxSum + highestBracketTax + ficaTax
    output.etr = Math.round(tax / taxableIncome * 10000) / 100
  } else if (taxRate !== 0) {
    tax = taxableIncome * taxRate / 100
  }
  output.netpay = Math.round((output.netpay - tax) * 100) / 100
  return output
}

const statePropertyTaxes: StateTaxes = {
  'NJ': {state: 'New Jersey', rate: 2.49},
  'CT': {state: 'Connecticut', rate: 2.14},
  'VT': {state: 'Vermont', rate: 1.90},
  'WI': {state: 'Wisconsin', rate: 1.85},
  'NE': {state: 'Nebraska', rate: 1.73},
  'NY': {state: 'New York', rate: 1.72},
  'RI': {state: 'Rhode Island', rate: 1.63},
  'IA': {state: 'Iowa', rate: 1.573},
  'OH': {state: 'Ohio', rate: 1.56},
  'MI': {state: 'Michigan', rate: 1.54},
  'KS': {state: 'Kansas', rate: 1.41},
  'ME': {state: 'Maine', rate: 1.36},
  'MN': {state: 'Minnesota', rate: 1.12},
  'MD': {state: 'Maryland', rate: 1.09},
  'ND': {state: 'North Dakota', rate: 0.98},
  'MO': {state: 'Missouri', rate: 0.97},
  'OR': {state: 'Oregon', rate: 0.97},
  'GA': {state: 'Georfia', rate: 0.92},
  'OK': {state: 'Oklahoma', rate: 0.90},
  'IN': {state: 'Indiana', rate: 0.85},
  'MT': {state: 'Montana', rate: 0.84},
  'NC': {state: 'North Carolina', rate: 0.84},
  'VI': {state: 'Virginia', rate: 0.82},
  'MS': {state: 'Mississippi', rate: 0.81},
  'NM': {state: 'New Mexico', rate: 0.80},
  'CA': {state: 'California', rate: 0.76},
  'ID': {state: 'Idaho', rate: 0.69},
  'AZ': {state: 'Arizona', rate: 0.66},
  'AR': {state: 'Arkansas', rate: 0.62},
  'WV': {state: 'West Virginia', rate: 0.58},
  'SC': {state: 'South Carolina', rate: 0.57},
  'DL': {state: 'Delaware', rate: 0.57},
  'DC': {state: 'District of Columbia', rate: 0.56},
  'LA': {state: 'Louisiana', rate: 0.55},
  'AL': {state: 'Alabama', rate: 0.41},
  'HA': {state: 'Hawaii', rate: 0.28},
  'AK': {state: 'Alaska', rate: 1.19},
  'FL': {state: 'Florida', rate: 0.89},
  'NV': {state: 'Nevada', rate: 0.60},
  'SD': {state: 'South Dakota', rate: 1.31},
  'TN': {state: 'Tennessee', rate: 0.71},
  'TX': {state: 'Texas', rate: 1.8},
  'WA': {state: 'Washington', rate: 0.98},
  'WY': {state: 'Wyoming', rate: 0.61},
  'CO': {state: 'Colorado', rate: 0.51},
  'IL': {state: 'Illinois', rate: 2.27},
  'KY': {state: 'Kentucky', rate: 0.86},
  'MA': {state: 'Massachusetts', rate: 1.23},
  'NH': {state: 'New Hampshire', rate: 2.18},
  'PA': {state: 'Pennsylvania', rate: 1.58},
  'UT': {state: 'Utah', rate: 0.63},
}

export const propertyTaxFormula = ({
  propertyValue,
  state,
}: PropertyInputs): number => {
  if (state=== '') return 0
  return Math.round(propertyValue * statePropertyTaxes[state].rate / 12) / 100
}

export const monthlyMortgageFormula = ({
  propertyValue,
  propertyTax,
  mortgageRate,
  downPayment,
  mortgageLength,
  pmiRate,
  hoaFees,
}: MortgageInputs): number => {
  let monthly = 0
  let p = propertyValue - (downPayment * 0.2 * propertyValue / 100)
  let n = mortgageLength * 12
  let i = mortgageRate / 12 / 100
  let m = +p * +i * Math.pow(1 + +i, n) / (Math.pow(1 + +i, n) - 1)
  console.log(n, i, 1 + +i, Math.pow(1 + +i, n))
  monthly = +m + +propertyTax + +hoaFees
  return Math.round(monthly * 100) / 100
}

export const monthlySavingsFormula = ({
  netIncome,
  homeowner,
  monthlyPropertyTax,
  mortgagePay,
  hoaFees,
  rent,
  rentInsurance,
  utilities,
  groceries,
  misc,
}: SavingsInputs): number => {
  let houseFees = 0
  if (homeowner) houseFees += +monthlyPropertyTax + +mortgagePay + +hoaFees
  else houseFees += +rent + +rentInsurance
  return Math.round(((netIncome / 12) - +utilities - +groceries - +misc - +houseFees ) * 100) / 100
}