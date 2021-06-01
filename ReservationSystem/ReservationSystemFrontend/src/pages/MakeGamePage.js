import React, {useState, useEffect} from 'react'
import PaperForm from '../components/PaperForm';
import GameForm from '../components/GameForm';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';

export default function MakeGame(props) {
    const [game, setGame] = useState();
    const [gameId, setGameId] = useState();

    useEffect(() => {
        if(props.match){
            let id = props.match.params['id']
            if(id != undefined && id){
                createAPIEndpoint(ENDPOINTS.GAMES).fetchById(id)
                .then(res => {
                    setGame(res.data);
                    setGameId(id);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        }
    }, [])
    const addOrEdit = (formData, onSuccess, isEdit) => {
        if(!isEdit)
        createAPIEndpoint(ENDPOINTS.GAMES).create(formData)
        .then(res => {
            onSuccess();
        })
        .catch(err => {
            console.log(err);
        })
        else
        createAPIEndpoint(ENDPOINTS.GAMES).update(gameId, formData)
        .then(res => {
            onSuccess();
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <PaperForm>
            <GameForm addOrEdit={addOrEdit} game={game}></GameForm>
        </PaperForm>
    )
}
