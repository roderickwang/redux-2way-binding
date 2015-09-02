/**
 * Created by roderickWang on 7/31/15.
 */


export default function bindingStore(reducerName, initialState, handlers) {
    handlers[reducerName + '_BINDING_UPDATE'] = (data, action) => {
        return data.setIn(action.path, action.value);
    };


    return (state = initialState, action) => {
        state = handlers[action.type] ?
            handlers[action.type](state, action) :
            state;
        return state;
    }
}