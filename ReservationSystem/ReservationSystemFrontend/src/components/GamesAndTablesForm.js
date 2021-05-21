import React from 'react'

export default function GamesAndTablesForm(props) {
    const {queryParams, setQueryParams, chooseGame} = props;
    return (
        <PaperForm>
        <Form>
            <Grid container>
                <Grid item sm={6}>
                    <ReservationGamesList 
                    {...{queryParams, setQueryParams, chooseGame}}/>
                </Grid>
                <Grid item sm={6}>
                    <ReservationTablesList/>
                </Grid>
            </Grid>
        </Form>
        </PaperForm>
    )
}
