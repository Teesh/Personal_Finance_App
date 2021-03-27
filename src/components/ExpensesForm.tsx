import React, { Component } from 'react'
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
import { 
  Grid, 
  TextField,
  InputAdornment,
  Switch,
} from '@material-ui/core'

const styles = createStyles({
  inline: {
    flexGrow: 1,
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
  text: {
    color: 'white',
    marginTop: 0
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
  label: {
    marginBottom: '5px',
  }
})

class ExpensesForm extends Component<WithStyles<typeof styles>, {}> {
  state = {
    homeowner: false,
    rent: 0,
    rentInsurance: 0,
    utilities: 0,
    groceries: 0,
    misc: 0,
    mortgagePay: 0,
    mortgageRate: 3.48,
    propertyValue: 0,
    hoaFees: 0,
    hoInsurance: 0,
  }

  private handleHomeownerDeduct = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({
      homeowner: checked,
    })
  }
  
  private handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  public render () {
    const { classes } = this.props

    let housing
    if (this.state.homeowner) {
      housing = (
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                value={this.state.mortgagePay}
                onChange={this.handleTextChange}
                name="mortgagePay"
                label="Monthly Mortgage Payment"
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
                value={this.state.mortgageRate}
                onChange={this.handleTextChange}
                label="Mortgage Rate"
                name="mortgageRate"
                placeholder="3.48"
                className={classes.fieldInline}
                InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
                inputProps={{
                  min: 0,
                  max: 1000000,
                  step: 10,
                  type: 'number'
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                value={this.state.propertyValue}
                onChange={this.handleTextChange}
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
                value={this.state.rent}
                label="Monthly Property Tax"
                className={classes.fieldInline}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                disabled
              ></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                value={this.state.hoaFees}
                onChange={this.handleTextChange}
                name="hoaFees"
                label="HOA Fees"
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
                value={this.state.hoInsurance}
                onChange={this.handleTextChange}
                name="hoInsurance"
                label="Monthly Homeowner's Insurance"
                className={classes.fieldInline}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                inputProps={{
                  min: 0,
                  max: 10000,
                  step: 10,
                  type: 'number'
                }}
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
              value={this.state.rent}
              onChange={this.handleTextChange}
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
              value={this.state.rentInsurance}
              onChange={this.handleTextChange}
              name="rent"
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
          <Grid item><Switch color="primary"  checked={this.state.homeowner} onChange={this.handleHomeownerDeduct}/></Grid>
          <Grid item className={classes.label}>Homeowner</Grid>
        </Grid>
        {housing}
        <Grid item xs={12}>
          <TextField
            value={this.state.utilities}
            onChange={this.handleTextChange}
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
        <Grid item xs={12}>
          <TextField
            value={this.state.groceries}
            onChange={this.handleTextChange}
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
        <Grid item xs={12}>
          <TextField
            value={this.state.misc}
            onChange={this.handleTextChange}
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
        <Grid item xs={12}>
          <TextField
            value={0}
            label="Monthly Savings"
            className={classes.field}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            disabled
          ></TextField>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ExpensesForm)