import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavLink from './components/NavLink';
import Galleries from './components/Galleries';
import Artists from './components/Artists';
import GalleryView from './components/GalleryView/GalleryView';
import ArtistView from './components/ArtistView';
import PhotoView from './components/PhotoView';
import './style.css';

const API_URL = 'http://localhost:3001/api';

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

                    <Route exact path='/galleries' render={props =>
                        <Galleries api={API_URL} {...props}/>
                    }/>

                    <Route exact path='/artists' render={props =>
                        <Artists api={API_URL} {...props}/>
                    }/>


                    <Route path='/galleries/:gallery_id' render={props => <GalleryView api={API_URL} {...props}/>}/>
                    <Route path='/artists/:artist_id' render={props => <ArtistView api={API_URL} {...props}/>}/>
                    <Route path='/photos' render={props => <PhotoView api={API_URL} {...props}/>}/>
                </div>
            </Router>
        )
    };
};

ReactDOM.render(<App/>, document.getElementById('root'));