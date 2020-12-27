
import { Event, ADD_EVENT, GET_EVENTS, EventActionTypes } from './types';

export function addEvent(newEvent: Event): EventActionTypes {
  return {
    type: ADD_EVENT,
    payload: newEvent
  }
}

export function getEvents(): EventActionTypes {
  return {
    type: GET_EVENTS,
  }
}