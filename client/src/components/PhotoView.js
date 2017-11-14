import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import LoadingGif from '../assets/Spinner.gif';


const base_url = 'http://localhost:3001/api';


export default class PhotoView extends Component {


    constructor(props) {
        super(props);
        this.state ={
            photos: [],
            loading: false
        };

        this.loadPhotos = this.loadPhotos.bind(this);
    };

    loadPhotos() {
        this.setState({ loading: true });

        axios.get(base_url+this.props.match.url)
        .then(res => {
            this.setState({
                photos: res.data,
                loading: false
            })
        });
    }

    componentDidMount() {
        this.loadPhotos();
    }

    render() {
        return (
            <div className="View">
                { this.state.loading || this.state.photos.length === 0 ?
                    <img src={LoadingGif} alt="LoadingGIF" />
                    :
                    <ImageGallery
                        items={this.state.photos}
                        thumbnailPosition="left"
                    />
                }
            </div>
        )
    }
};
