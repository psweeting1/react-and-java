import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {

    //Setting the state of the counter value
    constructor(props) {
        super(props);
        this.state = {
            counter : 0
        }
        //Get increment function and mind it with the state
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }
    //First parmater get the this.props.increaseBy value
    increment (inc) {
        //prevState paramator for this.state
        this.setState (
            (prevState) => {
                return { counter: prevState.counter + inc}
            }
        )
    }
    decrement (inc) {
        //prevState paramator for this.state
        this.setState (
            (prevState) => {
                return { counter: prevState.counter - inc}
            }
        )
    }
    render () {
        return (
            <div className="counter">
                <CounterButton increaseBy={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton increaseBy={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton increaseBy={100} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <span className="count">{this.state.counter}</span>
                <button onClick={this.reset}>Reset</button>
            </div>
        )
    }

    reset() {
        this.setState (
            (prevState) => {
                return { counter: 0}
            }
        )
    }
}

class CounterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)

    }
    increment () {
        this.setState (
            (prevState) => {
                return { counter: prevState.counter + this.props.increaseBy}
            }
        )
        //Gets called from parent counter, passing in increaseBy value
        this.props.incrementMethod(this.props.increaseBy);
    }
    decrement () {
        this.setState (
            (prevState) => {
                return { counter: prevState.counter - this.props.increaseBy}
            }
        )
        //Gets called from parent counter, passing in increaseBy value
        this.props.decrementMethod(this.props.increaseBy);
    }
    render () {
        return <div className="counter">
                    <h1>counter</h1>
                    <button onClick={this.increment}>+ {this.props.increaseBy}</button>
                    <button onClick={this.decrement}>- {this.props.increaseBy}</button>
                    <span className="count">{this.state.counter}</span>
                </div>
        }
    }

//Sets default value is no props is passed.
CounterButton.defaultProps = {
    increaseBy : 0
}

//Sets counter to only accept number
CounterButton.propTypes = {
    increaseBy : PropTypes.number
}

//Set the default function in the component. 
export default Counter;