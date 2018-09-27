import React, { Component } from 'react';
import {
    NavLink,
    HashRouter,
    Switch,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { menuIsExpanded } from '../actions/menuIsExpanded';
import { fetchConfig } from '../actions/updateConfig';
import localImg from '../config/localImgConfig.js';
import BookDescription from './BookDescription';
import Constants from '../utilities/Constants';
import PoetryFullText from './PoetryFullText';
import Tools from '../utilities/Tools';
import AppPolicy from './AppPolicy';
import Redirect from './Redirect';
import Contact from './Contact';
import Poetry from './Poetry';
import Books from './Books';
import Home from './Home';
import News from './News';
import '../css/MobileNavigation.css';

export class MobileNavigation extends Component {
    constructor(props) {
        super(props);

        this.redirect = (props) => {
            return (
                <Redirect config={this.props.config} {...props}/>
            );
        };

        this.isActive = path => {
            let hash = '#' + path;
            let locationHash = this.props.history.location.hash

            if (locationHash === hash) {
                return true;
            } else if ((path !== '/') && (locationHash.indexOf(path) !== -1)) {
                return true;
            } else {
                return false;
            }
        };

        this.setLang = (switchTo) => {
            console.log('[MobileNavigation] Lang switch');
            this.props.fetchConfigData(switchTo);
            this.showContent();
        };

        this.expandMenu = () => {
            this.props.setMenuState(true);
        };

        this.showContent = () => {
            this.props.setMenuState(false);
        };

        this.openAuthorTwitter = () => {
            Tools.openAuthorTwitterPage();
        };

        this.renderNavigation = () => {
            const switchTo = (this.props.configData.lang === Constants.lang.fr.short) ? Constants.lang.en.short : Constants.lang.fr.short;
            let header     = this.props.configData.header;

            return (
                <HashRouter>   
                    <div className='mobileNavigation'>
                        <ul className='mobileMainMenu'>
                            <h1>{this.props.configData.author}</h1>
    
                            <div className='mobileNavOptions'>
                                <p 
                                    className='mobileNavLang' 
                                    onClick={() => this.setLang(switchTo)}
                                    style={{color: this.props.viewTitleTheme.color}}
                                >
                                    {switchTo}
                                </p>
                                <img
                                    alt='twitterLogo' 
                                    src={localImg.twitterLogo}
                                    className='mobileNavTwitterLogo' 
                                    onClick={() => this.openAuthorTwitter()}
                                />
                            </div>
    
                            <img 
                                alt='close' 
                                className='close' 
                                src={localImg.close} 
                                onClick={() => this.showContent()}
                            />
                            
                            <li>
                                <NavLink 
                                    to={header.home.path} 
                                    onClick={() => this.showContent()} 
                                    isActive={() => this.isActive(header.home.path)}
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.home.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.library.path} 
                                    onClick={() => this.showContent()} 
                                    isActive={() => this.isActive(header.library.path)}
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.library.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.poetry.path} 
                                    onClick={() => this.showContent()} 
                                    isActive={() => this.isActive(header.poetry.path)}
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.poetry.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.news.path} 
                                    onClick={() => this.showContent()} 
                                    isActive={() => this.isActive(header.news.path)}
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.news.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.contact.path} 
                                    onClick={() => this.showContent()} 
                                    isActive={() => this.isActive(header.contact.path)}
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.contact.text}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </HashRouter>
            )
        };
    }

    render () {
        let header         = this.props.configData.header;
        let renderMenuIcon = 
            <HashRouter>
                <div className='mainMobileContainer'>
                    <div className='navigation'>
                        <img 
                            className='menuIcon'
                            alt='menuIcon' 
                            src={localImg.menuIcon} 
                            onClick={() => this.expandMenu()}
                        />
                        <p className='menuTitle'>{this.props.configData.author}</p>
                    </div>

                    <div className='content'>
                        <Switch>
                            <Route exact path={header.home.path} component={Home}/>
                            <Route exact path={header.library.path} component={Books}/>
                            <Route exact path={header.poetry.path} component={Poetry}/>
                            <Route exact path={header.news.path} component={News}/>
                            <Route exact path={header.contact.path} component={Contact}/>
                        </Switch>
                        <Route exact path='/library/excerpt/:customPath' component={BookDescription}/>
                        <Route exact path='/poetry/fulltext/:customPath' component={PoetryFullText}/>
                        <Route exact path='/redirect/:customPath' component={this.redirect}/>
                        <Route exact path='/cookiepolicy' component={AppPolicy}/>
                    </div>
                </div>
            </HashRouter>
        
        return (
            <div className='mainContainer'>
                {!this.props.menuIsExpanded ? renderMenuIcon : this.renderNavigation()}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => {
    return {
        setMenuState: (isExpanded) => dispatch(menuIsExpanded(isExpanded)),
        fetchConfigData: (newLang) => dispatch(fetchConfig(newLang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation);