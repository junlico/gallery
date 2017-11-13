import React, { Component } from 'react';

export default class Item extends Component {

    constructor() {
        super()
        this.state = {
            data: {},
            editToggle: false
        }

        this.deleteData = this.deleteData.bind(this);
        this.editData = this.editData.bind(this);
    }

    deleteData(event) {
        event.preventDefault();
        this.props.delete(this.state.data._id);
    }

    editData(event) {
        event.preventDefault();
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }

    render() {
        console.log(this.state.data)
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><a href={`/${this.props.view}/${this.state.data._id}`}>{this.state.data.name}</a></h4>
                        <p className="card-text"> {this.state.data.description}</p>
                        <button type="button" className="btn btn-primary" onClick={this.editData}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteData}>Del</button>

                        {/*<input type="text" name='name' defaultValue={this.state.data.name} onChange={this.onChange}/> <br/>
                        <input type="text" name='description' defaultValue={this.state.data.description} onChange={this.onChange}/><br/>
                        <button type='button' className='btn btn-warning' onClick={this.editGallery}>Cancel</button>
                        <button type='button' className='btn btn-success' onClick={this.editGallery} style={{marginLeft: 20+'px'}}>Done</button>
                        <button type='button' className='btn btn-danger' onClick={this.removeGallery} style={{marginLeft: 20+'px'}}>Del</button> */}
                    </div>
                </div>
            </div>
        )
    }
}