import {combineReducers} from 'redux';
import user from './user_reducer';
//import comment from './comment_reducer';

// root에서 reducer를 하나로 해준다
const rootReducer = combineReducers({
    user
})

export default rootReducer