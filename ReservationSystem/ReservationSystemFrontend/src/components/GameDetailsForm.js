import React, {useEffect, useState} from 'react'
import {images} from '../utils/utils';
import { Card, makeStyles, Grid, IconButton} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Controls from '../components/controls/Controls'
import { createAPIEndpoint, ENDPOINTS} from '../api'
import { useHistory } from "react-router-dom";
import InformationDialog from './InformationDialog';
import {useAuth} from '../contexts/AuthContext';


const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: '1em'
    },
    media: {
        padding: '1em',
        borderRadius: '1em',
        height: 500,
        width: '100%',
        objectFit: 'cover'
    },
    content: {
      padding: '2em'
    },
    button1: {
        flexGrow: 1,
      }
  }));  
  
//const user = {penalty: 2};

export default function GameDetailsForm(props) {
    const {currentUser} = useAuth();
    const {gameId} = props;
    const [game, setGame] = useState({});
    const [user, setUser] = useState();
    const classes = useStyles();
      const history = useHistory();
    const [ informationDialog, setInformationDialog] = useState({isOpen:false, title:'', subtitle:''})


    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.GAMES).fetchById(gameId)
        .then((response) => {
            console.log(response.data);
            setGame(response.data);
        })
        .catch((err) =>{
            console.log(err);
        });
    }, []);

    const onMakeReservationClick = () => {
        if(user == null){
            history.push('/log-in/');
        }
        else if(user.penalty === 3){
            setInformationDialog({
                isOpen:true,
                title:'You have 3 penalties, you can not make reservation',
                subtitle:'Penalties are deleted after one month.'
            });
        }
        else{
            history.push('/make-game-reservation/'+gameId);
        }
    }

    return (
        <>
       <Card className={classes.root}>
           <Grid container>
                <Grid item sm={6}>
                <CardMedia
                className={classes.media}
                component="img"
                alt="Contemplative Reptile"
                src={images[game.id]}
                title="Contemplative Reptile"
                 >
                </CardMedia>
                </Grid>
                <Grid item sm={6} container className={classes.content}>
                    <Grid item sm={12} >
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}
                        style={{fontSize:'2em'}}>
                        {game.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}
                        style={{fontSize:'1.2em'}}>
                        {game.description}
                        </Typography>
                    </CardContent>
                    </Grid>
                    <Grid item sm={12} container justify="center" style={{padding:'2em'}}>
                        <Grid item sm={5}>
                        <Typography variant="h6" component="h2" style={{marginLeft:'0.5em'}}>
                        Price:
                        </Typography>
                        <Typography variant="h6" component="h2"
                         style={{marginTop:'0.5em', marginLeft:'0.5em', color:'#ff4569'}}>
                        {game.valute}{game.price}/hour
                        </Typography>
                        </Grid>
                        <Grid item sm={7}>
                        <Typography variant="h6" component="h2"  style={{marginLeft:'0.5em'}}>
                        Number of people:
                        </Typography>
                        <IconButton size="large" disabled={true}
                        style={{fontSize:"1.5em", color:'#637bfe'}}>
                        {game.numberOfPlayers}+<PeopleAltTwoToneIcon/>
                        </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container justify="flex-end" alignItems="flex-end">
                    <Controls.Button
                        style={{marginRight: '16em', marginTop: "2em", width: "100%"}}
                        variant="contained"
                        color="primary"
                        size="large"
                        text="Make reservation"
                        onClick={onMakeReservationClick}/>
                    </Grid>
                </Grid>
           </Grid>
       </Card>
        <InformationDialog
           informationDialog={informationDialog}
           setInformationDialog={setInformationDialog}>
        </InformationDialog>
        </>
    )
}
