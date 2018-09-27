import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleCookiePolicy from '../components/CookiePolicy';
import Constants from '../utilities/Constants';
import AppLang from './AppLang';
import '../css/WelcomeOverlay.css';

export class WelcomeOverlay extends Component {
	render() {
		let cookieContainer,
			buttonContainer,
			cookieMessage;

		if (this.props.initData.shouldShowCookie) {
			cookieMessage   = (this.props.initData.cookieMessage) ? this.props.initData.cookieMessage : null;
			cookieContainer = <ToggleCookiePolicy cookieMessage={cookieMessage}/>
		}

		if (!this.props.initData.lang) {
			buttonContainer = <div>
					<AppLang 
						text={Constants.lang.fr.unknownUser} 
						appLang={Constants.lang.fr.short} 
						history={this.props.history}
					/>
					<AppLang 
						text={Constants.lang.en.unknownUser} 
						appLang={Constants.lang.en.short}
						history={this.props.history}
					/>
				</div>
		} else if (this.props.initData.lang === Constants.lang.fr.short) {
			buttonContainer = <div>
				<AppLang 
					text={Constants.lang.fr.knownUser} 
					appLang={Constants.lang.fr.short} 
					history={this.props.history}
				/>
			</div>
		} else if ((this.props.initData.lang === Constants.lang.en.short)) {
			buttonContainer = <div>
					<AppLang 
						text={Constants.lang.en.knownUser} 
						appLang={Constants.lang.en.short} 
						history={this.props.history}
					/>
				</div>
		}

		return (
			<div className='welcomeOverlay'>
				<div className='welcomeOverlayContainer'>
					<div className='welcomeTitle fade-in'>{this.props.initData.greetingMessage}</div>
					{buttonContainer}		
				</div>
				{cookieContainer}
			</div>
		);
	}
}

export default connect(state => state)(WelcomeOverlay);