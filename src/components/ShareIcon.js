import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateShareCount } from '../actions/updateShareCount';
import localImg from '../config/localImgConfig';
import Constants from '../utilities/Constants';
import '../css/ShareIcon.css';


export class ShareIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nbShare: parseInt(this.props.item.nbShare, 10)
        };
        this.shareOnTwitter = () => {
            let url,
                text;

            switch (this.props.item.type) {
                case Constants.itemTypes.POETRY:
                    url  = this.props.item.shareUrl;
                    text = Constants.shareOnTwitterDefault;
                    break;
                case Constants.itemTypes.NEWS:
                    url  = Constants.menuUrls.news;
                    text = this.props.item.newsDescription.replace(/<br \/>/g, '');
                    break;
                case Constants.itemTypes.BOOK:
                    url  = this.props.item.shareUrl;
                    text = this.props.item.shortDescription.replace(/<br \/>/g, '');
                break;
                default:
                    text = Constants.shareOnTwitterDefault;
            };
        
            this.setState({
                nbShare: this.state.nbShare + 1
            });

            this.props.item.nbShare = parseInt(this.props.item.nbShare, 10) + 1;
           
            this.props.updateShareCount({
                itemType: this.props.item.type,
                itemId: this.props.item.id
            });

            window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
        }
    }

    render () {
        return (
            <div className='shareIconContainer'>
                <img 
                    className='shareIcon'
                    src={localImg.shareIconBlack} 
                    alt={Constants.alt.shareIcon} 
                    onClick={this.shareOnTwitter}
                />
                <div className='shareIconLabel'>{this.state.nbShare}</div>
            </div>
        )
    }

}
const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        updateShareCount: (body) => dispatch(updateShareCount(body))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShareIcon);