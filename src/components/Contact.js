import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendContactMail } from '../actions/sendContactMail';
import { currentViewChanged } from '../actions/currentView';
import Constants from '../utilities/Constants';
import viewTypes from '../types/viewTypes';
import Tools from '../utilities/Tools';
import AppButton from './AppButton';
import Footer from './Footer';
import Promo from './Promo';
import Hero from './Hero';
import '../css/Contact.css';

export class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            name: null,
            subject: null,
            message: null,
            validEmail: false,
            validSubject: false,
            validMessage: false,
            hasEmptyFields: false,
            emailSumbit: false,
            hasFailed: false,
            hasSucceed: false
        };

        this.mailInputUpdate = (e) => {
            let input = e.target.value;
            let validEmail = this.isValidEmailAdress(input);

            this.setState({
                validEmail: validEmail,
                email: input
            })
            this.resetSubmitState();
        };

        this.isValidEmailAdress = (address) => {
            let regEx = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            return regEx.test(address);
        };

        this.submitForm = (e) => {
            e.preventDefault();
            let formHasEmptyFields = this.hasEmptyFields();

            this.setState({
                hasEmptyFields: formHasEmptyFields
            })
        
            if (this.isValidForm()) {
                this.setState({
                    emailSumbit: true
                });

                this.props.sendMail({
                    name: this.state.name,
                    email: this.state.email,
                    subject: this.state.subject,
                    message: this.state.message
                });
            }
        };

        this.showViewInfo = () => {
            let message = this.props.configData.contact.message;
            return {__html: message};
        };

        this.nameInputUpdate = (e) => {
            this.setState({
                name: e.target.value
            })
            this.resetSubmitState();
        };
        
        this.subjectInputUpdate = (e) => {
            let input        = e.target.value;
            let validSubject = (input.length > Constants.nbCharacters) ? true : false
            
            this.setState({
                subject: input,
                validSubject: validSubject
            })
            this.resetSubmitState();
        };
        
        this.messageInputUpdate = (e) => {
            let input        = e.target.value;
            let validMessage = (input.length > Constants.nbCharacters) ? true : false
            
            this.setState({
                message: input,
                validMessage: validMessage
            })
            this.resetSubmitState();
        };
        
        this.isValidForm = () => {
            return !this.state.hasEmptyFields && this.state.validEmail && this.state.validMessage && this.state.validSubject;
        };

        this.setSubmitCompleteMessage = (success) => {
            let message = (success) ? this.props.configData.contact.complete.success : this.props.configData.contact.complete.failure;
            if (success) {
                this.clearInput();
            }
            return {__html: message};
        };

        this.clearInput = () => {
            this.refs.name.value    = '';
            this.refs.email.value   = '';
            this.refs.subject.value = '';
            this.refs.message.value = '';
        };

        this.onSuccess = () => {
            this.setState({
                email: null,
                name: null,
                subject: null,
                message: null,
                validEmail: false,
                validSubject: false,
                validMessage: false,
                hasEmptyFields: false,
                emailSumbit: false,
                hasFailed: false,
                hasSucceed: true
            });
        };
        
        this.onFailure = () => {
            this.setState({
                validEmail: false,
                validSubject: false,
                validMessage: false,
                hasEmptyFields: false,
                emailSumbit: false,
                hasFailed: true,
                hasSucceed: false
            })
        };

        this.showSubmitCompleteMessage = () => {
            let submitCompleteContainer;

            if (this.state.hasSucceed) {
                submitCompleteContainer = <div className='submitMessage' style={{color: this.props.viewTitleTheme.color}} dangerouslySetInnerHTML={this.setSubmitCompleteMessage(true)}></div>
            } else if (this.state.hasFailed) {
                submitCompleteContainer = <div className='submitMessage' style={{color: this.props.viewTitleTheme.color}} dangerouslySetInnerHTML={this.setSubmitCompleteMessage(false)}></div>
            }
            return submitCompleteContainer;
        };
        
        this.showEmailErrorMessage = () => {
            let emailErrorMessage;
        
            if (this.state.email && !this.state.validEmail) {
                emailErrorMessage = <div className='emailError' style={{color: this.props.viewTitleTheme.color}}>{this.props.configData.formValidation.email}</div>
            }
            return emailErrorMessage;
        };
        
        this.showSubjectErrorMessage = () => {
            let subjectErrorMessage;

            if (this.state.subject && !this.state.validSubject) {
                subjectErrorMessage = <div className='subjectError' style={{color: this.props.viewTitleTheme.color}}>{this.props.configData.formValidation.length}</div>
            }
            return subjectErrorMessage;
        };
        
        this.showMainErrorMessage = () => {
            let mainErrorMessage;

            if (this.state.hasEmptyFields) {
                mainErrorMessage = <div className='mainError'>{this.props.configData.formValidation.empty}</div>
            }
            return mainErrorMessage;
        };

        this.resetSubmitState = () => {
            if (this.state.hasFailed || this.state.hasSucceed) {
                this.setState({
                    hasFailed: false,
                    hasSucceed: false
                })
            }
        };
        
        this.showErrorMessage = () => {
            let errorMessage;

            if (this.state.message && !this.state.validMessage) {
                errorMessage = <div className='messageError' style={{color: this.props.viewTitleTheme.color}}>{this.props.configData.formValidation.length}</div>
            }
            return errorMessage;
        };

        this.hasEmptyFields = () => {
            return !this.state.email || !this.state.name || !this.state.subject || !this.state.message;
        };
    }
    
    componentDidMount() {
        this.props.setCurrentView(viewTypes.CONTACT);
    }

    componentDidUpdate() {
        let successfullySend = this.state.emailSumbit && !Tools.isEmptyObj(this.props.sendContactMailHasFailed) && !this.props.sendContactMailHasFailed.error;
        let failToSend       = this.state.emailSumbit && !Tools.isEmptyObj(this.props.sendContactMailHasFailed) && this.props.sendContactMailHasFailed.error;
        if (successfullySend) {
            this.onSuccess();
        } else if (failToSend) {
            this.onFailure();
        }
    }

    render () {
        let submitCompleteContainer = this.showSubmitCompleteMessage(),
            mainErrorMessage        = this.showMainErrorMessage(),
            emailErrorMessage       = this.showEmailErrorMessage(),
            subjectErrorMessage     = this.showSubjectErrorMessage(),
            errorMessage            = this.showErrorMessage();

        return (
            <div className='contact'>
                <div className='contactContainer'>
                    <Hero viewTitle={this.props.configData.viewTitle.contact} viewSecondaryTitle={this.props.configData.contact.secondaryTitle}/>
                    <Promo />
                    <div className='contactContent'>
                        <div className='viewInfo' dangerouslySetInnerHTML={this.showViewInfo()}></div>
                        {mainErrorMessage}
                        {submitCompleteContainer}
                        <div className='formContainer'>
                            <form className='form' method='post' action=''>
                                <div className='nameContainer'>
                                    <input 
                                        className='name'  
                                        ref='name' 
                                        type='text' 
                                        id='name' 
                                        name='name' 
                                        placeholder={this.props.configData.contact.fields.name} 
                                        onChange={this.nameInputUpdate}
                                    />
                                </div>      
                                <div className='emailContainer'>
                                    <input 
                                        className='email'  
                                        ref='email' 
                                        type='text' 
                                        id='email' 
                                        name='email' 
                                        placeholder={this.props.configData.contact.fields.email} 
                                        onChange={this.mailInputUpdate}
                                    />
                                    {emailErrorMessage}
                                </div>
                                <div className='subjectContainer'>
                                    <input 
                                        className='subject' 
                                        ref='subject' 
                                        type='text' 
                                        id='subject' 
                                        name='subject' 
                                        placeholder={this.props.configData.contact.fields.subject} 
                                        onChange={this.subjectInputUpdate}
                                    /> 
                                    {subjectErrorMessage}
                                </div>
                                <div className='messageContainer'>
                                    <textarea 
                                        className='message' 
                                        ref='message' 
                                        type='text' 
                                        id ='message' 
                                        name='message' 
                                        placeholder={this.props.configData.contact.fields.message} 
                                        rows='10' 
                                        onChange={this.messageInputUpdate}
                                    />
                                    {errorMessage} 
                                </div>
                                <div className='contactSubmitContainer'>
                                    <AppButton 
                                        text={this.props.configData.contact.fields.submit} 
                                        color={Constants.appColor.black} 
                                        value={this.props.configData.contact.fields.submit} 
                                        name='submit' onClick={this.submitForm}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (view) => dispatch(currentViewChanged(view)),
        sendMail: (body) => dispatch(sendContactMail(body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);