import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import BookDetails from './BookDetails';
import HeaderTitle from './HeaderTitle';
import Tools from '../utilities/Tools';
import ItemGenres from './ItemGenres';
import '../css/BookHero.css';

export class BookHero extends Component {
    render () {
        const genres = Tools.getGenres(this.props.item.genre);
        const imgAlt = this.props.item.websafetitle;
        const imgSrc = localImg[this.props.item.websafetitle];
        let sagaTitle;

        if (this.props.item.saga) {
            sagaTitle = <div className='bookHeroTitle'>{this.props.item.saga}</div>
        }

        return (
            <div>
                <HeaderTitle label={this.props.item.title}/>
                <div className='bookHeroContainer'>
                    {sagaTitle}
                    <div className='bookHeroGenres'>
                        <ItemGenres genres={genres}/>
                    </div>
                    <div className='bookHeroContent'>
                        <div className='bookHeroLeft'>
                            <div className='bookHeroImageContainer'>
                                    <img 
                                        className='bookHeroImage'
                                        alt={imgAlt} src={imgSrc}
                                    />
                            </div> 
                        </div>    
                        <div className='bookHeroRight'>
                            <BookDetails item={this.props.item}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(BookHero);