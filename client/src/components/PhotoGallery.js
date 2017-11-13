import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';


export default class PhotoGallery extends Component {

    constructor() {
        super();

        this.state = {
            photos: []
        };
    };

    render() {
        return (
            <div>
                {this.props.photos && this.props.photos.length > 0 &&
                    <ImageGallery
                    items={this.props.photos}
                    thumbnailPosition="left"
                    />
                }
            </div>
        );
    };
}