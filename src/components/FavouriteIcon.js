import React, { Component } from 'react';
import { connect } from 'react-redux';
import localImg from '../config/localImgConfig';
import Tools from '../utilities/Tools';
import '../css/FavouriteIcon.css';

export class FavouriteIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInFavourites: false
        };

        this.updateFavouriteState = () => {
            if (this.state.isInFavourites) {
                let id = parseInt(this.props.item.poetryId, 10);
                Tools.removeLikedPoetryItem(id.toString());
                this.setState({
                    isInFavourites: false
                });

                if (this.props.action) {
                    this.props.action();
                }
            } else {
                Tools.addLikedPoetryItem({
                    id: this.props.item.poetryId
                });
                this.setState({
                    isInFavourites: true
                });
                
                if (this.props.action) {
                    this.props.action();
                }
            }
        };
    }

    componentDidMount() {
        let isInFavourites = Tools.poetryItemIsInStorage(this.props.item.poetryId);
        this.setState({
            isInFavourites: isInFavourites
        })
    }

    render () {

        let favIcon = (this.state.isInFavourites) ? localImg.removeFromFavouritesBlack : localImg.addToFavouritesBlack;
        let favIconTitle = (this.state.isInFavourites) ? this.props.configData.poetryItem.removeFromFavourites : this.props.configData.poetryItem.addToFavourites;
        
        return (
                <div className='favIconContainer'>
                    <img 
                        className='favIcon' 
                        src={favIcon} 
                        title={favIconTitle}
                        alt={favIconTitle} 
                        onClick={this.updateFavouriteState}
                    />
                    <div className='favIconLabel'>{favIconTitle}</div>
                </div>
        )
    }

}

export default connect(state => state)(FavouriteIcon);