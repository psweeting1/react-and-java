import React from 'react';
import Moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TodoDataService from '../../axis/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js';

class TodoComponent extends React.Component {

    constructor(props) {
        super (props)
        this.state = {
            id : this.props.match.params.id,
            username : 'Please enter a username',
            description : 'Enter a brief description',
            targetDate : Moment(new Date ()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodos(username, this.state.id)
        .then(response => this.setState ({
            username: response.data.username,
            description: response.data.description,
            targetDate: Moment(new Date ()).format('YYYY-MM-DD')
        }))
    }

    validate(values) {
        let errors = {description: ''}
        let valid = true;

         //Validate username input fields
         if(!values.username) {
            errors.username = 'This feild cannot be empty'
            valid = false;
        } else {
            errors.username = ""
            valid = true;
        }

        //Validate description input fields
        if(!values.description || values.description.length <= 5) {
            errors.description = 'Please enter at least 5 characters In description'
            valid = false;
        } else {
            errors.description = ""
            valid = true;
        }

        //Validate date input fields
        if(!Moment(values.targetDate).isValid()) {
            errors.targetDate = "Please enter a valid date"
            valid = false;
        } else {
            valid = true;
        }

        if (valid === true) {
            this.onSubmit(values);
        }
        
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.updateTodo(username, this.state.id, {
            id: this.state.id,
            username: values.username,
            description: values.description,
            targetDate: values.targetDate
        })
    }

    render () {
        let {username, description, targetDate} = this.state
        return <div>
            <h1>Todo Form</h1>
            <div className="form">
                <Formik
                initialValues={{ username, description,targetDate}}
                validateOnChange = {false}
                validateOnBlur = {false}
                validate={this.validate}
                enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <div className="column">
                                <div className="field">
                                    <label className="label">Username</label>
                                        <div className="control">
                                            <Field className="input" type="text" name="username"/>
                                            <ErrorMessage name="username" component="p" className="help is-danger"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                    <label className="label">Description</label>
                                        <div className="control">
                                            <Field className="input" type="text" name="description"/>
                                            <ErrorMessage name="description" component="p" className="help is-danger"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                    <label className="label">Date</label>
                                        <div className="control">
                                        <Field className="input" type="date" name="targetDate"/>
                                        <ErrorMessage name="targetDate" component="p" className="help is-danger"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="button is-primary">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    }
}

export default TodoComponent;