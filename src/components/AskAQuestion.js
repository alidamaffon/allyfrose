import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/AskAQuestion.css';

export class AskAQuestion extends Component {
    render () {
        return (
            <div className='askAQuestion'>
                <Link 
                    to='/contact' 
                    className='askAQuestionLink'
                >
                    {this.props.configData.askAQuestion}
                </Link>
            </div>
        )
    }
}

export default connect(state => state)(AskAQuestion);