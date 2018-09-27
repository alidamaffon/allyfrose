import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemFooter from './ItemFooter';
import DateIcon from './DateIcon';
import '../css/NewsItem.css';

export class NewsItem extends Component {
    constructor(props) {
        super(props);

        this.setNewsTitle       = () => {
            return {__html: this.props.item.newsTitle};
        };

        this.setNewsDescription = () => {
            return {__html: this.props.item.newsDescription};
        };
    }

    render () {
        let footerProps = {
            showAskAQuestion: true,
            showReadMore: false,
            showFavouriteIcon: false,
            showShareIcon: true,
            showViewIcon: false,
            showLikeIcon: true,
            center: false
        };

        return (
            <div className='newsItem'>
                <div 
                    className='newsItemTitle' 
                    dangerouslySetInnerHTML={this.setNewsTitle()}
                    style={{color: this.props.viewTitleTheme.color}}
                ></div>
                <div className='newsDateContainer'>
                    <DateIcon item={this.props.item}/>
                </div>
                <div 
                    className='newsItemDescription' 
                    dangerouslySetInnerHTML={this.setNewsDescription()}
                ></div>
                <div className='newsFooterContainer'>
                    <ItemFooter 
                        item={this.props.item} 
                        footerProps={footerProps}
                    />
                </div>
            </div>
        )
    }

}
export default connect(state => state)(NewsItem);