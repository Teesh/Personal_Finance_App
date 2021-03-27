import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IncomeForm from './IncomeForm'
import ExpensesForm from './ExpensesForm'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: 'left',
      color: 'white',
      height: '41.5vh',
      backgroundColor: '#323638',
      minHeight: '470px'
    },
  }),
)

const Dashboard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={4} square>
            <IncomeForm />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={4} square>
            <ExpensesForm />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={4} square>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard