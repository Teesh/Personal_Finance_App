import { createStyles } from "@material-ui/core/styles"

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
  fieldSliderLabel: {
    width: '100%',
    marginTop: '10px',
    color: '#ddd',
    padding: 0,
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.00938em",
    marginLeft: '10px',
  },
  fieldSlider: {
    marginLeft: '20px',
    width: '90%',
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
  label: {
    marginBottom: '5px',
  }
})

export default styles