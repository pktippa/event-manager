import { ADD_EVENT, EventActionTypes, EventState, GET_EVENTS } from './types';

const initialState: EventState = {
    events: []
}

const eventReducer = (state = initialState, action: EventActionTypes) => {
  switch (action.type) {
    case GET_EVENTS:
      return state.events;
    case ADD_EVENT:
      return { 
          ...state,
          events: [...state.events, action.payload]
      };
    default:
      return state;
  }
};

export default eventReducer;
