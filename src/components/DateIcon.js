import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import Constants from '../utilities/Constants';
import Tools from '../utilities/Tools';
import '../css/DateIcon.css';

export class DateIcon extends Component {
    render () {
        return (
            <div className='newsDateContainer'>
                <img 
                    className='newsIcon' 
                    src={localImg.clockItemIcon} 
                    alt={Constants.alt.newsIcon}
                />
                <div className='newsItemDate'>
                    {Tools.convertNewsDate(this.props.item.created)}
                </div>
            </div>
        )
    }

}

export default connect(state => state)(DateIcon);