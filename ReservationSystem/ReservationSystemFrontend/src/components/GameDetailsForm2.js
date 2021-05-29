import React, {useEffect, useState} from 'react'
import {images} from '../utils/utils';
import './GameDetailsFormStyles2.css';
import { Card, makeStyles, Grid, IconButton} from '@material-ui/core';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Button from '@material-ui/core/Button';


export default function GameDetailsForm(props) {
    const {gameId} = props;
    const [game, setGame] = useState({});

    useEffect(() => {
        let g = {
            id: "60722a995be9df9eb32c6519",
            name: "7 Wonders Duel",
            description: "Science? Military? What will you draft to win this head-to-head version of 7 Wonders?",
            price: 1.5,
            valute: "$",
            numberOfPlayers: 2,
            isActive: true
          }
        setGame(g);
    }, []);

    return (
        <div className="app">
            <div className="details" key={game.id}>
              <div className="big-img">
                <img src={images[game.id]} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                <Button size="small" color="primary" disabled={true}
                    style={{fontSize:"12px", marginRight:"4px"}}>
                    {game.valute}{game.price}/hour
                </Button>
              <IconButton size="small" disabled={true}
               style={{fontSize:"16px", marginRight:"4px"}}>
                   {game.numberOfPlayers}+<PeopleAltTwoToneIcon/>
                </IconButton>
                </div>

                <p>{game.description}</p>

                <button className="btn">Make reservation</button>

              </div>
            </div>
      </div>
    )
}
