import React, { Component } from 'react';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import PoetryReadMore from './PoetryReadMore';
import FavouriteIcon from './FavouriteIcon';
import AskAQuestion from './AskAQuestion';
import ShareIcon from './ShareIcon';
import ViewIcon from './ViewIcon';
import LikeIcon from './LikeIcon';
import ReadMore from './ReadMore';
import '../css/ItemFooter.css';


export class ItemFooter extends Component {
    render () {
        let readMore,
            favouriteIcon,
            shareIcon,
            viewIcon,
            likeIcon,
            askAQuestion;
        const footerStyle = (this.props.footerProps.center) ? 'itemFooterCenter' : 'itemFooter';

        if (this.props.footerProps.showReadMore) {
            if (this.props.item.type === Constants.itemTypes.POETRY) {
                readMore = <PoetryReadMore 
                                item={this.props.item} 
                                text={this.props.configData.poetryItem.readMore}
                            />
            } else if (this.props.item.type === Constants.itemTypes.BOOK) {
                readMore = <ReadMore 
                                type='readMore' 
                                text={this.props.configData.readMore} 
                                item={this.props.item}
                            />
            }    
        }

        if (this.props.footerProps.showFavouriteIcon) {
            favouriteIcon = <FavouriteIcon item={this.props.item} action={this.props.action}/>
        }

        if (this.props.footerProps.showShareIcon) {
            shareIcon = <ShareIcon item={this.props.item}/>
        }

        if (this.props.footerProps.showViewIcon) {
            viewIcon = <ViewIcon item={this.props.item}/>
        }

        if (this.props.footerProps.showLikeIcon) {
            likeIcon = <LikeIcon item={this.props.item}/>
        }

        if (this.props.footerProps.showAskAQuestion) {
            askAQuestion = <AskAQuestion item={this.props.item}/>
        }

        return (
            <div className={footerStyle}>
                {askAQuestion}
                {readMore}
                {favouriteIcon}
                {shareIcon}
                {viewIcon}
                {likeIcon}
            </div>
        )
    }

}
export default connect(state => state)(ItemFooter);