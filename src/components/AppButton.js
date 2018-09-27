import React, { Component } from 'react';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import '../css/AppButton.css';

export class AppButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false,
            isWhite: (this.props.color === Constants.appColor.white)
        };

        this.isHovering = (isHovering) => {
            this.setState({
                isHovering: isHovering
            }) 
        };
    }
    render () {
        let colorToSet  = this.props.color;
        let borderToSet = this.props.color;

        if (this.state.isHovering) {
            if (this.state.isWhite) {
                colorToSet = Constants.appColor.black;
            }

            if (!this.state.isWhite) {
                borderToSet = Constants.appColor.white;
            }         
        }

        const buttonA = {
            border: '1px solid ' + borderToSet,
            color: colorToSet
        }

        const buttonB = {
            borderTop: '1px solid ' + borderToSet,
            borderBottom: '1px solid ' + borderToSet,
            color: colorToSet
        }
        
        return (
            <div className='appButtonA' 
                onMouseEnter={() => this.isHovering(true)} 
                onMouseLeave={() => this.isHovering(false)} 
                style={buttonA} 
                onClick={this.props.onClick}
            >
                <div className='appButtonB' 
                    onMouseEnter={() => this.isHovering(true)} 
                    onMouseLeave={() => this.isHovering(false)} 
                    style={buttonB}>
                        {this.props.text}
                </div>
            </div>
        )
    }
}

export default connect(state => state)(AppButton);