import React, { Component } from 'react';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import Tools from '../utilities/Tools';
import '../css/CookiePolicy.css';

class CookiePolicy extends Component {
    constructor(props) {
        super(props);
        this.setCookieMessage = () => {
            return {__html: this.props.text};
        };
    }

    render () {
        return (
            <div className='cookiePolicy'>
                <p className='cookieMessage' dangerouslySetInnerHTML={this.setCookieMessage()}></p>
                <a className='agree' onClick={() => this.props.onClick()}>{Constants.cookieAgreement}</a>
            </div>
        )
    }
}

export class ToggleCookiePolicy extends Component {
    constructor(props) {
        super(props);
        let cookieMessage = (this.props.cookieMessage) ? this.props.cookieMessage : Constants.cookieMessage;
        this.state = {
            visible: true,
            cookieMessage: cookieMessage
        };
        this.hideCookie = () => {
            console.log('[CookiePolicy] State has changed. Component is hidden');
            this.setState({
                visible: false
            });
            Tools.setCookie();
        };
    }

    render() {
        let elt = null;

        if (this.state.visible) {
            elt = <CookiePolicy onClick={() => this.hideCookie()} text={this.state.cookieMessage}/>
        }
        return (
            <div>
                {elt}
            </div>
        )
    }
}

export default connect(state => state)(ToggleCookiePolicy);