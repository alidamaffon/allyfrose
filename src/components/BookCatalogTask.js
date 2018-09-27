import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import Constants from '../utilities/Constants';
import AppButton from './AppButton';
import '../css/BookCatalogTask.css';

export class BookCatalogTask extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isHovering: false
        };

        this.isHovering = (isHovering) => {
            this.setState({
                isHovering: isHovering
            }) 
        };
    }
    
    render () {
        let overlay;

        if (this.state.isHovering) {
            overlay = <div className='catalogTaskOverlay'>
                <div className='catalogTaskButton'>
                    <AppButton text={this.props.configData.bookDescription.explore} color={Constants.appColor.white}/>
                </div>
            </div>
        }

        return (
            <li className='catalogTask' 
                onMouseEnter={() => this.isHovering(true)} 
                onMouseLeave={() => this.isHovering(false)} 
                onClick={() => this.props.onClick()}
            >
                <div className='catalogTaskImageContainer' style={this.props.style}>
                    <img className='catalogTaskImage'
                        alt={this.props.item.websafetitle} 
                        src={localImg[this.props.item.websafetitle]}
                    />
                    {overlay}
                </div>
            </li>
        );
    }
}

export default connect (state => state)(BookCatalogTask);