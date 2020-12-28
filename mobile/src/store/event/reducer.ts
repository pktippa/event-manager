import { ADD_EVENT, ADD_ITEM, EventActionTypes, EventState, GET_EVENTS } from './types';

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
    case ADD_ITEM:
      let events = state.events;
      const {eventName, name, cost} = action.payload;
      let event = state.events.find(item => item.name === eventName);
      event?.items?.push({name, cost});
      return { 
        ...state,
        events,
      }
    default:
      return state;
  }
};

export default eventReducer;
