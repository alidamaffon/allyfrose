import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from '../actions/currentView';
import { fetchPoetry } from '../actions/poetry';
import EmptyFavourites from './EmptyFavourites';
import Constants from '../utilities/Constants';
import viewTypes from '../types/viewTypes';
import ErrorMessage from './ErrorMessage';
import Tools from '../utilities/Tools';
import Pagination from './Pagination';
import Loading from './Loading';
import Footer from './Footer';
import Promo from './Promo';
import Hero from './Hero';
import '../css/Poetry.css';

export class Poetry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAll: false,
            showFavourites: true,
            showMostPopular: false
        };

        this.showMostPopular = () => {
            this.setState({
                showAll: false,
                showFavourites: false,
                showMostPopular: true
            });
        };

        this.showFavourites = () => {
            this.setState({
                showAll: false,
                showFavourites: true,
                showMostPopular: false
            });
        };

        this.showAll = () => {
            this.setState({
                showAll: true,
                showFavourites: false,
                showMostPopular: false
            });
        };

        this.hideFavouriteItem = () => {    
            if (this.state.showFavourites) {
                this.setState({
                    showAll: false,
                    showFavourites: true,
                    showMostPopular: false
                });
            }
        };
    }
    
    componentDidMount() {
        this.props.setCurrentView(viewTypes.POETRY);
        this.props.fetchPoetryData();
    }

    render () {
        let screen,
            container,
            hasFailed            = this.props.poetryLoadHasFailed || this.props.poetryData.error || !this.props.poetryData.data || !this.props.poetryData.data.length,
            hasSucceed           = this.props.poetryLoadIsCompleted && this.props.poetryData.data && this.props.poetryData.data.length,
            showAllFocus         = (this.state.showAll) ? Constants.poetryMenuColor.focus : Constants.poetryMenuColor.default,
            showMostPopularFocus = (this.state.showMostPopular) ? Constants.poetryMenuColor.focus : Constants.poetryMenuColor.default,
            showFavouritesFocus  = (this.state.showFavourites) ? Constants.poetryMenuColor.focus : Constants.poetryMenuColor.default;

        if (this.props.poetryIsLoading) {
            console.log("[poetry]");
            screen = <Loading loading={this.props.configData.loading}/>
        } else if (hasFailed) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc} />
        } else if (hasSucceed) {
            if (this.state.showFavourites) {
                const userFavourites = Tools.getUserFavouritesPoetry(this.props.poetryData.data);                
                if (!userFavourites || !userFavourites.length) {
                    container = <EmptyFavourites />
                } else {
                    container = <Pagination 
                                    data={userFavourites} 
                                    itemType={Constants.itemTypes.POETRY} 
                                    action={this.hideFavouriteItem}
                                />
                }
            } else if (this.state.showAll) {
                const orderByLatest = Tools.orderPoetryByLatest(this.props.poetryData.data);
                container = <Pagination 
                                data={orderByLatest} 
                                itemType={Constants.itemTypes.POETRY} 
                                action={this.hideFavouriteItem}
                            />
            } else if (this.showMostPopular) {
                const orderByMostPopular = Tools.orderPoetryByMostPopular(this.props.poetryData.data);
                container = <Pagination 
                                data={orderByMostPopular} 
                                itemType={Constants.itemTypes.POETRY} 
                                action={this.hideFavouriteItem}
                            />                
            }

            screen = <div className='poetryContainer'>
                        <Hero viewTitle={this.props.configData.viewTitle.poetry}/>
                        <Promo />
                        <div className='orderByContainer' style={{backgroundColor: this.props.viewTitleTheme.color}}>
                            <ul className='orderByItems'>
                                <li 
                                    onClick={this.showFavourites} 
                                    style={showFavouritesFocus}
                                >
                                    {this.props.configData.poetryItem.favourites}
                                </li>
                                <li 
                                    onClick={this.showMostPopular} 
                                    style={showMostPopularFocus}
                                >
                                    {this.props.configData.poetryItem.mostPopular}
                                </li>
                                <li 
                                    onClick={this.showAll} 
                                    style={showAllFocus}
                                >
                                    {this.props.configData.poetryItem.all}
                                </li>
                            </ul>
                        </div>
                        {container}
                        <Footer />
                    </div>
        }

        return (
            <div className='poetry'>
                {screen}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view)),
        fetchPoetryData: () => dispatch(fetchPoetry())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Poetry);