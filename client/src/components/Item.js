import React, { Component } from 'react';
// import '../style.css';

export default class Item extends Component {
    constructor() {
        super()

    }



    render() {
        // console.log(this.props)
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><a href={`/galleries/${this.props.data._id}`}>{this.props.data.name}</a></h4>
                        <p className="card-text"> {this.props.data.description}</p>
                        <button type="button" className="btn btn-primary" onClick={this.onClick}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={this.onClick}>Del</button>
                    </div>
                </div>
            </div>
        )
    }
}