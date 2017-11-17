import React, { Component } from 'react';
import axios from 'axios';
import MenuButton from '../MenuButton';
import ImageGallery from 'react-image-gallery';
import LoadingGif from '../../assets/Spinner.gif';
import './image-gallery.css'
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


const uiSchema = {
    "ui:order": ["title",  "artist_id", "original","width", "height", "year", "location", "description"],
    title: { classNames: "col-6 left" },
    artist_id: { classNames: "col-6 right" },
    original: { classNames: "col-6 left" },
    width:{ classNames: "col-6 right" },
    height:{ classNames: "col-6 right"},
    year:{ classNames: "col-6 left" },
    location:{ classNames: "col-6 right"},
    description: {
        "ui:widget": "textarea"
    }
}
export default class GallerView extends Component {

    constructor(props) {
        super(props);
        this.state ={
            gallery: {},
            photoVisible: true,
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
                gallery: res.data,
                loading: false
            })
        });
    };


    createPhoto({formData}) {
        this.setState({ loading: true });

        axios.post(this.props.api + this.props.location.pathname, formData)
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

    componentDidMount() {
        this.loadPhotos();
    };


    showGallery() {
        this.setState({ photoVisible: true });
    }

    hideGallery() {
        this.setState({ photoVisible: false });
    }

    render() {

        return (
            <div className="GalleryView">
                <MenuButton
                    schema={schema}
                    uiSchema={uiSchema}
                    create={this.createPhoto}
                    edit={this.editPhoto}
                    photoInfo={this.getDefaultValue}
                    delete={this.deletePhoto}
                    buttonList={
                        [
                            { buttonName: "Add Photo", buttonClass: "menu btn btn-info", buttonType: 0 },
                            { buttonName: "Show Details", buttonClass: "menu btn btn-success", buttonType: 1 },
                            { buttonName: "Delete Photo", buttonClass: "menu btn btn-danger", buttonType: 2 },
                        ]
                    }
                />

                {this.state.loading &&
                    <img src={LoadingGif} alt="LoadingGIF" />
                }

                {this.state.photoVisible &&
                    <div className="ImageGallery">
                        <ImageGallery
                            ref="photos"
                            items={this.state.gallery.photos}
                            thumbnailPosition="left"
                        />
                    </div>
                }
            </div>
        )
    };
}

