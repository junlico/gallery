import React, { Component } from 'react';
import axios from 'axios';
import ButtonList from './ButtonList';
import PhotoGallery from './PhotoGallery';
import LoadingGif from '../assets/Spinner.gif';

const base_url = 'http://localhost:3001/api';

const schema = {
    type: "object",
    required: ["title", "original"],
    properties: {
        title: {type: "string", title: "Title"},
        original: {type: "string", title: "Link"},
        artist_id: {type: "string", title: "Artist_id"},
        year: {type: "number", title: "Year"},
        width: {type: "number", title: "Width"},
        height: {type: "number", title: "Height"},
        location: {type: "string", title: "Location"},
        description: {type: "string", title: "Description"}
    }
};

export default class GallerView extends Component {

    constructor(props) {
        super(props);

        this.state ={
            gallery: {},
            photos: [],
            loading: false
        };

        this.loadPhotos = this.loadPhotos.bind(this);
        this.createPhoto = this.createPhoto.bind(this);
    };


    loadPhotos() {

        this.setState({ loading: true });

        axios.get(base_url+this.props.match.url)
        // axios.get('http://localhost:3001/api/galleries/5a09c1c63629e02fc4d4c724')
        .then(res => {
            // console.log(res.data.photos)
            this.setState({
                gallery: res.data,
                loading: false
            })
        });
    };

    createPhoto({formData}) {
        this.setState({ loading: true });

        axios.post(base_url+this.props.match.url, formData)
        .then(res => {
            this.setState({
                gallery: res.data,
                loading: false
            });
        });
    }

    componentDidMount() {
        this.loadPhotos();
    };


    render() {
        return (
            <div>
                <ButtonList
                    buttonName={["Add Photo"]}
                    schema={schema}
                    onSubmit={this.createPhoto}
                />

                { this.state.loading ?
                    <div>
                        <img src={LoadingGif} alt="LoadingGIF" />
                    </div>
                    :
                    <div>
                    <PhotoGallery
                        photos={this.state.gallery.photos}
                    />
                    </div>

                }
            </div>
        )
    };
}