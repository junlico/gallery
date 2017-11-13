import React, { Component } from 'react';
import Form from "react-jsonschema-form";


export default class MenuButton extends Component {

    constructor() {
        super();

        this.state = {
            clicked: -1,
            formVisible: false,
            editToggle: false,
            formData: {}
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    clickHandler(event) {
        var nodes = Array.prototype.slice.call(event.currentTarget.children);
        var index = nodes.indexOf(event.target );
        if (index === 1) {
            let formData = JSON.parse(JSON.stringify(this.props.editTrigger()));
            console.log(formData);
            delete formData['_id'];
            delete formData['__v'];
            delete formData['thumbnail'];

            formData.artist_id = formData.artist_id._id;
            this.setState({formData: formData});

        }else if (index === 2) {
            this.props.delete();
        }
        this.setState({ clicked: index });
    }

    onSubmit({formData}) {
        if (this.state.clicked === 0) {
            this.props.create({formData});
        } else if (this.state.clicked === 1) {
            this.props.edit({formData});
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
                        formData={this.state.clicked === 1 ? this.state.formData : undefined}
                        onSubmit={this.onSubmit}
                    />
                }
            </div>
        )
    }
}