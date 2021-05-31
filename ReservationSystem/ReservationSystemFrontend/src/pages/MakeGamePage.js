import React from 'react'
import PaperForm from '../components/PaperForm';
import GameForm from '../components/GameForm';

export default function MakeGame() {

    const addOrEdit = (formData, onSuccess) => {

    }
    return (
        <PaperForm>
            <GameForm addOrEdit={addOrEdit}></GameForm>
        </PaperForm>
    )
}
