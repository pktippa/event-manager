export const ADD_EVENT = 'ADD_EVENT';
export const GET_EVENTS = 'GET_EVENTS';

export interface Event {
  name: string;
  description: string;
}

export interface EventState {
  events: Event[];
}

interface AddEventAction {
  type: typeof ADD_EVENT;
  payload: Event;
}

interface GetAllEventsAction {
    type: typeof GET_EVENTS;
}

export type EventActionTypes = AddEventAction | GetAllEventsAction;
