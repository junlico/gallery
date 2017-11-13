import React, { Component } from 'react';

export default class Item extends Component {

    constructor() {
        super()
        this.state = {
            data: {}
        }

        this.deleteData = this.deleteData.bind(this);
    }

    deleteData(event) {
        event.preventDefault();
        this.props.delete(this.state.data._id);
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }

    render() {

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><a href={`/${this.props.view}/${this.state.data._id}`}>{this.state.data.name}</a></h4>
                        <p className="card-text"> {this.state.data.description}</p>
                        <button type="button" className="btn btn-primary" onClick={this.onClick}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteData}>Del</button>
                    </div>
                </div>
            </div>
        )
    }
}