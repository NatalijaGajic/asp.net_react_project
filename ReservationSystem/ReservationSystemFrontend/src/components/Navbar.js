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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsIcon from '@material-ui/icons/Drafts';
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';


const options = [
  'Reservations',
  'New reservation'
];

const ITEM_HEIGHT = 48;

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
  const [anchorElem, setAnchorElem] = React.useState(null);

  const open = Boolean(anchorEl);
  const openProfile = Boolean(anchorElem);

  const navigateToLogin = () => {
    history.push('/log-in');

  }

  const handleMenu = (event) => {
    setAnchorElem(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElem(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuItemClick = (option) => {
    console.log(option);
    setAnchorEl(null);
    if(option === 'New reservation'){
      history.push('/make-reservation');
    }
    if(option === 'Reservations'){
      history.push('/reservations');

    }
  }

    return(
    <AppBar position="static">

        <Toolbar>
        {user && 
              <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MenuIcon fontSize="large" color="inherit"/>
            </IconButton>
        }
        <Link to="/" className={classes.title} style={{ textDecoration: 'none' }}> 
            <Typography variant="h6" >
               Board Games 
            </Typography>
          </Link>
          {user && (
            <div>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              open={open}
              onClose={handleClose}
              
            >
              {options.map((option) => (
                
                <MenuItem key={option}  onClick={() => handleMenuItemClick(option)}>
                  <ListItemIcon>
                  {
                    (option === "Reservations") && 
                    <AlarmOnTwoToneIcon/>
                  }
                  {
                    (option === "New reservation") && 
                    <AddCircleOutlineOutlinedIcon/>
                  }
                 </ListItemIcon>
                 <Typography variant="inherit" noWrap>
                 {option}
                </Typography>
                </MenuItem>
              ))}
            </Menu>
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
                anchorEl={anchorElem}
                getContentAnchorEl={null}
                keepMounted
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "center", horizontal: "right" }}
                open={openProfile}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Log out</MenuItem>
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