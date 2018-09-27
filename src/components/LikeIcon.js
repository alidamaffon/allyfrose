import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLikeCount } from '../actions/updateLikeCount';
import localImg from '../config/localImgConfig';
import Constants from '../utilities/Constants';
import '../css/LikeIcon.css';


export class LikeIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbLike: parseInt(this.props.item.nbLike, 10)
        };

        this.hasBeenLiked = () => {
            this.setState({
                nbLike: this.state.nbLike+1
            });

            this.props.updateLikeCount({
                itemType: this.props.item.type,
                itemId: this.props.item.id
            });

            this.props.item.nbLike = parseInt(this.props.item.nbLike, 10) + 1;
        };
    }

    render () {
        return (
            <div className='likeIconContainer'>
                <img 
                    className='likeIcon' 
                    src={localImg.likeItemIcon} 
                    alt={Constants.alt.likeIcon} 
                    onClick={this.hasBeenLiked}
                />
                <div className='likeIconLabel'>{this.state.nbLike}</div>
            </div>
        )
    }

}
const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        updateLikeCount: (body) => dispatch(updateLikeCount(body))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LikeIcon);