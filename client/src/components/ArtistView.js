import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import LoadingGif from '../assets/Spinner.gif';



export default class ArtistView extends Component {

    constructor(props) {
        super(props);
        this.state ={
            artist: {},
            loading: false
        };

        this.loadPhotos = this.loadPhotos.bind(this);
        this.createPhoto = this.createPhoto.bind(this);
        this.editPhoto = this.editPhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.getDefaultValue = this.getDefaultValue.bind(this);
    };


    loadPhotos() {

        this.setState({ loading: true });

        axios.get(this.props.api + this.props.location.pathname)
        .then(res => {
            this.setState({
                artist: res.data,
                loading: false
            })
        });
    };


    createPhoto({formData}) {
        this.setState({ loading: true });

        axios.post(this.props.api + this.props.location.pathname, formData)
        .then(res => {
            this.setState({
                artist: res.data,
                loading: false
            });
        });
    };


    editPhoto({formData}) {
        if (this.state.artist.photos && this.state.artist.photos.length > 0) {
            let index = this.refs.photos.getCurrentIndex();
            let photo_id = this.state.artist.photos[index]._id;

            this.setState({ loading: true });

            axios.put(this.props.api + this.props.location.pathname+'/'+photo_id, formData)
            .then(res => {
                this.setState({
                    artist: res.data,
                    loading: false
                });
            });
        };
    };

    deletePhoto() {
        if (this.state.artist.photos && this.state.artist.photos.length > 0) {
            let index = this.refs.photos.getCurrentIndex();
            let photo_id = this.state.artist.photos[index]._id;

            this.setState({ loading: true });

            axios.delete(this.props.api + this.props.location.pathname+'/'+photo_id)
            .then(res => {
                this.setState({
                    gallery: res.data,
                    loading: false
                })
            });
        };
    };

    getDefaultValue() {
        let index = this.refs.photos.getCurrentIndex();
        let photo = this.state.artist.photos[index];
        return photo;
    }



    componentDidMount() {
        this.loadPhotos();
    };


    render() {

        return (
            <div className="View">
                { this.state.loading || (this.state.artist.photos && this.state.artist.photos.length === 0) ?
                    <img src={LoadingGif} alt="LoadingGIF" />
                    :
                    <ImageGallery
                        ref="photos"
                        items={this.state.artist.photos}
                        thumbnailPosition="left"
                    />
                }
            </div>
        )
    };
}