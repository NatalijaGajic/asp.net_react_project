import React from 'react';
import { Card, makeStyles, Grid, IconButton} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import {images} from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350
  },
  media: {
    height: 150
  },
  content: {
    height: 70
  }, 
  title:{
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

  },
  description: {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button1: {
    flexGrow: 1,
  }
}));  

export default function Game(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.handleCardClick}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Game"
          height="140"
          src={props.imagePath}
          title="Board game"
        >
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container>
          <Grid item sm={7} container justify="center">
              <Button size="small" color="primary" className={classes.button1}
            style={{fontSize:"12px", marginRight:"2px"}} 
            onClick={props.onMakeReservationClick}>
              Make reservation
              </Button>
            </Grid>
          <Grid item sm={3} container justify="center">
            <Button size="small" color="primary" disabled={true}
             style={{fontSize:"12px", marginRight:"4px"}}>
            {props.valute}{props.price}/hour
           </Button>
           </Grid>
          <Grid item sm={2} container justify="center">
              <IconButton size="small" disabled={true}
               style={{fontSize:"16px", marginRight:"4px"}}>
                   {props.numberOfPlayers}+<PeopleAltTwoToneIcon/>
                </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
