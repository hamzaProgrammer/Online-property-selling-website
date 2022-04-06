import React , {useState} from 'react';
import { Typography, Input, Button , AutoComplete } from 'antd';
import './HomeImage.css'
import {useNavigate} from 'react-router-dom'


const { Search } = Input;
const Option = AutoComplete.Option;

const HomeImage = () => {
    const [ btn , setBtn ] = useState('sell')
    // for search buttton
    const options = [
        {label: 'Izmir', value: 'Izmir'}, 
        {label: 'Istanbul', value: 'Istanbul'},
        {label: 'Ankara', value: 'Ankara'}, 
        {label: 'Roka', value: 'Roka'},
        {label: 'Anarkali', value: 'Anarkali'},
        {label: 'Konya', value: 'Konya'},
        {label: 'Trabzon', value: 'Trabzon'},
        {label: 'Cesme', value: 'Cesme'},
        {label: 'Mardin', value: 'Mardin'},
        {label: 'Edrin', value: 'Edrin'},
        {label: 'Marmaris', value: 'Marmaris'},
        {label: 'Sivas', value: 'Sivas'},
        {label: 'Kas', value: 'Kas'},
        {label: 'Ankatya', value: 'Ankatya'},
        {label: 'Bartin', value: 'Bartin'},
    ]
    const location = useNavigate();
    // searching Cities
    const onSearch = (value) => {
        let newValue = value.toLowerCase();
        if(btn == "sell"){
            location(`/allSellHomes/${newValue}`);
        }
        if(btn == "rent"){
            location(`/allRentHomes/${newValue}`);
        }
    }


    return(
        <> 
            <div className="mainDiv" >
                <div className="textDiv">
                    <Typography className="MainHead">
                        Discover a place you'll love to live
                    </Typography>
                    <div className="btnGroup">
                        <Button className="radioBtn" size="medium" style={{borderRadius : '10px'}} onClick={() => setBtn("sell")} >Buy</Button>
                        <Button className="radioBtn" size="medium" onClick={() => setBtn("rent")} >Rent</Button>
                        <Button className="radioBtn" size="medium" style={{borderRadius : '10px'}}  onClick={() => setBtn("sold")} >Sold</Button>
                    </div>
                    <AutoComplete
                        options={options}
                        onSelect={(value)=> {
                            onSearch(value)
                        }}
                        size="large"
                        className="mySearchCity"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    >
                        <Search placeholder="Search Any City" size="large"  onSearch={onSearch} enterButton />
                    </AutoComplete>
                </div>
            </div>
        </>
    )
}

export default HomeImage;