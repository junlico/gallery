import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavLink from './components/NavLink';
import Galleries from './components/Galleries';
import './style.css';

const api_url = 'http://localhost:3001/api'

class App extends Component {

    render() {
        return (
            <Router>
                <div className="container">
                    <h1>Gallery</h1>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item"><NavLink to='/galleries'>Galleries</NavLink></li>
                        <li className="nav-item"><NavLink to='/images'>Images</NavLink></li>
                        <li className="nav-item"><NavLink to='/artists'>Artists</NavLink></li>
                    </ul>

                    <Route exact path='/galleries' render={() => (
                        <Galleries
                            api={api_url+'/galleries'}
                        />
                    )}/>
                </div>
            </Router>
        )
    };
};

ReactDOM.render(<App/>, document.getElementById('root'));