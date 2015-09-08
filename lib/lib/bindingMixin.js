'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (DecoratedComponent) {

    /**
     * Two ways binding func.
     * @param path
     * @param value
     * @returns {{value: (any|*), requestChange: Function}}
     */
    DecoratedComponent.prototype.binding = function (path, transValueFunc) {
        var reducerPath = this.bindingOrigin.reducerPath;
        var dispatch = this.props.dispatch;

        var reducerPathArray = reducerPath.split(',');
        var reducerName = reducerPathArray[reducerPathArray.length - 1];

        var store = this.props[reducerName];
        var topicName = reducerPathArray.shift();
        var readPath = path.split(',');
        var pathArray = reducerPathArray.concat(readPath);
        var value = store.getIn(readPath);

        if (transValueFunc) {
            value = transValueFunc(value);
        }

        var valueLink = {
            //path string like 'a.b.0'
            value: value,
            requestChange: function requestChange(newValue) {
                dispatch({ type: topicName + '_BINDING_UPDATE', path: pathArray, value: newValue });
            }
        };

        return valueLink;
    };

    /**
     * Two ways binding setStore first
     * @param store
     */
    DecoratedComponent.prototype.setBinding = function (reducerPath) {
        this.bindingOrigin = {
            reducerPath: reducerPath
        };
    };

    /**
     * manual change value by path,newValue or a cover function
     * @param path
     * @param newValue
     */
    DecoratedComponent.prototype.manualChange = function (path, newValue) {

        var reducerName = undefined,
            store = undefined;

        var reducerPath = this.bindingOrigin.reducerPath;

        var reducerPathArray = reducerPath.split(',');
        var dispatch = this.props.dispatch;

        if (typeof newValue === "function") {
            reducerName = reducerPathArray[reducerPathArray.length - 1];
            store = this.props[reducerName];
        }

        var topicName = reducerPathArray.shift();
        var pathArray = reducerPathArray.concat(path.split(','));

        if (typeof newValue === "function") {
            var value = store.getIn(pathArray);
            var alterValue = newValue(value);
            dispatch({ type: topicName + '_BINDING_UPDATE', path: pathArray, value: alterValue });
            return;
        }

        dispatch({ type: topicName + '_BINDING_UPDATE', path: pathArray, value: newValue });
    };
};

module.exports = exports['default'];