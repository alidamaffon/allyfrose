import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import BookDetails from './BookDetails';
import HeaderTitle from './HeaderTitle';
import Tools from '../utilities/Tools';
import ItemGenres from './ItemGenres';
import '../css/BookItem.css';

export class BookItem extends Component {
    render () {
        const genres = Tools.getGenres(this.props.item.genre);
        const imgAlt = this.props.item.websafetitle;
        const imgSrc = localImg[this.props.item.websafetitle];
        let sagaTitle;

        if (this.props.item.saga) {
            sagaTitle = <div className='bookItemSagaTitle'>{this.props.item.saga}</div>
        }

        return (
            <div>
                <HeaderTitle label={this.props.item.title}/>
                <div className='bookItemContainer'>
                    <div className='bookItemImageContainer'>
                        <img className='bookItemImage' alt={imgAlt} src={imgSrc}/>
                    </div>
                    {sagaTitle}
                    <div className='bookItemDetails'>
                        <BookDetails item={this.props.item} center={true}/>
                    </div>
                    <div className='bookItemGenres'>
                        <ItemGenres genres={genres}/>
                    </div> 
                </div>
            </div>
        )
    }
}

export default connect(state => state)(BookItem);