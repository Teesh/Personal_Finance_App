import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { withStyles, WithStyles } from "@material-ui/core/styles"
import styles from '../css/styles'
import * as actionTypes from '../store/actions'
import { 
  Grid, 
  TextField, 
  InputAdornment, 
  Slider, 
  FormControlLabel, 
  FormControl, 
  FormGroup, 
  Select,
  InputLabel,
  MenuItem,
  Switch,
  RadioGroup,
  Radio,
} from '@material-ui/core'
import { effectiveTaxFormula, stateTaxRates } from "../helpers/taxes"

const mapStateToProps = (state: RootState) => ({
  salary: state.inc.salary,
  married: state.inc.married,
  taxRate: state.inc.taxRate,
  state: state.inc.state,
  deductions: state.inc.deductions,
  stdDeduct: state.inc.stdDeduct,
  retireContributions: state.inc.retireContributions,
  retireRate: state.inc.retireRate,
  retireRateOf: state.inc.retireRateOf,
})


const mapDispatchToProps = {
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => ({ type: actionTypes.HANDLE_INCOME_TEXT_CHANGE, name: event.target.name, value: event.target.value }),
  handleIncomeSliderChange: (event: React.ChangeEvent<{}>, value: number | number[]) => ({ type: actionTypes.HANDLE_INCOME_SLIDER_CHANGE, value: value }),
  handleMarriedChange: (event: React.ChangeEvent<{}>, value: string) => ({ type: actionTypes.HANDLE_MARRIED_CHANGE, value: value }),
  handleStdDeduct: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => ({ type: actionTypes.HANDLE_STD_DEDUCT_CHANGE, value: checked }),
  handleStateChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => ({ type: actionTypes.HANDLE_STATE_CHANGE, value: event.target.value }),
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & WithStyles<typeof styles>

class IncomeForm extends Component<Props, {}> {
  public render () {
    const { classes } = this.props

    let {etr, netpay} = effectiveTaxFormula({
      income: this.props.salary, 
      state: this.props.state,
      taxRate: this.props.taxRate,
      deductions: this.props.deductions,
      retireContributions: this.props.retireContributions,
    })

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.title}>
          <h3 className={classes.text}>Income and Deductions Information</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={this.props.salary}
            onChange={this.props.handleTextChange}
            name="salary"
            label="Annual Household Income"
            className={classes.field}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            inputProps={{
              min: 0,
              max: 1000000,
              step: 10000,
              type: 'number'
            }}
          ></TextField>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Slider
              value={this.props.salary}
              onChange={this.props.handleIncomeSliderChange}
              min={0}
              max={1000000}
              step={10000}
              className={classes.slider}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <RadioGroup row onChange={this.props.handleMarriedChange} value={this.props.married ? "married" : "single"}>
                <FormControlLabel
                  value="single"
                  control={<Radio color="primary" />}
                  label="Single"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="married"
                  control={<Radio color="primary" />}
                  label="Married"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Deductions"
            value={this.props.deductions}
            onChange={this.props.handleTextChange}
            name="deductions"
            className={classes.field}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            inputProps={{
              step: 10000,
              type:'number'
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={<Switch color="primary" checked={this.props.stdDeduct} onChange={this.props.handleStdDeduct} />}
              label="Use Standard Deductions"
            />
          </FormGroup>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              value={this.props.retireContributions}
              onChange={this.props.handleTextChange}
              name="retireContributions"
              label="Retirement Contributions"
              className={classes.field}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 19500,
                step: 100,
                type: 'number'
              }}
            ></TextField>
          </Grid><Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              value={this.props.retireRate}
              onChange={this.props.handleTextChange}
              name="retireRate"
              label="Employer Match"
              className={classes.field}
              InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
              inputProps={{
                min: 0,
                max: 100,
                type: 'number'
              }}
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={this.props.retireRateOf}
              onChange={this.props.handleTextChange}
              name="retireRateOf"
              label=" "
              className={classes.field}
              InputProps={{
                startAdornment: <InputAdornment position="start">of</InputAdornment>,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              inputProps={{
                min: 0,
                max: 100,
                type: 'number'
              }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} className={classes.title}>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="tax-native">State</InputLabel>
                <Select
                  onChange={this.props.handleStateChange}
                  className={classes.dropdown}
                  value={this.props.state}
                  id='tax-state-native'
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {Object.entries(stateTaxRates).map(([key, value]) => (
                    <MenuItem value={key} key={key}>{value.state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} className={classes.title}>
              <TextField
                label="Effective Tax Rate"
                className={classes.fieldInline}
                InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
                InputLabelProps={{shrink: true}}
                value={etr}
                disabled
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={netpay}
            onChange={this.props.handleTextChange}
            name="netIncome"
            label="Net Household Income"
            className={classes.field}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            disabled
          ></TextField>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(connector(IncomeForm))