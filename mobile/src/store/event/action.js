
import { ADD_EVENT, GET_EVENTS } from './types';

export function addEvent(newEvent) {
  return {
    type: ADD_EVENT,
    payload: newEvent
  }
}

export function getEvents() {
  return {
    type: GET_EVENTS,
  }
}