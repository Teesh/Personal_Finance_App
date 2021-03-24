import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      paddingTop: '80px',
      paddingBottom: '50px',
      backgroundColor: '#111',
    },
  }),
)

const Content = (props: any) => {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root} square>
      {props.children}
    </Paper>
  )
}

export default Content