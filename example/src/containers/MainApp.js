/**
 * Created by roderickWang on 8/13/15.
 */

import {Component ,PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react/addons'

@connect(state => ({
    users:state.users
}))

export default class MainApp extends Component {

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    render() {
        const {dispatch} = this.props;
        return (
            <div>
                {this.renderChild(this.props.children)}
            </div>
        )
    }

    renderChild(child) {
        return React.addons.cloneWithProps(child, this.props);
    }

}
