import React, { Component } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import MenuButton from './MenuButton';


const schema = {
    type: "object",
    required: ["name"],
    properties: {
        name: {type: "string", title: "Name"},
        description: {type: "string", title: "Description"}
    }
};


export default class Galleries extends Component {

    constructor() {
        super();
        this.state = {
            galleries: [],
            loading: false
        };
        this.loadGalleries = this.loadGalleries.bind(this);
        this.createGallery = this.createGallery.bind(this);
        this.deleteGallery = this.deleteGallery.bind(this);
        this.editGallery   = this.editGallery.bind(this);
    }


    loadGalleries() {

        this.setState({ loading: true });

        axios.get(this.props.api)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            });
        });
    };


    createGallery({formData}) {

        this.setState({ loading: true });

        axios.post(this.props.api, formData)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            });
        });
    };


    editGallery(gallery_id, {formData}) {

        this.setState({ loading: true });

        axios.put(this.props.api+'/'+gallery_id, formData)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            })
        });
    }


    deleteGallery(gallery_id) {

        this.setState({ loading: true });

        axios.delete(this.props.api+'/'+gallery_id)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            })
        });
    };

    componentDidMount() {
        this.loadGalleries();
    }


    render() {
        return (
            <div>
                <MenuButton
                    schema={schema}
                    buttonList={
                        [
                            {
                                buttonName: "Add Gallery",
                                buttonClass: "menu btn btn-info",
                            }
                        ]
                    }
                    create={this.createGallery}
                />

                <ItemList
                    view='galleries'
                    schema={schema}
                    data={this.state.galleries}
                    loading={this.state.loading}
                    delete={this.deleteGallery}
                    edit={this.editGallery}
                />
            </div>
        )
    };
};