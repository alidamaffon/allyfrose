import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/HeaderTitle.css';

export class HeaderTitle extends Component {
    render () {
        return (
            <div className='headerTitle'>
                <span>{this.props.label}</span>
            </div>
        )
    }
}

export default connect(state => state)(HeaderTitle);