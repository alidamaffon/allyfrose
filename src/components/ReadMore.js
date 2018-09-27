import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateViewsCount } from '../actions/updateViewsCount';
import '../css/ReadMore.css';

export class ReadMore extends Component {
    constructor(props) {
        super(props);

        this.wasViewed = () => {
            this.props.updateViewsCount({
                itemType: this.props.item.type,
                itemId: this.props.item.id
            });
        };
    }

    render () {
        let path = '/library/excerpt/' + this.props.item.websafetitle +'-bookId-' + this.props.item.bookId; 
        return (
            <div className='readMore'>
                <Link 
                    to={path} 
                    className='readMoreLink' 
                    onClick={this.wasViewed}
                >
                    {this.props.text}
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        updateViewsCount: (body) => dispatch(updateViewsCount(body))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReadMore);
