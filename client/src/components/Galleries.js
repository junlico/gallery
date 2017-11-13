import React, { Component } from 'react';
// import Form from 'react-jsonschema-form';
import axios from 'axios';
import ItemList from './ItemList';
import MenuButton from './MenuButton';
// import { groupBy, values } from 'underscore';
// import Item from './Item';
import '../style.css';



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


    editGallery(gallery_id) {

        this.setState({ loading: true });

        axios.put(this.props.api+'/'+gallery_id)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            })
        })
    }


    deleteGallery(gallery_id) {

        this.setState({ loading: true });

        axios.delete(this.props.api+'/'+gallery_id)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            })
        })
    };

    componentDidMount() {
        this.loadGalleries();
    }


    render() {
        return (
            <div>
                <MenuButton
                    onSubmit={this.createGallery}
                />
                <ItemList
                    view='galleries'
                    data={this.state.galleries}
                    loading={this.state.loading}
                    delete={this.deleteGallery}
                    edit={this.editGallery}
                />
            </div>
        )
    };
};