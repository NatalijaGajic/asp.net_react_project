import React, {useState} from 'react'
import {Table, makeStyles, TableCell, TableHead, TableRow, TablePagination, TableSortLabel} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        borderRadius: '5px',
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

export default function UseTable(records, headCells, filterFn) {

    const classes = useStyles();
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {
        return (
        <TableHead style={{borderRadius: '5px'}}>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>)
    }

    const TblHeadSort = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc?'desc':'asc');
            setOrderBy(cellId);
        }

        return (
        <TableHead style={{borderRadius: '5px'}}>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}
                        sortDirection={orderBy === headCell.id?order:false}>
                            {headCell.disableSorting?headCell.label:
                            <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id? order: 'asc'}
                            onClick={() => {handleSortRequest(headCell.id)}}>
                                {headCell.label}
                            </TableSortLabel>}
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component = "div"
        page = {page}
        rowsPerPageOptions = {pages}
        rowsPerPage = {rowsPerPage}
        count = {records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />);

    function stableSort(array, comparator){
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if(order !==0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    } 

    function getComparator(order, orderBy){
        return order === 'desc'
        ? (a, b) => descendingOperator(a, b, orderBy)
        : (a, b) => -descendingOperator(a, b, orderBy);
    }

    function descendingOperator(a, b, orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy] > a[orderBy]){
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    const recordsAfterPaging = () => {
        return records.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    return {
        TblContainer,
        TblHead, 
        TblPagination,
        recordsAfterPaging,
        recordsAfterPagingAndSorting, 
        TblHeadSort
    }
}
