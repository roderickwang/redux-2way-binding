import { combineReducers } from 'redux';


import users from './users.js'

//handlers['BINDING_UPDATE']= (data, action) => {
//    return data.setIn(action.path,action.value);
//};

export default combineReducers({
    users
});



