import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateViewsCount } from '../actions/updateViewsCount';
import '../css/PoetryReadMore.css';

export class PoetryReadMore extends Component {
    constructor(props) {
        super(props);

        this.wasViewed = () => {
            this.props.updateViewsCount({
                itemType: this.props.item.type,
                itemId: this.props.item.id
            });
        }
    }
    render () {
        let path = '/poetry/fulltext/' + this.props.item.websafetitle +'-poetryId-' + this.props.item.poetryId;  
        return (
            <div className='poetryReadMore'>
                <Link 
                    to={path} 
                    className='poetryReadMoreLink' 
                    onClick={this.wasViewed}>{this.props.text}
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
export default connect(mapStateToProps, mapDispatchToProps)(PoetryReadMore);