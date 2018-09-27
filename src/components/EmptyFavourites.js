import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import Constants from '../utilities/Constants';
import '../css/EmptyFavourites.css';

export class EmptyFavourites extends Component {
    render () {
        return (
            <div className='favouritesEmpty'>
                <img 
                    className='emptyFavouriteIcon' 
                    src={localImg.likeIcon} 
                    alt={Constants.alt.emptyFavouriteIcon}
                />
                <div>{this.props.configData.poetryItem.favouritesEmptyText}</div>
            </div>
        )
    }

}

export default connect(state => state)(EmptyFavourites);