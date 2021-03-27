import React, { Component } from 'react'
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
import { 
  Grid, 
  TextField, 
  InputAdornment, 
  Slider, 
  Checkbox, 
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

class IncomeForm extends Component<WithStyles<typeof styles>, {}> {
  state = {
    salary: 50000,
    married: false,
    taxRate: 25,
    state: '',
    deductions: 0,
    stdDeduct: false,
    retireContributions: 0,
    retireRate: 0,
    retireRateOf: 0,
  }

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
      income: this.state.salary, 
      state: this.state.state,
      taxRate: this.state.taxRate,
      deductions: this.state.deductions,
      retireContributions: this.state.retireContributions,
      retireRate: this.state.retireRate,
      retireRateOf: this.state.retireRateOf,
    })

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.title}>
          <h3 className={classes.text}>Income and Deductions Information</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={this.state.salary}
            onChange={this.handleTextChange}
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
              value={this.state.salary}
              onChange={this.handleIncomeSliderChange}
              min={0}
              max={1000000}
              step={10000}
              className={classes.slider}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <RadioGroup row onChange={this.handleMarriedChange} value={this.state.married ? "married" : "single"}>
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
            value={this.state.deductions}
            onChange={this.handleTextChange}
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
              control={<Switch color="primary" checked={this.state.stdDeduct} onChange={this.handleStdDeduct} />}
              label="Use Standard Deductions"
            />
          </FormGroup>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              value={this.state.retireContributions}
              onChange={this.handleTextChange}
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
              value={this.state.retireRate}
              onChange={this.handleTextChange}
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
              value={this.state.retireRateOf}
              onChange={this.handleTextChange}
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
                  onChange={this.handleStateChange}
                  className={classes.dropdown}
                  value={this.state.state}
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

export default withStyles(styles)(IncomeForm)