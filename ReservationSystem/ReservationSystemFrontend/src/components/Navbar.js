import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import blue from '@material-ui/core/colors/blue';
import { useHistory } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: blue,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#F0FFF0"
  }
}));

const user = true;
//const user = false;
 const Navbar = () => {

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigateToLogin = () => {
    history.push('/log-in');

  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
  }

  const handleReservations = () => {
    setAnchorEl(null);
    history.push('/reservations');
  }

  const handleNewReservation = () => {
    setAnchorEl(null);
    history.push('/make-reservation');

  }

    return(
    <AppBar position="static">
        <Toolbar>
        <Link to="/" className={classes.title} style={{ textDecoration: 'none' }}> 
            <Typography variant="h6" >
               Board Games 
            </Typography>
          </Link>
          {user && (
            <div>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large"/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleNewReservation}>New reservation</MenuItem>
                <MenuItem onClick={handleReservations}>Reservations</MenuItem>

              </Menu>
            </div>
          )}
          {!user && 
            <Button color="inherit" onClick={navigateToLogin}>Login</Button>
          }
        </Toolbar>
    </AppBar> 
    )
 }

export default Navbar;