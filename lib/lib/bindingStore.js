/**
 * Created by roderickWang on 7/31/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = bindingStore;

function bindingStore(reducerName, initialState, handlers) {
    handlers[reducerName + '_BINDING_UPDATE'] = function (data, action) {
        return data.setIn(action.path, action.value);
    };

    return function (state, action) {
        if (state === undefined) state = initialState;

        state = handlers[action.type] ? handlers[action.type](state, action) : state;
        return state;
    };
}

module.exports = exports['default'];