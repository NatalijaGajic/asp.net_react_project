import React, {useState} from 'react';
import {Grid, makeStyles, MenuItem, Input, FormControl, FormHelperText, InputLabel, TextField, FormControlLabel, TextareaAutosize, Checkbox} from '@material-ui/core';
import {Form, UseForm} from '../components/UseForm';
import Controls from '../components/controls/Controls'
import InputAdornment from '@material-ui/core/InputAdornment';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';

const defaultImageSource = "/images/preview.png";

const initialFieldValues = {
    title: '',
    numberOfPlayers: 0,
    price: 0,
    valute: 'USD', //get label for value
    isActive: false,
    description: '',
    imagePath: defaultImageSource,
    imageFile: null
}

const currencyDictionary = {'USD':'$', 'EUR':'€', 'BTC':'฿', 'JPY':'¥'}

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

 

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    errorParagraph: {
        color: "#DC143C",
        fontSize: '0.8em'
        
    },
    img: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70%'
      }
}));


export default function GameForm() {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    
    const validate = () => {
        let temp = {}
        temp.title = values.firstName?"":"Required field"
        temp.title = values.title.length>4?"":"Minimum 4 characters required"
        temp.numberOfPlayers = values.numberOfPlayers && values.numberOfPlayers > 0 ? "":"Must be a positive number"
        temp.price = values.price && values.price > 0 ? "":"Must be a positive number"
        temp.valute = values.valute?"":"Required field"
        temp.description = values.description.length>4?"":"Minimum 4 characters required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=> x === "");
    }

    const {values, setValues, handleInputChange, errors, setErrors} = UseForm(initialFieldValues, false, validate);

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true);
        if(validate()){
            window.alert('Testing');
        }
        setLoading(false);
    }
    
    const showPreview = e => {
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imagePath: imageFile,
                    imagePath: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
    }
    
    return (
    <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6} container>
                    <Grid sm={12} >
                    <img src={values.imagePath} className={classes.img}></img>
                    </Grid>
                    <Grid item sm={12} container justify="center">
                    <input type="file" accept="image/*"
                    style={{marginTop:'2em'}}
                    onChange={showPreview}></input>
                    </Grid>
                </Grid> 
                <Grid item sm={6} container direction="column" spacing={2}>
                    <Grid item sm="12"> 
                    <Controls.Input
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                    error={errors.title}
                    style={{width: "100%"}}
                    />
                    </Grid>
                    <Grid item sm="12" container justify="space-between"> 
                    <Grid item sm={3}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="number-of-players">Players</InputLabel>
                            <Input
                            id="number-of-players"
                            name="numberOfPlayers"
                            startAdornment={
                                <InputAdornment position="start">
                                <PeopleAltTwoToneIcon />
                                </InputAdornment>
                            }
                            type="number"
                            value={values.numberOfPlayers}
                            error={errors.numberOfPlayers}
                            onChange={handleInputChange}
                            />
                            {errors.numberOfPlayers && <FormHelperText>{errors.numberOfPlayers}</FormHelperText>}
                        </FormControl>   
                    </Grid>
                    <Grid item sm={3}>
                         <FormControl className={classes.margin}>
                            <InputLabel htmlFor="price">Price</InputLabel>
                            <Input
                            id="price"
                            name="price"
                            startAdornment={
                                <InputAdornment position="start">
                                <LocalOfferTwoToneIcon />
                                </InputAdornment>
                            }
                            type="number"
                            value={values.price}
                            error={errors.price}
                            onChange={handleInputChange}
                            />
                            {errors.price && <FormHelperText>{errors.price}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                        id="standard-select-currency"
                        select
                        label="Currency"
                        name="valute"
                        value={values.valute}
                        error={errors.valute}
                        onChange={handleInputChange}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>           
                    </Grid>
                    <Grid container justify="flex-start">
                        <FormControlLabel
                        name="isActive"
                        value={values.isActive}
                        onChange={handleInputChange}
                        control={<Checkbox color="primary" />}
                        label="Active"
                        labelPlacement="end"
                        style={{marginLeft: "0em"}}
                        />
                    </Grid> 
                    <TextareaAutosize aria-label="minimum height"
                    id="description" 
                    rowsMin={8} 
                    placeholder="Description"
                    name="description"
                    value={values.description} 
                    onChange={handleInputChange}
                    error={errors.description}
                    style={{borderRadius: '0.5em', padding: '1em', marginTop: '1em'}}/>
                    {errors.description && <p className={classes.errorParagraph}>{errors.description}</p>}
                    <Grid container justify="flex-end">
                        <Controls.Button
                        style={{ marginTop: "2em", width: "100%"}}
                        variant="contained"
                        disabled={loading}
                        color="primary"
                        size="large"
                        text="create"
                        type="submit"/>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Form>
    )
}
