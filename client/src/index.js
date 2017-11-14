import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavLink from './components/NavLink';
import Galleries from './components/Galleries';
import Artists from './components/Artists';
import GalleryView from './components/GalleryView';
import ArtistView from './components/ArtistView';
import PhotoView from './components/PhotoView';
import './style.css';

const base_url = 'http://localhost:3001/api'

class App extends Component {

    render() {
        return (
            <Router>
                <div className="container">
                    <h1>Gallery</h1>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item"><NavLink to='/galleries'>Galleries</NavLink></li>
                        <li className="nav-item"><NavLink to='/photos'>Photos</NavLink></li>
                        <li className="nav-item"><NavLink to='/artists'>Artists</NavLink></li>
                    </ul>

                    <Route exact path='/galleries' render={() => (
                        <Galleries
                            api={base_url+'/galleries'}
                        />
                    )}/>

                    <Route exact path='/artists' render={() => (
                        <Artists
                            api={base_url+'/artists'}
                        />
                    )}/>

                    <Route path='/galleries/:gallery_id' component={GalleryView}/>
                    <Route path='/artists/:artist_id' component={ArtistView}/>
                    <Route path='/photos' component={PhotoView}/>
                </div>
            </Router>
        )
    };
};

ReactDOM.render(<App/>, document.getElementById('root'));