import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolicyData } from '../actions/policy';
import ErrorMessage from './ErrorMessage';
import Tools from '../utilities/Tools';
import Loading from './Loading';
import Footer from './Footer';
import Hero from './Hero';
import '../css/AppPolicy.css';

export class AppPolicy extends Component {
    constructor(props) {
        super(props);
        
        this.displayPolicy = () => {
            return {__html: this.props.policyData.data.policy};
        };
    }

    componentDidMount() {
        const lang = this.props.configData.lang;
        this.props.getPolicyData(lang);
    }

    render () {
        let screen;

        const hasFailed = this.props.policyLoadHasFailed || this.props.policyData.error || Tools.isEmptyObj(this.props.policyData.data);
        const hasSucceed = this.props.policyLoadIsCompleted && !Tools.isEmptyObj(this.props.policyData.data);

       if (this.props.policyIsLoading) {
            screen = <Loading loading={this.props.configData.loading}/>
        } else if (hasFailed) {
            screen = <ErrorMessage error={this.props.configData.defaultErrorDesc} />
        } else if (hasSucceed) {
            screen = <div className='appPolicyContainer'>
                        <Hero viewTitle={this.props.configData.footer.cookiePolicy}/> 
                        <div className='appPolicyContainerA'>
                            <div className='appPolicyContainerB'>
                                <div
                                    className='appPolicyContent'
                                    dangerouslySetInnerHTML={this.displayPolicy()}
                                />
                            </div>
                        </div>
                        <Footer/>       
                    </div>
        }


        return (
            <div className='appPolicy'>
                {screen}
            </div>
            
        )
    }

}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        getPolicyData: (lang) => dispatch(fetchPolicyData(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPolicy);