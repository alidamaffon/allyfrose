import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from '../actions/currentView';
import { fetchBookStore } from '../actions/bookStore';
import BookStore from '../components/BookStore';
import Loading from '../components/Loading';
import viewTypes from '../types/viewTypes';
import ErrorMessage from './ErrorMessage';
import '../css/Books.css';

export class Books extends Component {
    componentDidMount() {
        this.props.fetchStoreData();
        this.props.setCurrentView(viewTypes.LIBRARY);
    }

    render () {
        let screen;

        if (this.props.bookStoreIsLoading) {
            screen = <Loading loading={this.props.configData.loading}/>
        } else if (this.props.bookStoreLoadHasFailed) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc} />
        } else if (this.props.bookStoreLoadIsCompleted) {
            screen = <BookStore />
        }

        return (
            <div className='storeContainer'>
                {screen}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view)),
        fetchStoreData: () => dispatch(fetchBookStore())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);