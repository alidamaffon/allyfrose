import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentViewChanged } from '../actions/currentView';
import { fetchPoetryDesc } from '../actions/poetryById';
import Constants from '../utilities/Constants';
import PoetryReadMore from './PoetryReadMore';
import viewTypes from '../types/viewTypes';
import ErrorMessage from './ErrorMessage';
import Tools from '../utilities/Tools';
import ItemFooter from './ItemFooter';
import Loading from './Loading';
import Footer from './Footer';
import Hero from './Hero';
import '../css/PoetryFullText.css';

export class PoetryFullText extends Component {
    constructor(props) {
        super(props);

        this.getPoetryData = () => {
            let poetryData = this.getSelectedPoetryId();
            this.getSelectedPoetryData(poetryData.id);
            this.props.setCurrentView(viewTypes.POETRY_ITEM + poetryData.websafetitle);
        };

        this.getSelectedPoetryId = () => {
            let poetryData = {};   
            let id         = this.props.location.pathname.indexOf('poetryId');
            
            if (id !== -1) {
                poetryData.id           = this.props.location.pathname.substr(id + 9);
                let index               = this.props.location.pathname.indexOf('fullText');
                let websafetitle        = this.props.location.pathname.substring(index + 9, id - 1);
                poetryData.websafetitle = websafetitle.replace(/-/g, '_');
            }
            return poetryData;
        };

        this.getSelectedPoetryData = (poetryId) => {
            this.props.fetchPoetryDescData(poetryId);
        };

        this.setPoetry = () => {
            return {__html: this.props.poetryDescData.data.fullPoetry};
        };
    }

    componentDidMount() {
        this.getPoetryData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.getPoetryData();
        }
    }

    render () {
        let screen,
            upNextItem,
            footerProps = {
                showAskAQuestion: false,
                showReadMore: false,
                showFavouriteIcon: true,
                showShareIcon: true,
                showViewIcon: true,
                showLikeIcon: true,
                center: true
            }
        
        if (this.props.poetryDescIsLoading) {
            screen = <Loading loading={this.props.configData.loading}/>
        } else if (this.props.poetryDescLoadHasFailed || this.props.poetryDescData.error || Tools.isEmptyObj(this.props.poetryDescData.data)) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc} />
        } else if (this.props.poetryDescLoadIsCompleted && !Tools.isEmptyObj(this.props.poetryDescData.data)) {
            upNextItem = {
                websafetitle: this.props.poetryDescData.data.followByWebsafetitle,
                poetryId: this.props.poetryDescData.data.followById,
                id: this.props.poetryDescData.data.followById,
                type: Constants.itemTypes.POETRY
            }
            
            screen = <div className='poetryFullTextContainer'>
                    <Hero viewTitle={this.props.poetryDescData.data.title}/>
                    <div className='poetryFullTextContentA'>
                        <div className='poetryFullTextContentB'>
                            <div>
                                <div className='poetryFull' 
                                    dangerouslySetInnerHTML={this.setPoetry()}
                                ></div>
                                <ItemFooter 
                                    item={this.props.poetryDescData.data} 
                                    footerProps={footerProps}
                                />
                            </div>
                            <div className='poetryNext'>
                                <div className='poetryNextTitle'>{this.props.configData.poetryItem.readNext}</div>
                                <PoetryReadMore 
                                    item={upNextItem}
                                    text={this.props.poetryDescData.data.followByTitle}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
        }
            
        return (
            <div className='poetryFullText'>
                {screen}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view)),
        fetchPoetryDescData: (id) => dispatch(fetchPoetryDesc(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoetryFullText);