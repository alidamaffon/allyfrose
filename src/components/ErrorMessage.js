import React, { Component } from 'react';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import '../css/ErrorMessage.css';

export class ErrorMessage extends Component {
    constructor(props) {
        super(props);
        let errorDesc = (this.props.error) ? (this.props.error) : Constants.defaultErrorDesc;    
        
        this.state = {
            errorDesc: errorDesc
        };
        
        this.displayErrorMessage = () => {
            return {__html: this.state.errorDesc.message};
        };
    }

    render () {
        const color = (this.props.viewTitleTheme.color) ? this.props.viewTitleTheme.color : Constants.defaultTheme.color;
        return (
            <div 
                className='errorContainer'
                style={{color: color}}
            >
                <div className='errorTitle'>{this.state.errorDesc.title}</div>
                <div 
                    className='errorMessage' 
                    dangerouslySetInnerHTML={this.displayErrorMessage()}
                />
            </div>
        )
    }

}

export default connect(state => state)(ErrorMessage);