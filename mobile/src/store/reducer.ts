import { combineReducers } from 'redux';
import eventReducer from './event/reducer';
const rootReducer= combineReducers({
    event: eventReducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;