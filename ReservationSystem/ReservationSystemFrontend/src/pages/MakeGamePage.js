import React from 'react'
import PaperForm from '../components/PaperForm';
import GameForm from '../components/GameForm';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';

export default function MakeGame() {

    const addOrEdit = (formData, onSuccess) => {
        createAPIEndpoint(ENDPOINTS.GAMES).create(formData)
        .then(res => {
            onSuccess();
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <PaperForm>
            <GameForm addOrEdit={addOrEdit}></GameForm>
        </PaperForm>
    )
}
