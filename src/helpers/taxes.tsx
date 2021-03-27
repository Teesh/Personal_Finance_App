interface taxBracket {
  maxIncome: number
  rate: number
  maxInBracket: number
}

interface StateTaxes {
  [key: string]: {state: string, rate: number}
}

interface TaxState {
  income: number, 
  state: string,
  taxRate: number,
  deductions: number, 
  retireContributions: number,
  retireRate: number,
  retireRateOf: number,
}

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
  retireRate,
  retireRateOf,
}: TaxState): {etr: number, netpay: number} => {
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
  output.netpay -= tax
  return output
}