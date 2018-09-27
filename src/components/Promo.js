import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Promo.css';

export class Promo extends Component {
    render () {
        return (
            <div className='promoContainer'>
                <div className='promoHeader'>
                    {this.props.configData.bookLatestNews.header}
                </div>
                <div 
                    className='promoTitle' 
                    style={{color: this.props.viewTitleTheme.color}}
                >
                    {this.props.configData.bookLatestNews.title}
                </div>
                <div className='promoSubtitle'>
                    {this.props.configData.bookLatestNews.subtitle}
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Promo);