import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { withStyles, WithStyles } from "@material-ui/core/styles"
import styles from '../css/styles'
import * as actionTypes from '../store/actions'
import { 
  Grid, 
  TextField,
  InputAdornment,
  Switch,
  Slider,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import { monthlySavingsFormula, propertyTaxFormula, monthlyMortgageFormula } from "../helpers/taxes"

const mapStateToProps = (state: RootState) => ({
  homeowner: state.exp.homeowner,
  rent: state.exp.rent,
  rentInsurance: state.exp.rentInsurance,
  utilities: state.exp.utilities,
  groceries: state.exp.groceries,
  misc: state.exp.misc,
  mortgageRate: state.exp.mortgageRate,
  propertyValue: state.exp.propertyValue,
  downPayment: state.exp.downPayment,
  mortgageLength: state.exp.mortgageLength,
  pmiRate: state.exp.pmiRate,
  hoaFees: state.exp.hoaFees,
  state: state.inc.state,
  netIncome: state.inc.netIncome,
})

const mapDispatchToProps = {
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => ({ type: actionTypes.HANDLE_EXPENSES_TEXT_CHANGE, name: event.target.name, value: event.target.value }),
  handleSliderChange: (event: React.ChangeEvent<{}>, value: number | number[]) => ({ type: actionTypes.HANDLE_EXPENSES_SLIDER_CHANGE, value: value }),
  handleYearChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => ({ type: actionTypes.HANDLE_YEAR_CHANGE, value: event.target.value }),
  handleHomeownerChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => ({ type: actionTypes.HANDLE_HOMEOWNER_CHANGE, value: checked })
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & WithStyles<typeof styles>

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '5%',
  },
  {
    value: 50,
    label: '10%',
  },
  {
    value: 75,
    label: '15%',
  },
  {
    value: 100,
    label: '20%',
  },
]

const valueLabelFormat = (value: number) => {
  let m = marks.find((mark) => mark.value === value)
  return m ? m.label : ''
}

const valueText = (value: number) => {
  let text = marks.find((mark) => mark.value === value)?.label
  return text ? text : ''
}

class ExpensesForm extends Component<Props, {}> {
  public render () {
    const { classes } = this.props

    let propertyTax = propertyTaxFormula({
      propertyValue: this.props.propertyValue,
      state: this.props.state,
    })

    let monthlyMortgage = monthlyMortgageFormula({
      propertyValue: this.props.propertyValue,
      propertyTax: propertyTax,
      mortgageRate: this.props.mortgageRate,
      downPayment: this.props.downPayment,
      mortgageLength: this.props.mortgageLength,
      pmiRate: this.props.pmiRate,
      hoaFees: this.props.hoaFees,
    })

    let monthlySavings = monthlySavingsFormula({
      netIncome: this.props.netIncome,
      homeowner: this.props.homeowner,
      monthlyPropertyTax: propertyTax,
      mortgagePay: monthlyMortgage,
      hoaFees: this.props.hoaFees,
      rent: this.props.rent,
      rentInsurance: this.props.rentInsurance,
      utilities: this.props.utilities,
      groceries: this.props.groceries,
      misc: this.props.misc,
    })

    let housing
    if (this.props.homeowner) {
      housing = (
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                value={this.props.propertyValue}
                onChange={this.props.handleTextChange}
                label="Property Value"
                name="propertyValue"
                className={classes.field}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                inputProps={{
                  min: 0,
                  max: 5000000,
                  step: 10000,
                  type: 'number'
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={propertyTax}
                label="Monthly Property Tax"
                className={classes.fieldInline}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                disabled
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
           <Grid item xs={6}>
              <TextField
                value={this.props.mortgageRate}
                onChange={this.props.handleTextChange}
                label="Mortgage Rate"
                name="mortgageRate"
                placeholder="3.18"
                className={classes.field}
                InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
                inputProps={{
                  min: 0,
                  max: 1000000,
                  step: 10,
                  type: 'number'
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography id="discrete-slider-restrict" className={classes.fieldSliderLabel} gutterBottom>
                Down Payment
              </Typography>
              <Slider
                defaultValue={50}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valueText}
                onChange={this.props.handleSliderChange}
                name="downPayment"
                aria-labelledby="discrete-slider-restrict"
                className={classes.fieldSlider}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.title}>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="mortgage-native">Mortgage Length</InputLabel>
                <Select
                  onChange={this.props.handleYearChange}
                  className={classes.dropdown}
                  value={this.props.mortgageLength}
                  id='mortgage-length-native'
                >
                  <MenuItem value={30}>30 yrs</MenuItem>
                  <MenuItem value={20}>20 yrs</MenuItem>
                  <MenuItem value={15}>15 yrs</MenuItem>
                  <MenuItem value={10}>10 yrs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={this.props.pmiRate}
                onChange={this.props.handleTextChange}
                name="pmiRate"
                label="Private Mortage Insurance Rate"
                className={classes.fieldInline}
                InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
                inputProps={{
                  min: 0,
                  max: 5,
                  step: 0.1,
                  type: 'number'
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                value={this.props.hoaFees}
                onChange={this.props.handleTextChange}
                name="hoaFees"
                label="HOA Fees and Home Insurance"
                className={classes.field}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                inputProps={{
                  min: 0,
                  max: 10000,
                  step: 10,
                  type: 'number'
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={monthlyMortgage}
                label="Monthly Mortgage Payment"
                className={classes.fieldInline}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                disabled
              ></TextField>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    } else {
      housing = (
        <React.Fragment>
          <Grid item xs={12}>
            <TextField
              value={this.props.rent}
              onChange={this.props.handleTextChange}
              name="rent"
              label="Monthly Rent"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 1000000,
                step: 10,
                type: 'number'
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={this.props.rentInsurance}
              onChange={this.props.handleTextChange}
              name="rentInsurance"
              label="Monthly Rental Insurance"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 10000,
                step: 10,
                type: 'number'
              }}
            ></TextField>
          </Grid>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.title}>
          <h3 className={classes.text}>Expenses Information</h3>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item className={classes.label}>Renting</Grid>
          <Grid item><Switch color="primary"  checked={this.props.homeowner} onChange={this.props.handleHomeownerChange}/></Grid>
          <Grid item className={classes.label}>Homeowner</Grid>
        </Grid>
        {housing}
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              value={this.props.utilities}
              onChange={this.props.handleTextChange}
              name="utilities"
              label="Montly Utilities (including cable)"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 1000000,
                step: 10,
                type: 'number'
              }}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={this.props.groceries}
              onChange={this.props.handleTextChange}
              name="groceries"
              label="Montly Groceries and Dining"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 1000000,
                step: 10,
                type: 'number'
              }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              value={this.props.misc}
              onChange={this.props.handleTextChange}
              name="misc"
              label="Miscellaneous Costs"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 1000000,
                step: 10,
                type: 'number'
              }}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={monthlySavings}
              label="Monthly Savings"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              disabled
            ></TextField>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(connector(ExpensesForm))