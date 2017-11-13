import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import NavLink from './components/NavLink';
// import Galleries from './components/Galleries';
// import GalleryView from './components/GalleryView';
// import Artists from './components/Artists';
// import ArtistView from './components/ArtistView';
// import './style.css';

class App extends Component {

    render() {
        return (
            <Router>
                <div className='container'>
                    <h1>Gallery</h1>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item"><NavLink to='/'>Galleries</NavLink></li>
                        <li className="nav-item"><NavLink to='/images'>Images</NavLink></li>
                        <li className="nav-item"><NavLink to='/artists'>Artists</NavLink></li>
                    </ul>

                    {/* <Route exact path='/' component={Galleries}/>
                    <Route path='/artists' component={Artists}/>
                    <Route path='/images' component={GalleryView}/>
                    <Route path='/artist/:artist_id' component={ArtistView}/> */}
                </div>
            </Router>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
