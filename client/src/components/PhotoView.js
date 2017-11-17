import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import LoadingGif from '../assets/Spinner.gif';
import Form from "react-jsonschema-form";
import MenuButton from './MenuButton';

const schema = {
    type: "object",
    properties: {
        type: {type: "string", title: "Type"},
        create_year_gte: {type: "string", title: "Create Year, Greater Than"},
        create_year_lte: {type: "string", title: "Create Year, Less Than"},
        location: {type: "string", title: "Location"},
    }
};


const uiSchema = {
    "ui:order": ["create_year_gte",  "type", "create_year_lte", "location"],
    type: { classNames: "col-6 left" },
    create_year_gte: { classNames: "col-6 right" },
    create_year_lte: { classNames: "col-6 right" },
    location:{ classNames: "col-6 left"},
}


const schema1 = {
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


const uiSchema1 = {
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
export default class PhotoView extends Component {


    constructor(props) {
        super(props);
        this.state ={
            photos: [],
            loading: false
        };

        this.loadPhotos = this.loadPhotos.bind(this);
        this.getDefaultValue = this.getDefaultValue.bind(this);
        this.searchPhotos = this.searchPhotos.bind(this);
    };

    loadPhotos() {
        this.setState({ loading: true });

        axios.get(this.props.api + this.props.location.pathname)
        .then(res => {
            this.setState({
                photos: res.data,
                loading: false
            })
        });
    }

    searchPhotos({formData}) {
        axios.post(this.props.api + this.props.location.pathname, formData)
        .then(res => {
            this.setState({
                photos: res.data,
                loading: false
            })
        })
    }

    getDefaultValue() {
        let index = this.refs.photos.getCurrentIndex();
        let photo = this.state.photos[index];
        return photo;
    }
    componentDidMount() {
        this.loadPhotos();
    }

    render() {
        return (
            <div className="View">
                <MenuButton
                    schema={schema}
                    uiSchema={uiSchema}
                    create={this.searchPhotos}
                    delete={this.deletePhoto}
                    buttonList={
                        [
                            { buttonName: "Search By", buttonClass: "menu btn btn-info", buttonType: 0 },
                        ]
                    }
                />

                { this.state.loading || this.state.photos.length === 0 ?
                    <img src={LoadingGif} alt="LoadingGIF" />
                    :
                    <div className="ImageGallery">
                    <ImageGallery
                        ref="photos"
                        items={this.state.photos}
                        thumbnailPosition="left"
                    />
                    </div>
                }
            </div>
        )
    }
};

/*
const schema = {
    type: "object",
    required: ["title", "original"],
    properties: {
        title: {type: "string", title: "Title"},
        original: {type: "string", title: "Link"},
        artist_id: {type: "string", title: "Artist_id"},
        width: {type: "number", title: "Width"},
        height: {type: "number", title: "Height"},
        year: {type: "number", title: "Year"},
        location: {type: "string", title: "Location"},
        description: {type: "string", title: "Description"}
    }

};

const uiSchema = {
    "ui:order": ["title", "original", "artist_id", "width", "height", "year", "location", "description"],
    width:{ classNames: "col-6 left" },
    height:{ classNames: "col-6 right"},
    year:{ classNames: "col-6 left" },
    location:{ classNames: "col-6 right"},
    description: {
        "ui:widget": "textarea"
    }
}

export default class PhotoView extends Component {

    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Form className="menuButton"
                    schema={schema}
                    uiSchema={uiSchema}
                    children={
                        <div>
                            <button type="submit" className="form btn btn-info">Submit</button>
                            <button type="button" className="form btn btn-warning" onClick={this.onCancel}>Cancel</button>
                        </div>
                    }
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }


}*/