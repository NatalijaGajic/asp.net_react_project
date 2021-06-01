import React, {useState, useEffect} from 'react'
import PaperForm from '../components/PaperForm'
import TableForm from '../components/TableForm'
import {createAPIEndpoint, ENDPOINTS} from '../api/index';



export default function MakeTable(props) {

    const [table, setTable] = useState()

    useEffect(() => {
        if(props.match){
            let id = props.match.params['id']
            if(id != undefined && id){
                createAPIEndpoint(ENDPOINTS.TABLES).fetchById(id)
                .then(res => {
                    setTable(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        }
    }, [])

    const addOrEdit = (body, onSuccess, isEdit) => {
        if(!isEdit)
        createAPIEndpoint(ENDPOINTS.TABLES).create(body)
        .then(res => {
            onSuccess();
        })
        .catch(err => {
            console.log(err);
        })
        else
        createAPIEndpoint(ENDPOINTS.TABLES).update(table.id, body)
        .then(res => {
            onSuccess();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <PaperForm>
            <TableForm addOrEdit={addOrEdit} table={table}></TableForm>
        </PaperForm>
    )
}
