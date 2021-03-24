import React from 'react'
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      textAlign: 'right',
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: '#000030',
    }
  })
)

const Footer = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
          Made by Teesh
    </AppBar>
  )
}

export default Footer