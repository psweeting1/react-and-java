import React from 'react';
import { Link } from "react-router-dom";
import HelloWorldService from '../../axis/todo/HelloWorldService.js'

class WelcomeComponent extends React.Component {
    constructor (props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)

        this.state = {
            welcomeMessage : '',
            welcomeName : this.props.match.params.name,
        }
    }

    render () {
        return <div>
                <p>Welcome {this.state.welcomeName}</p> 
                <p>Go to the todo list <Link to="/todo">here</Link></p>
                <div className="">
                    <p>Click here to get some custimised text</p> 
                    <button className="button" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                    <div>
                        {this.state.welcomeMessage}
                    </div>
                </div>
            </div>
    }
    retrieveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccessfulResponse(response))

        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.state.welcomeName)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response);
        this.setState({welcomeMessage : response.data.message})
    }

    handleError(error) {
        console.log(error);
        this.setState({welcomeMessage : error.response.data.message})
    }
}

export default WelcomeComponent