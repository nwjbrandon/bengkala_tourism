import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonsLocation: {
        alignSelf: 'flex-end'
    }
});

class DashboardFAQEntries extends Component {
    constructor(props) {
        super(props);
        this.watchHeading = this.watchHeading.bind(this);
        this.watchTitle = this.watchTitle.bind(this);
        this.watchText = this.watchText.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    watchHeading(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'heading',
        })
    }

    watchTitle(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'title',
        })
    }

    watchText(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'text',
        })
    }

    editEntry(event) {
        const value = event.currentTarget.value;
        const uuid = event.currentTarget.id;
        const { watch } = this.props;
        watch({
            value: value === 'true' ? 1 : 0,
            uuid,
            field: 'edit',
        })
    }

    render() {
        const { classes, data, entryAction, } = this.props;
        return (
            <div>
                {Object.keys(data).map((item) => (
                    <ExpansionPanel key={item}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{ data[item].heading }</Typography>
                            &nbsp;-&nbsp;
                            <Typography className={classes.heading}>{ data[item].title }</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {data[item].edit ?
                                <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={data[item].heading}
                                        placeholder="Eg. General FAQs"
                                        label="Type of Question"
                                        className={classes.button}
                                        onChange={this.watchHeading}
                                        id={item}
                                    />
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={data[item].title}
                                        placeholder="Eg. How to contact us?"
                                        label="Question"
                                        className={classes.button}
                                        onChange={this.watchTitle}
                                        id={item}
                                    />
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={data[item].text}
                                        placeholder="Eg. You can contact us at +62 1234 5678."
                                        label="Answer"
                                        className={classes.button}
                                        onChange={this.watchText}
                                        id={item}
                                    />
                                </Grid>
                                :
                                <Typography>
                                    { data[item].text ? data[item].text.split("\n").map((i,key) => (
                                      <div key={key}>{i}</div>)) : <div />
                                    }
                                </Typography>
                            }
                        </ExpansionPanelDetails>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            {data[item].edit ?
                                <Button variant="contained" color="secondary" value={false} id={item} onClick={this.editEntry} className={classes.button}>
                                    Update
                                </Button>
                                :
                                <Button variant="contained" color="secondary" value={true} id={item} onClick={this.editEntry} className={classes.button}>
                                    Edit
                                </Button>
                            }
                            <Button variant="contained" color="secondary" value={item} onClick={entryAction} className={classes.button}>
                                Delete
                            </Button>
                        </Grid>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

DashboardFAQEntries.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardFAQEntries);
