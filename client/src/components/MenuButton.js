import React, { Component } from 'react';
import Form from "react-jsonschema-form";
// import default from 'axios';
// import Modal from 'react-modal';

/*
export default class MenuButton extends Component {

    constructor() {
        super();

        this.state = {
            clicked: -1,
            formVisible: false,
            modalVisible: false,
            detailVisible: false,
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    clickHandler(event) {
        var nodes = Array.prototype.slice.call(event.currentTarget.children);
        var index = nodes.indexOf(event.target);

        if (index === 1) {
            let photoInfo = JSON.parse(JSON.stringify(this.props.photoInfo()));
            delete photoInfo['_id'];
            delete photoInfo['__v'];
            delete photoInfo['thumbnail'];
            photoInfo.artist_id = photoInfo.artist_id._id;
            this.setState({
                modalVisible: true,
                photoInfo: photoInfo
            });
        } else if (index === 2) {
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
            clicked: -1,
            modalVisible: false
        });
    }

    render() {

        if (this.state.photoInfo) {
            console.log(this.state.photoInfo.title)
        } else {
            console.log("no")
        }
        return (
            <div>
                <div onClick={this.clickHandler}>
                    {this.props.buttonList.map((item, i) => {
                        return <button key={i} type="button" className={item.buttonClass}>{item.buttonName}</button>
                    })}
                </div>


                {this.state.clicked === 0 &&
                    <Form className="menuButton"
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

                <Modal
                    isOpen={this.state.modalVisible}
                    onRequestClose={this.onCancel}
                >
                    {this.state.photoInfo && this.state.detailVisible &&
                    <div className="card">
                        <div className="inModal card-body">
                            <h4 className="card-title">{this.state.photoInfo.title}</h4>
                            <p className="card-text"> TEST</p>
                            <button type="button" className="btn btn-primary" onClick={this.switchEditToggle}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={this.deleteData}>Del</button>
                        </div>
                    </div>
                    }


                    <Form className="menuButton"
                        schema={this.props.schema}
                        children={
                            <div>
                                <button type="submit" className="form btn btn-info">Submit</button>
                                <button type="button" className="form btn btn-warning" onClick={this.onCancel}>Cancel</button>
                            </div>
                        }
                        formData={this.state.clicked === 1 ? this.state.photoInfo : undefined}
                        onSubmit={this.onSubmit}
                    />


                </Modal>
            </div>
        )
    }
}
*/

export default class MenuButton extends Component {
    constructor() {
        super();

        this.state = {
            addFormVisible: false,
            showDetails: false,
            currentButtonType: -1,
            uiSchema: {}
        };

        this.buttonHandler = this.buttonHandler.bind(this);
        this.openAddForm = this.openAddForm.bind(this);
        this.openDetailForm = this.openDetailForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    buttonHandler(buttonType, event) {
        event.preventDefault();
        this.setState({currentButtonType: buttonType});
        switch(buttonType) {
            case 0:
                return this.openAddForm();
                break;
            case 1:
                return this.openDetailForm();
                break;
            case 2:
                return this.props.delete();
                break;
            default:
                return this.openAddForm();

        }
    }

    openAddForm() {
        this.setState({ addFormVisible: true });
    }

    openDetailForm() {
        let photoInfo = JSON.parse(JSON.stringify(this.props.photoInfo()));
        delete photoInfo['_id'];
        delete photoInfo['__v'];
        delete photoInfo['thumbnail'];
        photoInfo.artist_id = photoInfo.artist_id._id;

        this.setState({
            addFormVisible: true,
            photoInfo: photoInfo
        })
    }

    closeForm() {
        this.setState({ addFormVisible: false });
    }

    onSubmit({formData}) {
        if (this.state.currentButtonType === 0) {
            this.closeForm();
            this.props.create({formData});
        } else if (this.state.currentButtonType === 1) {
            this.props.eddit({formData});
            this.closeForm();
        }
    }

    render() {

        return (
            <div className="MenuButton">
                {this.props.buttonList.map((item, i) => {
                    return <button key={i} type="button" className={item.buttonClass} onClick={(event) => this.buttonHandler(item.buttonType, event)}>{item.buttonName}</button>
                })}

                {this.state.addFormVisible &&
                    <Form className="menuButton"
                        schema={this.props.schema}
                        uiSchema={this.props.uiSchema ? this.props.uiSchema : undefined}
                        formData={this.state.currentButtonType === 1 ? this.state.photoInfo : undefined}
                        children={
                            <div>
                                <button type="submit" className="form btn btn-info">Submit</button>
                                <button type="button" className="form btn btn-warning" onClick={this.closeForm}>Cancel</button>
                            </div>
                        }
                        onSubmit={this.onSubmit}
                    />
                }
            </div>
        )
    }
}