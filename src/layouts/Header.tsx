import React from 'react'
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      backgroundColor: '#000030',
    }
  })
)

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <h3>Personal Finance Calculator</h3>
    </AppBar>
  )
}

export default Header