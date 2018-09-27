import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/ItemGenres.css';

export class ItemGenres extends Component {
    render () {
        return (
            <div className='itemGenresContainer'>
                <div className='itemGenresTitle'>
                    {this.props.configData.bookDescription.genre}
                </div>
                <div className='itemGenres'>
                    {this.props.genres.map((genre, i) => 
                        <div key={i} className='itemGenre'>{genre}</div>
                    )}
                </div>
            </div> 
        )
    }
}

export default connect(state => state)(ItemGenres);