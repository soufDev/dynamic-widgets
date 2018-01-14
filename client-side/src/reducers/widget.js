import {
  FETCH_WIDGET_REQUEST,
  FETCH_WIDGET_SUCCESS,
  FETCH_WIDGET_FAILURE,
  CREATE_WIDGET_REQUEST,
  CREATE_WIDGET_SUCCESS,
  CREATE_WIDGET_FAILURE,
  FETCH_ACTIVATED_WIDGET_REQUEST,
  FETCH_ACTIVATED_WIDGET_FAILURE,
  FETCH_ACTIVATED_WIDGET_SUCCESS,
  UPDATE_WIDGET_FAILURE,
  UPDATE_WIDGET_SUCCESS,
  UPDATE_WIDGET_REQUEST,
  DELETE_WIDGET_REQUEST,
  DELETE_WIDGET_FAILURE,
  DELETE_WIDGET_SUCCESS,
} from '../actions/widget';
import updateObjectInArray from '../utils/imutable';

export default function widget(
  state = {
    widgets: [],
  },
  action,
) {
  switch (action.type) {
    case FETCH_WIDGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_WIDGET_SUCCESS:
      return {
        ...state,
        widgets: [...action.widgets],
        isFetching: false,
        error: false,
      };
    case FETCH_WIDGET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case FETCH_ACTIVATED_WIDGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_ACTIVATED_WIDGET_SUCCESS:
      return {
        ...state,
        widgets: [...action.widgets],
        isFetching: false,
        error: false,
      };
    case FETCH_ACTIVATED_WIDGET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case CREATE_WIDGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        message: null,
      });
    case CREATE_WIDGET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: null,
        widgets: [...state.widgets, action.widget],
      };
    case CREATE_WIDGET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        error: true,
      });
    case UPDATE_WIDGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        message: null,
      });
    case UPDATE_WIDGET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        message: action.message,
      });
    case UPDATE_WIDGET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        message: null,
        widgets: updateObjectInArray(state.widgets, action.widget),
      });
    case DELETE_WIDGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        message: null,
      });
    case DELETE_WIDGET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        message: action.message,
      });
    case DELETE_WIDGET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        message: null,
      });
    default:
      return state;
  }
}
