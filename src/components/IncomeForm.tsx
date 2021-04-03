import React, { Component } from 'react'
import { compose } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
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

const styles = createStyles({
  inline: {
    flexGrow: 1,
  },
  text: {
    color: 'white',
    marginTop: 0
  },
  block: {
    marginLeft: '20px',
    marginRight: '20px',
    color: 'white',
  },
  title: {
    textAlign: 'center',
  },
  field: {
    width: '100%',
    marginTop: '10px',
    color: 'white',
  },
  fieldInline: {
    width: '100%',
    marginTop: '10px',
    color: 'white',
    marginLeft: '10px'
  },
  dropdown: {
    minWidth: '200px',
    textAlign: 'left',
  },
  option: {
    marginLeft: '10px',
  },
  slider: {
    marginTop: '10px'
  },
})

const mapStateToProps = (state: RootState) => ({
  salary: state.salary,
  married: state.married,
  taxRate: state.taxRate,
  state: state.state,
  deductions: state.deductions,
  stdDeduct: state.stdDeduct,
  retireContributions: state.retireContributions,
  retireRate: state.retireRate,
  retireRateOf: state.retireRateOf,
})


const mapDispatchToProps = {
  handleTextChange: () => ({ type: 'HANDLE_TEXT_CHANGE' }),
  handleIncomeSliderChange: () => ({ type: 'HANDLE_INCOME_SLIDER_CHANGE' }),
  handleMarriedChange: () => ({ type: 'HANDLE_MARRIED_CHANGE' }),
  handleStdDeduct: () => ({ type: 'HANDLE_STD_DEDUCT_CHANGE' }),
  handleStateChange: () => ({ type: 'HANDLE_STATE_CHANGE' }),
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & WithStyles<typeof styles>

class IncomeForm extends Component<Props, {}> {
  private handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  private handleIncomeSliderChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    this.setState({
      salary: value
    })
  }

  private handleMarriedChange = (event: React.ChangeEvent<{}>, value: string) => {
    this.setState({
      married: value === "single" ? false : true
    })
  }

  private handleStdDeduct = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({
      stdDeduct: checked,
      deductions: checked ? 12400 : 0,
    })
  }

  private handleStateChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    this.setState({
      state: event.target.value
    })
  }

  public render () {
    const { classes } = this.props

    let {etr, netpay} = effectiveTaxFormula({
      income: this.props.salary, 
      state: this.props.state,
      taxRate: this.props.taxRate,
      deductions: this.props.deductions,
      retireContributions: this.props.retireContributions,
      retireRate: this.props.retireRate,
      retireRateOf: this.props.retireRateOf,
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
                max: 1000000,
                step: 10000,
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