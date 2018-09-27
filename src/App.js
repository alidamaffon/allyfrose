import React, { Component } from 'react';
import {
	Route,
	Switch,
	BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchInitData } from './actions/config';
import ErrorMessage from './components/ErrorMessage';
import Constants from './utilities/Constants';
import Loading from './components/Loading';
import Welcome from './Welcome';
import Main from './Main';
import './css/App.css';


/**
* A <Switch> renders the first child <Route> that matches.
* A <Route> with no path always matches
*/

class App extends Component {
	componentDidMount() {
		this.props.fetchData();
	}

	render() {
		let screen  = null;

		if (this.props.initDataIsLoading) {
			screen = <Loading loading={Constants.loading}/>
		} else if (this.props.initDataLoadHasFailed) {
			screen = <ErrorMessage error={Constants.errorDescription}/>
		} else {
			screen = <Router>
						<Switch>
							<Route exact path='/' component={Welcome}/>
							<Route path='/main/' component={Main} />
						</Switch>
					</Router>		
		}

		return (
			<div className='App'>
				{screen}
			</div>
		)
	}
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
		fetchData: () => dispatch(fetchInitData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
