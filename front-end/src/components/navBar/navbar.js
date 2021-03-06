import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ThemeProvider } from '@material-ui/styles';


import { green, } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  title: {
    flexGrow: 1,
    fontFamily: "Montserrat, sans-serif"
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    fontFamily: "Montserrat, sans-serif"
  },
  menuItem: {
    textTransform: 'none',
    fontFamily: "Montserrat, sans-serif"
  },
  btn: {
    textTransform: 'none',
    fontFamily: "Montserrat, sans-serif",
    color: 'white',
  }
}));

const sections = [
  {
    title: 'Stories',
    url: '/stories/p/1',
  },
  {
    title: 'Booking',
    url: '/booking',
  },
  {
    title: 'Explore',
    url: '/explore',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
  {
    title: 'FAQ',
    url: '/faq',
  }
];

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>


        <AppBar style={{ backgroundColor: '#11111199' }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Button className={classes.btn} component={Link} to="/" >Bengkala</Button>
            </Typography>
            <Hidden xsDown>
              {sections.map(section => {
                return (
                  <Button className={classes.btn} key={section.title} component={Link} to={section.url}>{section.title}</Button>
                )
              })}
            </Hidden>
            <Hidden smUp>
              <IconButton edge="start" className={classes.menuButton} aria-label="Menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {
                  sections.map(section => (
                    <MenuItem className={classes.menuItem} onClick={handleClose} component={Link} to={section.url} key={section.title}>
                      {section.title}
                    </MenuItem>
                  ))
                }
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
      <div/>
    </div>
  );
}
