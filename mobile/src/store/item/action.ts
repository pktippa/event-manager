
import { Item, ADD_ITEM, ItemWithEventName, EventActionTypes, UPDATE_ITEM } from '../event/types';

export function addItem(newItem: ItemWithEventName): EventActionTypes {
  return {
    type: ADD_ITEM,
    payload: newItem
  }
}


export function updateItem(updatedItem: ItemWithEventName): EventActionTypes {
  return { 
    type: UPDATE_ITEM,
    payload: updatedItem
  }
}