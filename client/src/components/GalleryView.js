import React, { Component } from 'react';
import axios from 'axios';
import MenuButton from './MenuButton';
import ImageGallery from 'react-image-gallery';
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
        this.editPhoto = this.editPhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.getDefaultValue = this.getDefaultValue.bind(this);
        this.onClick = this.onClick.bind(this);
    };


    loadPhotos() {

        this.setState({ loading: true });

        axios.get(base_url+this.props.match.url)
        .then(res => {
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
    };


    editPhoto({formData}) {
        if (this.state.gallery.photos && this.state.gallery.photos.length > 0) {
            let index = this.refs.photos.getCurrentIndex();
            let photo_id = this.state.gallery.photos[index]._id;

            this.setState({ loading: true });

            axios.put(base_url+this.props.match.url+'/'+photo_id, formData)
            .then(res => {
                this.setState({
                    gallery: res.data,
                    loading: false
                });
            });
        };
    };

    deletePhoto() {
        if (this.state.gallery.photos && this.state.gallery.photos.length > 0) {
            let index = this.refs.photos.getCurrentIndex();
            let photo_id = this.state.gallery.photos[index]._id;

            this.setState({ loading: true });

            axios.delete(base_url+this.props.match.url+'/'+photo_id)
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
        let photo = this.state.gallery.photos[index];
        return photo;
    }

    onClick(event) {
        console.log(event.target)
    }

    componentDidMount() {
        this.loadPhotos();
    };


    render() {
        // console.log(this.state.gallery)

        if (this.refs.photos) {
            console.log(this.refs.photos)
        }

        return (
            <div>
                <MenuButton
                    ref="buttons"
                    schema={schema}
                    create={this.createPhoto}
                    edit={this.editPhoto}
                    delete={this.deletePhoto}
                    editTrigger={this.getDefaultValue}
                    buttonList={
                        [
                            { buttonName: "Add Photo", buttonClass: "menu btn btn-info" },
                            { buttonName: "Edit Photo", buttonClass: "menu btn btn-warning" },
                            { buttonName: "Delete Photo", buttonClass: "menu btn btn-danger" }
                        ]
                    }
                />

                <div>
                { this.state.loading || (this.state.gallery.photos && this.state.gallery.photos.length === 0) ?
                    <img src={LoadingGif} alt="LoadingGIF" />
                    :
                    <div className="row">
                        <ImageGallery
                            ref="photos"
                            items={this.state.gallery.photos}
                            thumbnailPosition="left"
                            onClick={this.onClick}
                        />
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">TEST</h4>
                                <p className="card-text"> This is TEST Infokdjj</p>
                            </div>
                        </div>

                    </div>
                }
                </div>
            </div>
        )
    };
}