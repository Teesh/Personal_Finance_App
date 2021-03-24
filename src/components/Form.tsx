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
} from '@material-ui/core'

const styles = createStyles({
  inline: {
    flexGrow: 1,
  },
  text: {
    color: 'white',
  },
  block: {
    marginLeft: '20px',
    marginRight: '20px',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    color: 'black',
  },
  field: {
    width: '100%',
    marginTop: '10px',
    color: 'white',
  },
  dropdown: {
    minWidth: '200px',
    textAlign: 'left',
  },
  option: {
    marginLeft: '10px',
  }
})

const stateTaxRates = new Map<string, number>([
  ['IL', 6.25]
])

const effectiveTaxFormula = (income: number, state: string): number => {
  let tax = 0
  let stateTaxRate = stateTaxRates.get(state)
  let stateTax = stateTaxRate ? income * stateTaxRate / 100 : 0
  return tax
}

class Form extends Component<WithStyles<typeof styles>, {}> {
  state = {
    salary: 50000,
    autotax: false,
    taxrate: 0,
    state: '',
  }

  private handleIncomeSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    this.setState({
      salary: newValue
    })
  }

  private handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      salary: event.target.value
    })
  }

  private handleAutoTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      autotax: event.target.checked,
      state: '',
    })
  }

  private handleStateChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    this.setState({
      state: event.target.value
    })
  }

  private handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taxrate: event.target.value
    })
  }

  public render () {
    const { classes } = this.props

    let taxRateInput
    if (this.state.autotax) {
      taxRateInput = (
        <div className={classes.inline}>
          <Grid container spacing={3}>
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
                  <MenuItem value="IL">Illinois</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} className={classes.title}>
              <TextField
                label="Effective Tax Rate"
                className={classes.field}
                InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
                InputLabelProps={{shrink: true}}
                value={this.state.taxrate}
                onChange={this.handleTaxRateChange}
                disabled
              ></TextField>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      taxRateInput = (
        <TextField
          label="Effective Tax Rate"
          className={classes.field}
          InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
          InputLabelProps={{shrink: true}}
          value={this.state.taxrate}
          onChange={this.handleTaxRateChange}
        ></TextField>
      )
    }

    return (
      <div className={classes.block}>
        <Grid item xs={12} className={classes.title}>
          <h3 className={classes.text}>Enter Information</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={this.state.salary}
            onChange={this.handleIncomeChange}
            label="Gross Income"
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
        <Grid item xs={12}>
          <Slider
            value={this.state.salary}
            onChange={this.handleIncomeSliderChange}
            min={0}
            max={1000000}
            step={10000}
          />
        </Grid>
        <Grid item xs={12}>
          {taxRateInput}
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={<Checkbox checked={this.state.autotax} color="primary" onChange={this.handleAutoTaxChange}/>}
                label="Auto-calculate"
              ></FormControlLabel>
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Monthly Rent"
            className={classes.field}
            InputProps={
              {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="start">/mo</InputAdornment>
              }
            }
          ></TextField>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Form)