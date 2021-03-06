import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LocationIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/PermPhoneMsg';
import DirectionsIcon from '@material-ui/icons/Directions';
import OperatingHoursIcon from '@material-ui/icons/HourglassEmpty';
import PropTypes from "prop-types";
import uuid from 'uuid/v1';
import Navbar from "../../components/navBar/navbar";
import SuccessToast from '../../components/snackBar/successSnackBar.container';
import ErrorToast from '../../components/snackBar/errorSnackBar.container';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import countryTelephoneCode, { countries } from "country-telephone-code";
import _sortBy from 'lodash/sortBy';
//import bg from '../../assets/img/bgimg3.jpg'

import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
const bg = 'https://i.postimg.cc/SxFBN0yT/IMG-0357.jpg';
const styles = theme => ({
  root: {
    flexGrow: 'initial',
    paddingBottom: 0,
    marginTop: 0,
    margin: 0,
    backgroundImage: `url(${bg})`,
    // maxWidth: "100%",
    paddingTop: '50px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // position: 'relative',
  },
  paper: {
    padding: 10,
    paddingTop: 0,
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
    },
  },
  paperCont: {
    paddingRight: 0,
    background: "#21212150",
    margin: 0,
    maxWidth: "100vw",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  paperTwo: {
    paddingRight: 0,
    background: "#21212150",
    width: "100%",
    margin: 0,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#fafafa",
    },
    primary: {
      main: green[500]
    }
  },
});

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      subject: '',
      message: '',
      countryCode: '+62',
      mailSent: false,
      email: '',
      scale: 12.5,
    };
    this.submit = this.submit.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentWillMount() {
    const { onMount } = this.props;
    onMount();
  }

  zoomIn() {
    const { scale } = this.state;
    this.setState({ scale: scale + 0.1 });
  };

  zoomOut() {
    const { scale } = this.state;
    this.setState({ scale: scale - 0.1 });
  };

  submit() {
    const {
      contact,
      name,
      subject,
      message,
      countryCode,
      email,
    } = this.state;
    const id = uuid();
    const { contactSubmit } = this.props;
    contactSubmit({
      uuid: id, contact, name, subject, message, email, countryCode
    });
  }

  render() {
    const { classes, data, } = this.props;
    const { scale, countryCode } = this.state;
    const coordinates = [-8.113850, 115.175360];
    const phoneCodes = _sortBy(countries.map(country => {
      return {
        code: `+${countryTelephoneCode(country)}`,
        text: `${country} +${countryTelephoneCode(country)}`,
        country
      }
    }), ['country']);
    return (
      <div className={classes.root}>
        <Navbar />
        <ThemeProvider theme={theme}>

          <div style={{ maxWidth: "100vw", paddingTop: 50, paddingBottom: 100  }}>
            <Grid justify="center" container>
              <div className={classes.paperCont}>
                <Grid item xs={12} md={12} style={{ paddingTop: 20 }}>
                  <Grid justify="center" container>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h4">
                      <LocationIcon color="secondary" />&nbsp;Address
                </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 20 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h6">
                      {data['Address'] ?
                        data['Address'].split("\n").map((i, key) => (
                          <div key={key}>{i}</div>)) : <div />
                      }
                    </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 30 }}>
                    <Typography color="secondary" variant="h4">
                      <PhoneIcon color="secondary" />&nbsp;Contact
                </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 20 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h6">
                      {data['Phone'] ?
                        data['Phone'].split("\n").map((i, key) => (
                          <div key={key}>{i}</div>)) : <div />
                      }
                    </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 30 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h4">
                      <OperatingHoursIcon color="secondary" />&nbsp;Operating Hours
                </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 20 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }}  color="secondary" variant="h6">
                      {data['Hours'] ?
                        data['Hours'].split("\n").map((i, key) => (
                          <div key={key}>{i}</div>)) : <div />
                      }
                    </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 30 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h4">
                      <DirectionsIcon color="secondary" />&nbsp;Directions
                </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ maxWidth: "100vw", paddingTop: 30 }}>
                    <Map center={coordinates} zoom={scale} width={500} height={300}>
                      <Marker anchor={coordinates} payload={1} />
                    </Map>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 10 }}>
                    <Button variant="outlined" style={{ color: "white" }} color="secondary" onClick={this.zoomIn}>+ Zoom in</Button>
                    &nbsp;
                <Button variant="outlined" color="secondary" onClick={this.zoomOut}>- Zoom out</Button>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 10 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="body1">
                      Latitude: {coordinates[0]}
                    </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 10 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="body1">
                      Longitude: {coordinates[1]}
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              <div className={classes.paperCont}>
                <Grid justify="center" item xs={12} md={12} style={{ paddingTop: 30, margin: 0 }}>

                  <Grid justify="center" container>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h3">
                      Contact us.
                  </Typography>
                  </Grid>
                  <Grid justify="center" container style={{ paddingTop: 30, paddingLeft: 10, paddingRight: 10 }}>
                    <Typography style={{ fontFamily: "Montserrat, sans-serif", }} color="secondary" variant="h6">
                      Visiting or have something to share with us?
                  </Typography>
                  </Grid>
                  <Grid container style={{ paddingTop: 30 }}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            label="Name"
                            fullWidth
                            autoComplete="name"
                            margin="normal"
                            variant="outlined"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            label="Phone number"
                            fullWidth
                            autoComplete="Phone"
                            margin="normal"
                            variant="outlined"
                            value={this.state.contact}
                            onChange={e => this.setState({ contact: e.target.value })}
                            InputProps={{
                              startAdornment:
                                <InputAdornment position="start">
                                  <FormControl>
                                    <Select
                                      value={countryCode}
                                      onChange={(event) => this.setState({ countryCode: event.target.value })}
                                    >
                                      <MenuItem value="+62">
                                        <em>ID +62</em>
                                      </MenuItem>
                                      {
                                        phoneCodes.map(phone => (
                                          <MenuItem value={phone.code}>{phone.text}</MenuItem>
                                        ))
                                      }
                                    </Select>
                                  </FormControl>
                                </InputAdornment>,
                            }}
                          />
                        </Grid>

                        <TextField
                          required
                          label="Email"
                          fullWidth
                          autoComplete="email"
                          margin="normal"
                          variant="outlined"
                          value={this.state.email}
                          onChange={e => this.setState({ email: e.target.value })}
                        />

                      </Paper>

                      <Grid justify="center" container style={{ paddingTop: 30 }}>
                        <Typography color="secondary" variant="h6" style={{ paddingTop: 0, paddingBottom: 20, fontFamily: "Montserrat, sans-serif", }}>
                          Your message:
                    </Typography>
                      </Grid>



                      <Paper className={classes.paper}>

                        <TextField
                          required
                          label="Subject"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          value={this.state.subject}
                          onChange={e => this.setState({ subject: e.target.value })}
                        />

                        <TextField
                          required
                          label="Message"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          multiline
                          rows="7"
                          value={this.state.message}
                          onChange={e => this.setState({ message: e.target.value })}
                        />

                        <Grid container justify="center" style={{ paddingTop: 20 }}>
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={this.submit}
                          >
                            Submit
                        </Button>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>

                </Grid>
              </div>
            </Grid>
          </div>
          <SuccessToast />
          <ErrorToast />
        </ThemeProvider>
      </div>
    )
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
