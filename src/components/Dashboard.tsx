import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Form from './Form'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: 'white',
      height: '41.5vh',
      backgroundColor: '#323638'
    },
  }),
)

const Dashboard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={4} square>
            <Form />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={4} square>xs=6</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={4} square>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard