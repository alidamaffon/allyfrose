import React, { Component } from 'react';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import PoetryItem from './PoetryItem';
import NewsItem from './NewsItem';
import '../css/Pagination.css';


export class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            itemsPerPage: 10
        };
        
        this.loadNextPage = (e) => {
            this.setState({
                currentPage: Number(e.target.id)
            });
        };
    }
    
    render() {
        let renderItems,
            renderPageNumbers;

        const { currentPage, itemsPerPage } = this.state;
        const items                         = this.props.data;
        const pageNumbers                   = [];
        const indexOfLastItem               = currentPage * itemsPerPage;
        const indexOfFirstItem              = indexOfLastItem - itemsPerPage;
        const currentItems                  = items.slice(indexOfFirstItem, indexOfLastItem);

        if (this.props.itemType === Constants.itemTypes.NEWS) {
            renderItems = currentItems.map((item, index) => {
                return <NewsItem key={index} item={item}/>
            });
        } else if (this.props.itemType === Constants.itemTypes.POETRY) {
            renderItems = currentItems.map((item, index) => {
                return <PoetryItem key={index} item={item} action={this.props.action}/>
            });
        }

        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        if (pageNumbers.length > 1) {
            renderPageNumbers = pageNumbers.map(number => {
                let style = (number === this.state.currentPage) ? {color: this.props.viewTitleTheme.color} : {};
                return (
                    <li 
                        key={number} 
                        id={number} 
                        onClick={this.loadNextPage}
                        style={style}>
                        {number}
                    </li>
                );
            });
        }
    
        return (
            <div className='pagination'>
                <ul className='paginationItems'>
                    {renderItems}
                </ul>
                <ul className='pageNumbers'>
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }

}

export default connect (state => state)(Pagination);