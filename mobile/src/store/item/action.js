
import { ADD_ITEM, UPDATE_ITEM } from '../event/types';

export function addItem(newItem) {
  return {
    type: ADD_ITEM,
    payload: newItem
  }
}


export function updateItem(updatedItem) {
  return { 
    type: UPDATE_ITEM,
    payload: updatedItem
  }
}