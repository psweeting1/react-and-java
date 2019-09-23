import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js"
import AuthenticatedRoute from "./AuthenticationRoute"
import Navigation from "./../header/Navigation"
import Footer from "./../footer/Footer"
import ErrorPage from "./../error/error"
import WelcomeComponent from "./Welcome"
import LogoutComponent from "./LogoutComponent"
import ListTodoComponent from "./ListTodoComponent"
import TodoComponent from "./TodoComponent";

class TodoApp extends React.Component {
    render () {
        return <div className="todoApp">
                <Router forceRefresh={true}> 
                    <>
                        <Navigation/>
                            <div className="section">
                                <Switch>
                                    <Route path="/" exact component={LoginComponent}/>
                                    <Route path="/login" component={LoginComponent}/>
                                    <Route path="/logout" component={LogoutComponent}/>
                                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                                    <AuthenticatedRoute path="/todo" component={ListTodoComponent}/>
                                    <Route path="" component={ErrorPage}/>
                                </Switch>
                            </div>
                        <Footer/>
                    </>
                </Router>
        </div>
    }
}

class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            loginSuccessful: false,
            loginFailed: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }

    loginClick() {
        if (this.state.username === "foobar" && this.state.password === "password") {
            this.props.history.push(`/welcome/${this.state.username}`)
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
        } else {
            this.setState({loginSuccessful: false})
            this.setState({loginFailed: true})
        }
    }

    render () {
        return <div>
                <div className="columns">
                    <div className="column is-8">
                        <div className="field">
                            <div className="control has-text-centered">
                                <h1 className="is-size-3-desktop">Login Admin</h1>                                    
                                {this.state.loginFailed && <div><p className="tag is-danger">Your username or password is incorrect.</p></div>}
                                <label htmlFor="Username">Username</label>
                                <input className="input" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} required/>
                                <label htmlFor="Password">Password</label>
                                <input className="input" type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <button className="button is-primary" onClick={this.loginClick}>Login</button>
                    </div>
                </div>
            </div>
            }
        }

export default TodoApp;