import React from 'react';
import AuthenticationService from '../todo/AuthenticationService';
import { Link } from "react-router-dom";

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUserLoggedIn : AuthenticationService.isUserLoggedIn()
        }
    }

    render () {
        return  ( <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo"/>
                        </Link>

                        <Link to="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </Link>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">
                                Home
                            </Link>
                            <Link to="/todo" className="navbar-item">
                                Todo
                            </Link>
                        </div>
                    </div>

                
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/login">
                            {!this.state.isUserLoggedIn && <button className="button">Log in</button>}
                        </Link>
                        <Link to="/logout" className="navbar-item">
                            {this.state.isUserLoggedIn && <button className="button" onClick={AuthenticationService.logout}>Log out</button>}
                        </Link>
                    </div>
                </nav>
        )
    }
}

export default Navigation