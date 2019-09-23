import React from 'react';
import { Route, Redirect} from "react-router-dom";
import AuthenticationService from './AuthenticationService.js';

class AuthenticatedRoute extends React.Component {
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            console.log('AuthenticatedRoute User is logged in');
            return <Route {...this.props}/>
        } else {
            console.log('AuthenticatedRoute User is not logged in');
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute