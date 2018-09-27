import React, { Component } from 'react';
import {
    Route,
    NavLink,
    Switch,
    HashRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchConfig } from '../actions/updateConfig';
import { windowPosition } from '../actions/windowPosition';
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
import '../css/Navigation.css';

export class Navigation extends Component {
    constructor(props) {
        super(props);

        this.redirect = (props) => {
            return (
                <Redirect {...props}/>
            );
        };

        this.isActive = (path) => {
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
            console.log('[Navigation] Lang switch');
            this.props.fetchConfigData(switchTo);
        };

        this.openAuthorTwitter = () => {
            Tools.openAuthorTwitterPage();
        };
    }

    render() {        
        const switchTo = (this.props.configData.lang === Constants.lang.fr.short) ? Constants.lang.en.short : Constants.lang.fr.short;
        let header     = this.props.configData.header;

        return (
            <HashRouter>
                <div className='mainNavigation'>
                    <div className='header'>
                        <ul className='mainMenu'>
                            <li>
                                <NavLink 
                                    to={header.home.path} 
                                    isActive={() => this.isActive(header.home.path)} 
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.home.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.library.path}
                                    isActive={() => this.isActive(header.library.path)} 
                                    activeStyle={{ color: this.props.viewTitleTheme.color }}
                                >
                                    {header.library.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.poetry.path}
                                    isActive={() => this.isActive(header.poetry.path)} 
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.poetry.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.news.path}
                                    isActive={() => this.isActive(header.news.path)} 
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.news.text}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={header.contact.path}
                                    isActive={() => this.isActive(header.contact.path)} 
                                    activeStyle={{color: this.props.viewTitleTheme.color}}
                                >
                                    {header.contact.text}
                                </NavLink>
                            </li>    
                        </ul>

                        <div className='navOptions'>
                            <p 
                                className='navLang' 
                                onClick={() => this.setLang(switchTo)}
                                style={{color: this.props.viewTitleTheme.color}}
                            >
                                {switchTo}
                            </p>
                            <img                                 
                                alt='twitterLogo' 
                                className='twitterLogo' 
                                src={localImg.twitterLogo}
                                onClick={() => this.openAuthorTwitter()}
                            />
                        </div>
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
        )
    }
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConfigData: (newLang) => dispatch(fetchConfig(newLang)),
        setWindowPosition: (pos) => dispatch(windowPosition(pos))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);