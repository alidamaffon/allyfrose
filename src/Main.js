import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConfig } from './actions/updateConfig';
import MobileNavigation from './components/MobileNavigation';
import ToggleCookiePolicy from './components/CookiePolicy';
import ErrorMessage from './components/ErrorMessage';
import Navigation from './components/Navigation';
import Constants from './utilities/Constants';
import Loading from './components/Loading';
import Tools from './utilities/Tools';

import './css/Main.css';

export class Main extends Component {
    componentDidMount() {
        this.props.fetchConfigData();
    }
    
    render () {
        let screen,
            cookieContainer,
            cookieMessage;

        let isLoading  = this.props.configIsLoading,
            hasFailed  = this.props.configLoadHasFailed || (this.props.configLoadIsCompleted && Tools.isEmptyObj(this.props.configData)),
            hasSucceed = this.props.configLoadIsCompleted && !Tools.isEmptyObj(this.props.configData);
        
        if (this.props.configData.shouldShowCookie) {
            cookieMessage   = (this.props.configData.cookieMessage) ? this.props.configData.cookieMessage : null;
            cookieContainer = <ToggleCookiePolicy cookieMessage={cookieMessage}/>
        }

        if (isLoading) {
            screen = <Loading loading={Constants.loading}/>
        } else if (hasFailed) {
            screen = <ErrorMessage error={Constants.errorDescription}/>
        } else if (hasSucceed) {
            if (this.props.windowSize < 900) {
                screen = <MobileNavigation history={this.props.history}/>
            } else {
                screen = <Navigation history={this.props.history}/>
            }
        }

        return (
            <div className='main'>
                {screen}
                {cookieContainer}
            </div>
        )

    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        fetchConfigData: () => dispatch(fetchConfig())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);