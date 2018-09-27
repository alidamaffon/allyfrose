import React, { Component } from 'react';
import '../css/WelcomeBackgroundImg.css';
import { connect } from 'react-redux';

export class WelcomeBackgroundImg extends Component {
	render() {
		const backgroundImg = {
			backgroundImage: 'url(' + this.props.initData.greetingImgUrl + ')'
		};
		
		return (
			<div className="welcomeBackground" style={backgroundImg}></div>
		);
	}
}

export default connect(state => state)(WelcomeBackgroundImg);