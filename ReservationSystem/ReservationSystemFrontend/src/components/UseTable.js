import React from 'react'
import {Table, makeStyles, TableCell, TableHead, TableRow} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th':{
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: '#e6eeff',
        },
        '& tbody tb':{
            fontWeight: '300',
        },
        '& tbody tr:hover':{
            backgroundColor: '#fffbf2',
            cursor:'pointer'
        },
    },
}))

export default function UseTable(records, headCells) {

    const classes = useStyles();


    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {
        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>{headCell.label}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>)
    }

    return {
        TblContainer,
        TblHead
    }
}
