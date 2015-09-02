/**
 * Created by roderickWang on 8/27/15.
 */

import binding from 'redux-2way-binding'
import Immutable from 'immutable'

let bindingStore=binding.bindingStore;

const initialState = Immutable.fromJS({

});

export default bindingStore('users',initialState, {

})
