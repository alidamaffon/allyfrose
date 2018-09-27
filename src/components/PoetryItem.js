import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemFooter from './ItemFooter';
import '../css/PoetryItem.css';


export class PoetryItem extends Component {
    constructor(props) {
        super(props);

        this.setPoetryTitle = () => {
            return {__html: this.props.item.title};
        };

        this.setPoetryExcerpt = () => {
            return {__html: this.props.item.excerpt};
        };
    }

    render () {
        let footerProps = {
            showAskAQuestion: false,
            showReadMore: true,
            showFavouriteIcon: true,
            showShareIcon: true,
            showViewIcon: true,
            showLikeIcon: true,
            center: false
        };

        return (
            <div className='poetryItem'>
                <div 
                    className='poetryItemTitle' 
                    dangerouslySetInnerHTML={this.setPoetryTitle()}
                ></div>
                <div 
                    className='poetryItemExcerpt' 
                    dangerouslySetInnerHTML={this.setPoetryExcerpt()}>
                </div>
                <div className='poetryFooterContainer'>
                    <ItemFooter 
                        item={this.props.item} 
                        footerProps={footerProps} 
                        action={this.props.action}
                    />
                </div>
            </div>
        )
    }

}
export default connect(state => state)(PoetryItem);