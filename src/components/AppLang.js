import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tools from '../utilities/Tools';
import AppButton from './AppButton';
import Constants from '../utilities/Constants';
import '../css/AppLang.css';

export class AppLang extends Component {
    constructor(props) {
        super(props);
        this.storeAppLang = (appLang) => {
            this.props.history.replace('/main/');
            if (!this.props.initData.lang) {
                Tools.setAppLang(appLang);
            }
            
            let appLaunchCount = Tools.getAppLaunchCount();
            Tools.setAppLaunchCount(appLaunchCount + 1);
        };
    }
    
    render () {
        return (
            <div className='welcomeButton'>
                <Link to='/main/' className='welcomeLink'>
                    <AppButton 
                        color={Constants.appColor.white}
                        onClick={() => this.storeAppLang(this.props.appLang)}
                        text={this.props.text}
                    />
                </Link>
            </div>
        )
    }
}

export default connect(state => state)(AppLang);