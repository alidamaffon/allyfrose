import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemFooter from './ItemFooter';
import BuyBox from './BuyBox';
import '../css/BookDetails.css';

export class BookDetails extends Component {
    constructor(props) {
        super(props);
        
        this.displayBookDescription = () => {
            return {__html: this.props.item.shortDescription};
        };
    }

    render () {
        const buyBoxes    = this.props.item.store.split(';');
        const footerProps = {
            showAskAQuestion: false,
            showReadMore: true,
            showFavouriteIcon: false,
            showShareIcon: true,
            showViewIcon: true,
            showLikeIcon: true,
            center: (this.props.center) ? true : false
        };
        let buyBoxesContainer;
        this.props.item.buyBoxes = buyBoxes.filter((item) => {
            let buybox = JSON.parse(item);
            return (buybox.available);
        });

        if (this.props.item.buyBoxes.length) {
            buyBoxesContainer = <div>
                <div className='bookBuyLabel'>{this.props.configData.bookDescription.buy}</div>
                <div className='bookBuyboxes'>
                    {this.props.item.buyBoxes.map((buyBox, i) => 
                        <div key={i} className='buyBoxContainer'>
                            <BuyBox type='bookBuyBox' buyBoxInfo={JSON.parse(buyBox)} item={this.props.item}/>
                        </div>
                    )}
                </div>
            </div>
        }
        return (   
            <div className='bookDetailsContainer'>
                <div className='bookDescLabel'>{this.props.configData.bookDescription.summary}</div>
                <div className='bookShortDesc' dangerouslySetInnerHTML={this.displayBookDescription()}></div>
                {buyBoxesContainer}
                <ItemFooter footerProps={footerProps} item={this.props.item}/>
            </div>
        )
    }
}

export default connect(state => state)(BookDetails);