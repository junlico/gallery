import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NavLink extends Component {
    render() {
        var pathname = this.context.router.route.location.pathname;
        var root = '/' + pathname.split('/')[1];
        var className = (root === this.props.to) ? 'nav-link active' : 'nav-link';
        return(
            <div>
                <Link className={className} {...this.props}>
                    {this.props.children}
                </Link>
            </div>

        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};
