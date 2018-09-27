import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from '../actions/currentView';
import { Link } from 'react-router-dom';
import Constants from '../utilities/Constants';
import viewTypes from '../types/viewTypes';
import AppButton from './AppButton';
import Footer from './Footer';
import Promo from './Promo';
import Hero from './Hero';
import '../css/Home.css';

export class Home extends Component {
    componentDidMount() {
        this.props.setCurrentView(viewTypes.HOME);
    }

    render () {
        let backgroundImg = 'url(' + this.props.viewTitleTheme.background + ')';
        let backgroundTheme = this.props.viewTitleTheme.color;

        return (
            <div className='home'>
                <div className='homeContainer'>
                    <Hero viewTitle={this.props.configData.viewTitle.allyRose}/>     
                    <Promo />
                    <div className='author'>
                        <div 
                            className='authorQuote' 
                            style={{backgroundImage: backgroundImg}}
                        >
                            <div className='authorQuoteOverlay'>
                                <div className='authorQuoteText'>
                                    {this.props.configData.authorDescription.quote}
                                </div>
                            </div>
                        </div>

                        <div className='authorDesc'>
                            <div 
                                className='authorDescContent' 
                                style={{backgroundColor: backgroundTheme}}
                            >
                                <div className='authorDescContentText'>
                                    {this.props.configData.authorDescription.desc}
                                </div>
                                <div className='authorDescButtonContainer'>
                                    <Link to='/library' className='authorDescButtonLink'>
                                        <AppButton 
                                            text={this.props.configData.authorDescription.cta} 
                                            color={Constants.appColor.white}
                                        />
                                    </Link>
                                </div>
                            </div>       
                        </div>     
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);