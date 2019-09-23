import React from 'react';
import { Link } from "react-router-dom";

class LogoutComponent extends React.Component {
    render () {
        return <div>
                <p>You have been logged out, that's cool and all.</p>
                <Link to="/login"><button className="button">Log back in</button></Link>
            </div>
    }
}

export default LogoutComponent