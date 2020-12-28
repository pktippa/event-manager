export const ADD_EVENT = 'ADD_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_ITEM = 'ADD_ITEM';

export interface Item {
  name: string;
  cost: number;
}

export interface ItemWithEventName extends Item {
  eventName: string;
}
export interface Event {
  name: string;
  description: string;
  items?: Item[];
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

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: ItemWithEventName;
}

export type EventActionTypes = AddEventAction | GetAllEventsAction | AddItemAction;
