import { ADD_EVENT, ADD_ITEM, EventActionTypes, EventState, GET_EVENTS, UPDATE_ITEM } from './types';

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
      let aEvents = state.events;
      const {eventName: aEvName, name: aName, cost: aCost} = action.payload;
      let aEvent = state.events.find(item => item.name === aEvName);
      aEvent?.items?.push({name: aName, cost: aCost});
      return { 
        ...state,
        events: aEvents,
      }
    case UPDATE_ITEM:
      let events = state.events;
      const {eventName, name, cost} = action.payload;
      let event = state.events.find(item => item.name === eventName);
      const item = event?.items?.find(i => i.name === name);
      item!.cost = cost;
      return { 
        ...state,
        events,
      }
    default:
      return state;
  }
};

export default eventReducer;
