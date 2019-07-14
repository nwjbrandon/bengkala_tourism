import React from 'react';
import Modal from '../../components/stories/Modal'
import Navbar from "../../components/navBar/navbar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import _div from 'lodash/divide';
import _floor from 'lodash/floor';
import dateFnsFormat from 'date-fns/format';
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import MyCard from './card'

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#ffffff",
    minHeight: "100vh"
  },
  card: {
    margin: `${theme.spacing(0)}px auto`,
    maxWidth: 600
  },
  buttons: {
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
    },
    margin: `${theme.spacing(3)}px auto`,
  },
});

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "", openModal: false, title: "", imgUrl: "",
      page: 0, rowsPerPage: 6,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleOpenModal = ({ text, title, imgUrl }) => {
    this.setState({ text, openModal: true, title, imgUrl });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleNext = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 })
  };

  handlePrevious = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 })
  };

  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { classes, data } = this.props;
    const { page, rowsPerPage } = this.state;
    const maxPage = _floor(_div(data.length - 1, rowsPerPage));

    return (
      <div className={classes.root}>
        <Navbar />
        <h3 style={{ fontSize: '2em', fontFamily: "Montserrat, sans-serif", paddingLeft: "5vw" }}>Listen to our Stories!</h3>
        <div style={{ padding: '10px' }}>
          <Grid justify="center" container spacing={3}>
            {
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card} key={item.title}>
                    <CardActionArea onClick={() => this.handleOpenModal({ ...item })}>
                      <MyCard src={item.imgUrl} date={dateFnsFormat(item.createdAt, 'YYYY/MM/DD HH:mm')} title={item.title} summary={item.summary} />
                    </CardActionArea>

                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </div>
        <Modal {...this.state} onCloseModal={this.handleCloseModal} />
        <Grid container justify="center" spacing={10} className={classes.buttons}>
          <Button size="small" color="primary" onClick={this.handlePrevious} disabled={page === 0} >
            <KeyboardArrowLeft /> Previous Page
            </Button>
          <Button size="small" color="primary" onClick={this.handleNext} disabled={page === maxPage}>
            Next Page <KeyboardArrowRight />
          </Button>
        </Grid>
        <SuccessToast />
        <ErrorToast />
      </div>
    )
  }
}

export default withStyles(styles)(Attraction);
