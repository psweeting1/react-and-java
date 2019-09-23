import React from 'react';

class ErrorPage extends React.Component {
    render () {
        return <div>
                    <h1 className="is-size-1-desktop">ERROR!</h1>
                    <p>Whoops! This isn't right, let's get you home</p>
                    <button className="button is-primary">Back home</button>
                </div>
            }
        }

export default ErrorPage