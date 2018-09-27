import React, { Component } from "react";
import Loading from '../components/Loading';
import StoreUrls from '../config/storeUrls';
import ErrorMessage from './ErrorMessage';
import Tools from '../utilities/Tools';

export class Redirect extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            completed: false,
            url: null
        };
    }

    componentWillMount() {
        let url    = null;
        const path = this.props.location.pathname;
        
        if (path.indexOf('websafetitle') !== -1) {
            const id1 = path.indexOf('websafetitle');

            if (path.indexOf('&store') !== -1) {
                const id2 = path.indexOf('&store');
                const websafetitle = path.substring(id1 + 13, id2);
                const store = path.substr(id2 + 7);
                const key = websafetitle + '.' + store;
                url = Tools.getValue(StoreUrls, key);

                if (url) {
                    this.setState({
                        completed: true,
                        url: url
                    });

                    window.open(url, '_blank');
                    this.props.history.goBack();
                } else {
                    this.setState({
                        completed: true
                    });
                }
            }
        }
    }

    render() {
        let toBeRendered = null;
        if (!this.state.completed) {
            toBeRendered = <Loading config={this.props.config}/>
        } else if (this.state.completed && !this.state.url) {
            toBeRendered = <ErrorMessage 
                                title={this.props.config.author} 
                                message={this.props.config.redirectErrorMessage}
                            />
        }

        return (
            <div>
                {toBeRendered}
            </div>
        )
    }
}

export default Redirect;