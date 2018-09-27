import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookCatalogTask from './BookCatalogTask';
import BookDetails from './BookDetails';
import HeaderTitle from './HeaderTitle';
import Tools from '../utilities/Tools';
import ItemGenres from './ItemGenres';
import '../css/BookCatalog.css';

export class BookCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,

        };

        this.showSelectedBookInfo = (item) => {    
            this.setState({
                selectedItem: item
            });
        };
    }
    
    render () {
        let descriptionContainer,
            sagaTitle;
        const onFocus = {
            borderBottom: '1px solid' + this.props.viewTitleTheme.color
        };

        if (this.state.selectedItem && this.state.selectedItem.saga) {
            sagaTitle = <div 
                            className='selectedItemSagaTitle'
                            style={{color: this.props.viewTitleTheme.color}}
                        >
                            {this.state.selectedItem.saga}
                        </div>
        }

        if (this.state.selectedItem) {
            const genres = Tools.getGenres(this.state.selectedItem.genre);
            descriptionContainer = <div className='selectedItemInfo'>
                {sagaTitle}
                <div className='selectedItemTitle'>{this.state.selectedItem.title}</div>
                <div className='selectedItemDetails'>
                    <BookDetails item={this.state.selectedItem}/>
                </div>
                <div className='selectedItemGenres'>
                    <ItemGenres genres={genres}/>
                </div>
            </div>
        }

        return (
            <div className='catalogItemsContainer'>
                <HeaderTitle label={this.props.configData.bookDescription.more} />
                <ul className='catalogItems'>
                    {this.props.items.map((item, i) => {
                        let style = (this.state.selectedItem && (this.state.selectedItem.bookId === item.bookId)) ? onFocus : null;
                        return <BookCatalogTask
                            key={i} 
                            item={item}
                            style={style}
                            onClick={() => this.showSelectedBookInfo(item)}     
                        />
                    })}
                </ul>
                {descriptionContainer}
            </div>
        )
    }
}

export default connect (state => state)(BookCatalog);