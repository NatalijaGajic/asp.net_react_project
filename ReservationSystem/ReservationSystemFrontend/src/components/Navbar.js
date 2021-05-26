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


 const Navbar = () => {

  const history = useHistory();
  const classes = useStyles();
  const navigateToLogin = () => {

  }

    return(
    <AppBar position="static">
        <Toolbar>
        <Link to="/" className={classes.title} style={{ textDecoration: 'none' }}> 
            <Typography variant="h6" >
               Board Games 
            </Typography>
          </Link>
            <Button color="inherit" onClick={navigateToLogin}>Login</Button>
        </Toolbar>
    </AppBar> 
    )
 }

export default Navbar;