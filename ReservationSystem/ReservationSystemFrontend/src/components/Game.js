import React from 'react';
import {Box, Card,  Hidden,  makeStyles} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
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
  button: {
    flexGrow: 1,
  }
}));  

const images = { 
  "6072281d5be9df9eb32c6515":"/images/gloomhaven.jpg",
  "60722a995be9df9eb32c6519":"/images/7-wonders-duel.jpg",
  "60722b7a5be9df9eb32c651b":"/images/agricola.jpg",
  "607229bf5be9df9eb32c6517":"/images/gaia.png",
  "60722b2d5be9df9eb32c651a":"/images/nemesis.jpg",
  "60722a435be9df9eb32c6518":"/images/spirit-island.png",
  "60708f45853fefd25c84cdc3":"/images/codenames.jpg"
  }

export default function Game(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          src={images[props.id]}
          title="Contemplative Reptile"
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
        <Button size="small" color="primary" className={classes.button}>
          Make reservation
        </Button>
      </CardActions>
    </Card>
  );
}
