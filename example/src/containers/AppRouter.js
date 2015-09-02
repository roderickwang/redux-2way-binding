import React, { Component ,PropTypes} from 'react';
import {compose,createStore ,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { Redirect, Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';
import MainApp from './MainApp'
import reducers from '../reducers';
import UserManager  from '../components/UserManager'
import thunk from 'redux-thunk';

import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const finalCreateStore = compose(
    // Enables your middleware:
    applyMiddleware(thunk),
    // Provides support for DevTools:
    //devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
);

const store = finalCreateStore(reducers);

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.history = new HashHistory();
    }

    /**
     * 页面路由总览，
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Provider store={store}>
                    {()=>
                        <Router history={this.history}>
                            <Route component={MainApp}>
                                <Route path="user" component={UserManager}/>
                                <Redirect from="/" to="user"/>
                            </Route>
                        </Router>
                    }
                </Provider>
            </div>
        );
    }
}







