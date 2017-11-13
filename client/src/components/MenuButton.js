import React, { Component } from 'react';
import Form from "react-jsonschema-form";


export default class MenuButton extends Component {

    constructor() {
        super();

        this.state = {
            clicked: -1,
            formVisible: false,
            editTrigger: false
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    clickHandler(event) {
        var nodes = Array.prototype.slice.call(event.currentTarget.children);
        var index = nodes.indexOf(event.target );
        this.setState({ clicked: index });
    }

    onSubmit({formData}) {
        if (this.state.clicked === 0) {
            this.props.create({formData});
        } else if (this.state.clicked === 1) {
            // this.props.edit
        }
        this.setState({ clicked: -1 });
    }

    onCancel(event) {
        event.preventDefault();
        this.setState({
            clicked: -1
        });
    }

    render() {
        return (
            <div>
                <div onClick={this.clickHandler}>
                {this.props.buttonList.map((item, i) => {
                    return <button key={i} type="button" className={item.buttonClass}>{item.buttonName}</button>
                })}
                </div>
                {(this.state.clicked === 0 || this.state.clicked === 1) &&
                    <Form className="menuButton"
                        autocomplete="off"
                        schema={this.props.schema}
                        children={
                            <div>
                                <button type="submit" className="form btn btn-info">Submit</button>
                                <button type="button" className="form btn btn-warning" onClick={this.onCancel}>Cancel</button>
                            </div>
                        }
                        onSubmit={this.onSubmit}
                    />
                }
            </div>
        )
    }
}