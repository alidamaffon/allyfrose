import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Constants from '../utilities/Constants';
import '../css/Footer.css';

export class Footer extends Component {
    render () {
        return (
            <div className='footerContainer'>
                <div className='footerBanner' style={{backgroundColor: this.props.viewTitleTheme.color}}></div>
                <div className='footerContent'>
                    <div className='footerQuickLinks'>
                        <div className='quickLinksTitle'>{this.props.configData.footer.quickLinks}</div>
                        <div className='bookPromoLinkContainer'>
                            <Link
                                    to='/library/excerpt/lesinfideles-bookId-1'
                                    className='bookPromoLink' 
                            >
                                {Constants.footerLinksTitle.lesinfideles}
                            </Link>
                        </div>
                        <div className='poetryPromoLinkContainer'>
                            <Link
                                    to='/poetry/fulltext/chronique-a-ma-rose-poetryId-1'
                                    className='poetryPromoLink' 
                            >
                                {Constants.footerLinksTitle.chronique}
                            </Link>
                        </div>
                    </div>
                    <div className='footerHelp'>
                        <div className='helpTitle'>{this.props.configData.footer.helpInfo}</div>
                        <div className='contactLinkContainer'>
                            <Link
                                to='/contact'
                                className='footerContactLink' 
                            >
                                {this.props.configData.footer.contact}
                            </Link>
                        </div>
                        <div className='policyLinkContainer'>
                            <Link 
                                to='/cookiepolicy'
                                className='cookPolicyLink' 
                            >
                                {this.props.configData.footer.cookiePolicy}
                            </Link>
                        </div>
                    </div>
                    <div className='copyright'>{this.props.configData.footer.copyright}</div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Footer);