import React, { Component } from 'react';
import Form from "react-jsonschema-form";


export default class MenuButton extends Component {

    constructor() {
        super()

        this.state = {
            formVisible: false
        }
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.setState({
            formVisible: !this.state.formVisible
        });
    }

    onSubmit({formData}) {
        this.setState({formVisible: false});
        this.props.button.onSubmit({formData});
    }

    onCancel(event) {
        event.preventDefault();
        this.setState({ formVisible: false });
    }

    render() {

        return (
            <div>
                <button type="button" className="menu btn btn-info" onClick={this.onClick}>{this.props.button.buttonName}</button>
                {this.state.formVisible &&
                    <Form className="menuButton"
                        schema={this.props.schema}
                        children={
                            <div>
                                <button type="submit" className="form btn btn-info">Submit</button>
                                <button type="button" className="form btn btn-warning" onClick={this.onCancel}>Cancel</button>
                            </div>
                        }
                        onSubmit={this.onSubmit}
                        autocomplete="off"
                    />
                }
            </div>
        )
    }
}