
import Controls from '../components/controls/Controls'
import { Paper, IconButton, InputBase, makeStyles, Grid} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

const items = [
    {id:'2', title:'2+'},
    {id:'4', title:'4+'},
    {id:'6', title:'6+'},
  ]
  
  const sortingOptions = [
    {id: 'Name Asc', title: 'Name Asc'},
    {id: 'Name Desc', title: 'Name Desc'},
    {id: 'Price Asc', title: 'Price Asc'},
    {id: 'Price Desc', title: 'Price Desc'}
]

  const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex:1
    }
}))

export default function GameFilters(props) {
    const {queryParams, setQueryParams, numberOfPeople, setNumberOfPeople, orderBy, setOrderBy} = props;
    const classes = useStyles();
    const [searchKey, setSearchKey] = useState('');

    

    const handleInputChange = e => {
        const {name, value} = e.target
        console.log(value);
        setNumberOfPeople(value);
        setQueryParams(
            {
                ...queryParams,
                NumberOfPeople: value
            }
        )
    }

    const handleOrderByInputChange = e => {
        const {name, value} = e.target
        console.log(value);
        setOrderBy(value);
        setQueryParams(
            {
                ...queryParams,
                OrderBy: value.split(' ')[0]
            }
        )
    }

    const handleSearchClick = () => {
        setOrderBy('Name Desc');
        setNumberOfPeople(2);
        console.log(searchKey);
        setQueryParams({
            SearchByName: searchKey,
            NumberOfPeople: 2,
            IsActive: true,
            OrderBy: 'Name',
            PageNumber : 1,
            PageSize : 6
        });
    }

    return (
        <>
        <Grid container spacing={4}>
        <Grid item sm={5}>
            <Paper className={classes.searchPaper}>
                <InputBase
                placeholder="Search for games"
                className={classes.searchInput}
                onChange={e => setSearchKey(e.target.value)}
                value={searchKey}/>
                <IconButton onClick={handleSearchClick}>
                    <SearchTwoToneIcon/>
                </IconButton>
            </Paper>
        </Grid>
        <Grid item sm={3}>
            <Controls.RadioGroup
            label="Number of people"
            value={numberOfPeople}
            onChange={handleInputChange}
            name="gender"
            items={items}/>
      </Grid>
      <Grid item sm={4} >
            <Grid container justify='flex-end'>
            <Controls.Select
                name="orderBy"
                label="Order by"
                value={orderBy}
                displayNone={false}
                onChange={handleOrderByInputChange}
                options={sortingOptions}/>  
        </Grid>
      </Grid>
      </Grid>
      </>
    )
}