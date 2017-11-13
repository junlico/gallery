import React, { Component } from 'react';
import axios from 'axios';
import MenuButton from './MenuButton';
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
            loading: false
        };

        this.loadPhotos = this.loadPhotos.bind(this);
        this.createPhoto = this.createPhoto.bind(this);
    };


    loadPhotos() {

        this.setState({ loading: true });

        axios.get(base_url+this.props.match.url)
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
                <MenuButton
                    refs="buttons"
                    schema={schema}
                    create={this.createPhoto}
                    buttonList={
                        [
                            { buttonName: "Add Photo", buttonClass: "menu btn btn-info" },
                            { buttonName: "Edit Photo", buttonClass: "menu btn btn-warning" },
                            { buttonName: "Delete Photo", buttonClass: "menu btn btn-danger" }
                        ]
                    }
                />

                { this.state.loading ?
                    <div>
                        <img src={LoadingGif} alt="LoadingGIF" />
                    </div>
                    :
                    <div>
                    <PhotoGallery
                        refs="photos"
                        photos={this.state.gallery.photos}
                    />
                    </div>

                }
            </div>
        )
    };
}