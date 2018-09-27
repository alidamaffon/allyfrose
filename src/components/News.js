import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from '../actions/currentView';
import { fetchNews } from '../actions/news';
import Constants from '../utilities/Constants';
import ViewTypes from '../types/viewTypes';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';
import Loading from './Loading';
import Footer from './Footer';
import Promo from './Promo';
import Hero from './Hero';
import '../css/News.css';

export class News extends Component {     
    componentDidMount() {
        this.props.setCurrentView(ViewTypes.NEWS);
        this.props.fetchNewsData();
    }

    render () {
        let screen;
        let hasFailed   = this.props.newsLoadHasFailed || this.props.newsData.error || !this.props.newsData.data || !this.props.newsData.data.length;
        let hasSucceed  = this.props.newsLoadIsCompleted && this.props.newsData.data && this.props.newsData.data.length;

        if (this.props.newsIsLoading) {
            screen = <Loading loading={this.props.configData.loading}/>
        } else if (hasFailed) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc}/>
        } else if (hasSucceed) {
            screen = <div className='newsContainer'>
                        <Hero viewTitle={this.props.configData.viewTitle.news}/>
                        <Promo />
                        <Pagination 
                            data={this.props.newsData.data} 
                            itemType={Constants.itemTypes.NEWS}
                        />
                        <Footer />
                    </div>
        }

        return (
            <div className='news'>
                {screen}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view)),
        fetchNewsData: () => dispatch(fetchNews())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);