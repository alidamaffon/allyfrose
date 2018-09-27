import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from './actions/currentView';
import { welcomeWasShown } from './actions/welcomeWasShown';
import WelcomeBackgroundImg from './components/WelcomeBackgroundImg';
import WelcomeOverlay from './components/WelcomeOverlay';
import viewTypes from './types/viewTypes';
import './css/Welcome.css';


export class Welcome extends Component {
    componentDidMount() {
        this.props.setCurrentView(viewTypes.WELCOME);
        this.props.welcomeWasShown(true);
    }
    
	render() {     
		return (
            <div className='welcome'>
                <WelcomeBackgroundImg/>
                <WelcomeOverlay history={this.props.history}/>
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        initData: state.initData,
        initDataLoadHasFailed: state.initDataLoadHasFailed,
		initDataIsLoading: state.initDataIsLoading,
		currentView: state.currentView,
		windowSize: state.windowSize,
		welcomeWasShown: state.welcomeWasShown
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
		setCurrentView: (view) => dispatch(currentViewChanged(view)),
		welcomeWasShown: (wasShown) => dispatch(welcomeWasShown(wasShown))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);