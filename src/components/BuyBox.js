import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Constants from '../utilities/Constants';
import AppButton from './AppButton';
import '../css/BuyBox.css';

export class BuyBox extends Component {
    render () {
        let path = '/redirect/websafetitle-' + this.props.item.websafetitle + '&store-' + this.props.buyBoxInfo.text; 
        
        return (
            <Link 
                to={path}  
                className='buyBoxLink'>
                <AppButton 
                    text={this.props.buyBoxInfo.text} 
                    color={Constants.appColor.black}
                />
            </Link>
        )
    }
}

export default BuyBox;