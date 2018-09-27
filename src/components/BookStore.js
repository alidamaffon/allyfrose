import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorMessage from './ErrorMessage';
import BookCatalog from './BookCatalog';
import BookItem from './BookItem';
import BookHero from './BookHero';
import Footer from './Footer';
import Promo from './Promo';
import Hero from './Hero';
import '../css/BookStore.css';

export class BookStore extends Component {
    constructor(props) {
        super(props);
        this.getRandom = () => {
            return Math.floor(Math.random() * Math.floor(4));
        };
    }
    render () {
        let screen;
        const randomNumber = this.getRandom();

        if (this.props.bookStoreData.error || !this.props.bookStoreData.data || !this.props.bookStoreData.data.length) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc}/>
        } else {
            const heroItem   = this.props.bookStoreData.data[randomNumber];
            let catalogItems = this.props.bookStoreData.data.slice();
            catalogItems.splice(randomNumber, 1);

            if (this.props.windowSize < 750) {
                screen = <div>
                    {this.props.bookStoreData.data.map((bookItem, i) => 
                        <BookItem key={i} item={bookItem} />
                    )}
                </div>
            } else {            
                screen = <div>
                    <BookHero item={heroItem}/>
                    <BookCatalog items={catalogItems}/>
                </div>
            }
        }

        return (
            <div className='bookStore'>
                <div className='bookStoreContainer'>
                    <Hero viewTitle={this.props.configData.viewTitle.library}/>
                    <Promo />
                    {screen}
                    <Footer />
                </div>
            </div>
        )
    }
}

export default connect(state => state)(BookStore);