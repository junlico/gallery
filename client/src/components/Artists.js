import React, { Component } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import ButtonList from './ButtonList';


const schema = {
    type: "object",
    required: ["name"],
    properties: {
        name: {type: "string", title: "Name"},
        birth_year: {type: "number", title: "Birth Year"},
        country: {type: "string", title: "Country"},
        description: {type: "string", title: "Description"}
    }
};


export default class Artists extends Component {

    constructor() {
        super();
        this.state = {
            artists: [],
            loading: false
        };
        this.loadArtists = this.loadArtists.bind(this);
        this.createArtist = this.createArtist.bind(this);
        this.deleteArtist = this.deleteArtist.bind(this);
        this.editArtist   = this.editArtist.bind(this);
    }


    loadArtists() {

        this.setState({ loading: true });

        axios.get(this.props.api)
        .then(res => {
            this.setState({
                artists: res.data,
                loading: false
            });
        });
    };


    createArtist({formData}) {

        this.setState({ loading: true });

        axios.post(this.props.api, formData)
        .then(res => {
            this.setState({
                artists: res.data,
                loading: false
            });
        });
    };


    editArtist(gallery_id, {formData}) {

        this.setState({ loading: true });

        axios.put(this.props.api+'/'+gallery_id, formData)
        .then(res => {
            this.setState({
                artists: res.data,
                loading: false
            })
        })
    }


    deleteArtist(gallery_id) {

        this.setState({ loading: true });

        axios.delete(this.props.api+'/'+gallery_id)
        .then(res => {
            this.setState({
                artists: res.data,
                loading: false
            })
        })
    };

    componentDidMount() {
        this.loadArtists();
    }


    render() {
        return (
            <div>
                <ButtonList
                    schema={schema}
                    buttonList={
                        [
                            {
                                buttonName: "Add Artist",
                                onSubmit: this.createArtist
                            }
                        ]
                    }
                />
                <ItemList
                    view='artists'
                    schema={schema}
                    data={this.state.artists}
                    loading={this.state.loading}
                    delete={this.deleteArtist}
                    edit={this.editArtist}
                />
            </div>
        )
    };
};