import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from '../actions/currentView';
import { fetchBookDescription } from '../actions/bookDescription';
import localImg from '../config/localImgConfig';
import Constants from '../utilities/Constants';
import ReadMore from '../components/ReadMore';
import Loading from '../components/Loading';
import viewTypes from '../types/viewTypes';
import ErrorMessage from './ErrorMessage';
import BuyBox from '../components/BuyBox';
import Tools from '../utilities/Tools';
import ItemFooter from './ItemFooter';
import Footer from './Footer';
import Hero from './Hero';
import '../css/BookDescription.css';

export class BookDescription extends Component {
    constructor(props) {
        super(props);
        this.getViewData = () => {
            let bookData = this.getSelectedBookId();
            this.getSelectedBookDescriptionData(bookData.id);
            this.props.setCurrentView(viewTypes.BOOK_DESCRIPTION + bookData.websafetitle);
        };

        this.getSelectedBookId = () => {
            let bookData = {};

            let id = this.props.location.pathname.indexOf('bookId');
            if (id !== -1) {
                bookData.id = this.props.location.pathname.substr(id+7);
    
                let index        = this.props.location.pathname.indexOf('excerpt');
                let websafetitle = this.props.location.pathname.substring(index+8, id-1);
                bookData.websafetitle = websafetitle.replace(/-/g, '_');
            }
            return bookData;
        };

        this.getSelectedBookDescriptionData = (bookId) => {
            this.props.bookDescriptionData(bookId);
        };

        this.setSummary = () => {
            return {__html: this.props.bookDescData.data.description};
        };

        this.setExcerpt = () => {
            return {__html: this.props.bookDescData.data.excerpt};
        };
    
        this.getBuyBoxes = () => {
            return Tools.getBuyBoxes(this.props.bookDescData.data.store);
        };
    }

    componentDidMount() {
        this.getViewData();
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.getViewData();
        }
    }

    render () {
        let screen,
            buyBoxes,
            buyBoxesContainer,
            sequel,
            imgSrc,
            imgAlt,
            sequelItem,
            sequelTitle;
        
        const footerProps = {
            showAskAQuestion: false,
            showReadMore: false,
            showFavouriteIcon: false,
            showShareIcon: true,
            showViewIcon: true,
            showLikeIcon: true,
            center: true
        };

        if (this.props.bookDescIsLoading) {
            screen = <Loading loading={this.props.configData.loading}/>
        } else if (this.props.bookDescLoadHasFailed || this.props.bookDescData.error || Tools.isEmptyObj(this.props.bookDescData.data)) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc} />
        } else if (this.props.bookDescLoadIsCompleted && !Tools.isEmptyObj(this.props.bookDescData.data)) {
            buyBoxes = this.getBuyBoxes();
            if (buyBoxes && buyBoxes.length > 0) {
                buyBoxesContainer = <div className='buyBoxesContainerA'>
                        <div 
                            className='buyBoxesTitle'
                            style={{backgroundColor: this.props.viewTitleTheme.color}}
                        >
                            {this.props.configData.bookDescription.buy}
                        </div>
                        <div className='buyBoxesContainerB'>
                            <div className='buyBoxesSummary'>{this.props.configData.bookDescription.available}</div>
                            {buyBoxes.map((buyBox, i) => 
                                <div 
                                    key={i}
                                    className='bookDescriptionBuyBox'
                                >
                                    <BuyBox 
                                        type='buyBox'
                                        buyBoxInfo={JSON.parse(buyBox)}
                                        item={this.props.bookDescData.data}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
            }

            if (this.props.bookDescData.data.sequel) {
                imgSrc      = localImg[this.props.bookDescData.data.sequel];
                imgAlt      = 'bookImg_' + this.props.bookDescData.data.sequel;
                sequelTitle = this.props.configData.bookDescription.sequel + ' ' + this.props.bookDescData.data.sequelId;
                sequelItem  = {
                    websafetitle: this.props.bookDescData.data.sequel,
                    bookId: this.props.bookDescData.data.sequelId,
                    id: this.props.bookDescData.data.sequelId,
                    type: Constants.itemTypes.BOOK
                }
                sequel = <div className='sequel'>
                            <div
                                className='sequelTitle'
                                style={{backgroundColor: this.props.viewTitleTheme.color}}
                            >
                                {sequelTitle}
                            </div>
                            <img className='sequelImage' alt={imgAlt} src={imgSrc}/>
                            <div className='sequelCta'>
                                <ReadMore 
                                    type='readMore' 
                                    text={this.props.configData.readMore} 
                                    item={sequelItem}
                                />
                            </div>
                        </div>
            }

            screen = <div className='bookDescriptionContainer'>
                    <Hero viewTitle={this.props.bookDescData.data.title} />
                    <div className='bookDescriptionContainerA'>
                        <div className='bookDescriptionContainerB'>
                            <div 
                                className='bookSummaryTitle' 
                                style={{backgroundColor: this.props.viewTitleTheme.color}}
                            >
                                {this.props.configData.bookDescription.summary}
                            </div>
                            <div 
                                className='summary' 
                                dangerouslySetInnerHTML={this.setSummary()}
                            ></div>
                            <div 
                                className='bookExcerptTitle'
                                style={{backgroundColor: this.props.viewTitleTheme.color}}
                            >
                                {this.props.configData.bookDescription.excerpt}
                            </div>
                            <div 
                                className='excerpt'
                                dangerouslySetInnerHTML={this.setExcerpt()}
                            ></div>
                            {buyBoxesContainer}
                            <div className='bookDescriptionFooter'>
                                <ItemFooter footerProps={footerProps} item={this.props.bookDescData.data}/>
                            </div>
                            {sequel}
                        </div>
                    </div>
                    <Footer />
                </div>
        }

        return (
            <div className='bookDescription'>
                {screen}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view)),
        bookDescriptionData: (id) => dispatch(fetchBookDescription(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDescription);