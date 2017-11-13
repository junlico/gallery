import React, { Component } from 'react';
import Form from "react-jsonschema-form";


export default class Item extends Component {

    constructor() {
        super()
        this.state = {
            data: {},
            formData: {},
            editToggle: false
        }

        this.editData = this.editData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.switchEditToggle = this.switchEditToggle.bind(this);
    }


    editData({formData}) {
        this.props.edit(this.state.data._id, {formData});
    }


    deleteData(event) {
        event.preventDefault();
        this.props.delete(this.state.data._id);
    }

    switchEditToggle(event) {
        event.preventDefault();
        // make a copy of data
        let formData = JSON.parse(JSON.stringify(this.state.data));
        delete formData['_id'];
        delete formData['__v'];
        delete formData['photos'];
        this.setState({
            editToggle: true,
            formData: formData
        })
    }


    onCancel(event) {
        event.preventDefault();
        this.setState({
            editToggle: false
        })
    }


    componentDidMount() {
        this.setState({
            data: this.props.data,
        })
    }

    render() {
        return (
            <div className="col-sm-6">
                <div className="card">
                    { !this.state.editToggle ?
                        <div className="card-body">
                            <h4 className="card-title"><a href={`/${this.props.view}/${this.state.data._id}`}>{this.state.data.name}</a></h4>
                            <p className="card-text"> {this.state.data.description}</p>
                            <button type="button" className="btn btn-primary" onClick={this.switchEditToggle}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={this.deleteData}>Del</button>
                        </div>
                        :
                        <div className="card-body">
                            <Form className="editForm"
                                schema={this.props.schema}
                                formData={this.state.formData}
                                children={
                                    <div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        <button type="button" className="btn btn-warning" onClick={this.onCancel}>Cancel</button>
                                    </div>
                                }
                                onSubmit={this.editData}
                                autocomplete="off"
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}