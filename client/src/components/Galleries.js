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
            addFormVisible: false,
            loading: false
        };
        this.loadGalleries = this.loadGalleries.bind(this);
        this.createGallery = this.createGallery.bind(this);
        this.deleteGallery = this.deleteGallery.bind(this);
        this.editGallery   = this.editGallery.bind(this);
        this.openAddForm   = this.openAddForm.bind(this);
        this.closeAddForm  = this.closeAddForm.bind(this);
    }


    loadGalleries() {

        this.setState({ loading: true });

        axios.get(this.props.api+this.props.location.pathname)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            });
        });
    };


    createGallery({formData}) {

        this.setState({ loading: true });

        axios.post(this.props.api+this.props.location.pathname, formData)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            });
        });
    };


    editGallery(gallery_id, {formData}) {

        this.setState({ loading: true });

        axios.put(this.props.api+this.props.location.pathname+'/'+gallery_id, formData)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            });
        });
    }


    deleteGallery(gallery_id) {

        this.setState({ loading: true });

        axios.delete(this.props.api+this.props.location.pathname+'/'+gallery_id)
        .then(res => {
            this.setState({
                galleries: res.data,
                loading: false
            });
        });
    };

    openAddForm(event) {
        event.preventDefault();
        this.setState({ addFormVisible: true });
    }

    closeAddForm(event) {
        this.setState({ addFormVisible: false });
    }

    componentDidMount() {
        this.loadGalleries();
    }


    render() {
        // console.log(this.props)
        return (
            <div>
                <MenuButton
                    schema={schema}
                    buttonList={[{ buttonName: "Add Gallery", buttonClass: "menu btn btn-info", buttonType: 0 }]}
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