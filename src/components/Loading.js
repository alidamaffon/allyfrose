import React, { Component } from 'react';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import '../css/Loading.css';

export class Loading extends Component {
    constructor(props) {
        super(props);

        this.displayLoadingMessage = () => {
            let loading = (this.props.loading) ? this.props.loading : Constants.loading;
            return {__html: loading};
        };
    }

    render () {
        const color = (this.props.viewTitleTheme.color) ? this.props.viewTitleTheme.color : Constants.defaultTheme.color;
        return (
            <div
                style={{color: color}}
                className='loadingContainer' 
                dangerouslySetInnerHTML={this.displayLoadingMessage()}
            />
        )
    }

}

export default connect(state => state)(Loading);