## redux-2ways-binding
Build two ways binding with Redux and Immutable.

[Redux](https://github.com/rackt/redux) is a predictable state container for JavaScript apps.
[Immutable](https://github.com/hughfdjackson/immutable) neatly packages immutable equivalents to JavaScript's Objects and Arrays.

Get Started
===============

Three step to set 2-ways binding:
1.createReducer:
----------------

    import binding from 'redux-2ways-binding'
    import Immutable from 'immutable'
    
    let bindingStore=binding.bindingStore;
    
    const initialState = Immutable.fromJS({
    
    });
    
    export default bindingStore('users',initialState, {
    
    })
    
2.setStore:
-------------

    import binding from 'redux-2ways-binding'
    
    let bindingMixin = binding.bindingMixin;
    
    @bindingMixin
    export default class UserManager extends Component {
        constructor(props) {
            super(props);
            this.setBinding('users');
        }
    }

3.binding:
-----------

    render() {
            const {users}=this.props;
    
            return (
                <div>
                    <div>
                        <p>Name:<input type='text' valueLink={this.binding('name')}/></p>
                        <p>Age:<input type='number' valueLink={this.binding('age')}/></p>
                        <p>Sex:
                            <select valueLink={this.binding('sex')}>
                                <option value='male'>male</option>
                                <option value='female'>female</option>
                            </select>
                        </p>
                    </div>
    
                    <div>
                        <p> Name:{users.get('name')}</p>
                        <p> Age:{users.get('age')}</p>
                        <p> Sex:{users.get('sex')}</p>
    
                    </div>
                </div>
            )
        }
        
Usage
==========

    npm install redux-2ways-binding
    
Notice
==========

The component will be used to binding must have 2 props.
One is dispatch which is created by redux.
Another is the store which to be set in "this.setBinding('users');".
     