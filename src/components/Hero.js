import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Hero.css';

export class Hero extends Component {
    render () {
        let secondaryTitle;
        let heroStyle = {
            backgroundColor: this.props.viewTitleTheme.color,
            backgroundImage: 'url(' + this.props.viewTitleTheme.background + ')'
        }
        
        if (this.props.viewSecondaryTitle) {
            secondaryTitle = <div className='heroSecondaryTitle'>
                    {this.props.viewSecondaryTitle}
                </div>
        }

        return (
            <div className='hero' style={heroStyle}>
                <div className='heroOverlay'>
                    <div className='heroTitleContainer'>
                        <div className='heroTitle'>{this.props.viewTitle}</div>
                        {secondaryTitle}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Hero);