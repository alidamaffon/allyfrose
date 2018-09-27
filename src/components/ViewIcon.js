import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import '../css/ViewIcon.css';


export class ViewIcon extends Component {
    render () {
        return (
            <div className='viewIconContainer'>
                <img 
                    className='viewIcon' 
                    src={localImg.viewIconBlack} 
                    alt='poetryItemViewsIcon'
                />
                <div className='viewIconLabel'>{this.props.item.nbViews}</div>
            </div>
        )
    }
}

export default connect(state => state)(ViewIcon);