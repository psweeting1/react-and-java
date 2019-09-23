import React from 'react';
import TodoDataService from '../../axis/todo/TodoDataService';
import AuthenticationService from './AuthenticationService.js';

class ListTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            message : '',
            error : false
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.refreshTodo = this.refreshTodo.bind(this);
    }

    componentDidMount() {
       this.refreshTodo();
    }

    refreshTodo() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log(response);
                this.setState({
                    todos : response.data,
                })
            }
        )
        .catch(
            error => {
                this.setState({error : true})
            }
        )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
        .then (
            response => {
                this.setState({
                    message : `Remove ${id}, nice one`,
                    error : false
                })
                this.refreshTodo();
            }
        )
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`)
    }
    
        render () {
            return <div>
                <h1>List to do</h1>
                {this.state.message && <div className="is-primary">{this.state.message}</div>}
                {this.state.error && <div className="is-primary">No connection to database</div>}
                <table className="table">
                    <thead className="thead">
                        <tr className="row">
                            <td>id</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody className="content">
                    {this.state.todos.map(
                    todo => 
                        <tr className="row" key={todo.id}>
                            <td className="cell">{todo.id}</td>
                            <td className="cell">{todo.username}</td>
                            <td className="cell">{todo.description}</td>
                            <td className="cell">{todo.targetDate}</td>
                            <td><button className="button is-primary" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                            <td><button className="button is-danger" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        }
    }

export default ListTodoComponent;