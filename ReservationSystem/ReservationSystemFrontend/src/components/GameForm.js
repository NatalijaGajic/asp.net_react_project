import React, {useState, useEffect} from 'react';
import {Grid, makeStyles, MenuItem, Input, FormControl, FormHelperText, InputLabel, TextField, FormControlLabel, TextareaAutosize, Checkbox} from '@material-ui/core';
import {Form, UseForm} from '../components/UseForm';
import Controls from '../components/controls/Controls'
import InputAdornment from '@material-ui/core/InputAdornment';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import Notification from '../components/Notification'


const defaultImageSource = "/images/preview.png";

const initialFieldValues = {
    id: 0,
    title: '',
    numberOfPlayers: 0,
    price: 0.0,
    valute: 'USD', //get label for value
    isActive: false,
    description: '',
    imagePath: defaultImageSource,
    imageFile: null,
}

const currencyDictionary = {'USD':'$', 'EUR':'€', 'BTC':'฿', 'JPY':'¥'}
const currencyDictionaryGetSimbol = {'$':'USD', '€':'EUR', '฿':'BTC', '¥':'JPY'}

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


export default function GameForm(props) {
    const {addOrEdit, game} = props;
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    
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

    useEffect(() => {
        if(game != undefined && game){
            setValues( 
            {
                id: game.id,
                title: game.name,
                numberOfPlayers: game.numberOfPlayers,
                price: game.price,
                valute: currencyDictionaryGetSimbol[game.valute],
                isActive: game.isActive,
                description: game.description,
                imagePath: game.imagePath,
                imageFile: null,
                imageName: game.imageName
            });
        }
    }, [game])

    const resetForm = () => {
        let id = values.id
        if(id === 0){
            setNotify({isOpen:true, 'message':'Succesfully created', type:'success'});
            setValues(initialFieldValues)
            document.getElementById('image-uploader').value = null;
            setErrors({})
        }
        else{
            setErrors({})
            setNotify({isOpen:true, 'message':'Succesfully updated', type:'success'});
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true);
        if(validate()){
            const formData = new FormData()
            //console.log(values.price)
            //TODO: price decimals are ignored in from data
            console.log(typeof(values.price))
            formData.append('name', values.title)
            formData.append('description', values.description)
            formData.append('numberOfPlayers', values.numberOfPlayers)
            formData.append('price', parseFloat(values.price))
            formData.append('valute', currencyDictionary[values.valute])
            formData.append('isActive', values.isActive)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            if(values.id === 0)
            addOrEdit(formData, resetForm, false)
            else
            addOrEdit(formData, resetForm, true)
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
                    imageFile,
                    imagePath: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }else{
            setValues({
                ...values,
                imageFile: null,
                imagePath: defaultImageSource
            })
        }
    }
    const handleCheckbox = (event) => {
        setValues({
            ...values,
            isActive: event.target.checked
        })
    }
    
    return (
        <>
    <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6} container>
                    <Grid item sm={12} >
                    <img src={values.imagePath} className={classes.img}></img>
                    </Grid>
                    <Grid item sm={12} container justify="center">
                    <input type="file" accept="image/*"
                    id="image-uploader"
                    style={{marginTop:'2em'}}
                    onChange={showPreview}></input>
                    </Grid>
                </Grid> 
                <Grid item sm={6} container direction="column" spacing={2}>
                    <Grid item sm={12}> 
                    <Controls.Input
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                    error={errors.title}
                    style={{width: "100%"}}
                    />
                    </Grid>
                    <Grid item sm={12} container justify="space-between"> 
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
                            onChange={handleInputChange}
                            />
                            {errors.numberOfPlayers && <FormHelperText color="#DC143C">{errors.numberOfPlayers}</FormHelperText>}
                        </FormControl>   
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={values.price}
                            name="price"
                            onChange={handleInputChange}
                            startAdornment={<InputAdornment position="start">{currencyDictionary[values.valute]}</InputAdornment>}
                            endAdornment={<InputAdornment position="end">/hour</InputAdornment>}
                        />
                        {errors.price && <FormHelperText color="#DC143C">{errors.price}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                        id="standard-select-currency"
                        select
                        label="Currency"
                        name="valute"
                        value={values.valute}
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
                        checked={values.isActive == undefined? false: values.isActive}
                        onChange={handleCheckbox}
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
                        text={values.id === 0?"create":"update"}
                        type="submit"/>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Form>
        <Notification
        notify={notify}
        setNotify={setNotify}
        />
        </>
    )
}
