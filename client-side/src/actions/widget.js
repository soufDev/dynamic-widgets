import axios from 'axios';
import { WIDGET_PATH } from '../utils/constUrls';

export const FETCH_WIDGET_REQUEST = 'FETCH_WIDGET_REQUEST';
export const FETCH_WIDGET_SUCCESS = 'FETCH_WIDGET_SUCCESS';
export const FETCH_WIDGET_FAILURE = 'FETCH_WIDGET_FAILURE';

const fetchRequest = () => ({
  type: FETCH_WIDGET_REQUEST,
  isFetching: true,
});

const fetchSuccess = widgets => ({
  type: FETCH_WIDGET_SUCCESS,
  isFetching: false,
  widgets,
});

const fetchFailure = message => ({
  type: FETCH_WIDGET_FAILURE,
  isFetching: false,
  message,
});

export function fetchAll() {
  return (dispatcher) => {
    dispatcher(fetchRequest());
    axios({
      url: `${WIDGET_PATH}/widgets`,
      method: 'GET',
      responseType: 'json',
    })
      .then((response) => {
        dispatcher(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatcher(fetchFailure(error.message));
        return error;
      });
  };
}

export const CREATE_WIDGET_REQUEST = 'CREATE_WIDGET_REQUEST';
export const CREATE_WIDGET_SUCCESS = 'CREATE_WIDGET_SUCCESS';
export const CREATE_WIDGET_FAILURE = 'CREATE_WIDGET_FAILURE';

const createRequest = () => ({
  type: CREATE_WIDGET_REQUEST,
  isFetching: true,
});

const createSuccess = widget => ({
  type: CREATE_WIDGET_SUCCESS,
  isFetching: false,
  widget,
});

const createFailure = message => ({
  type: CREATE_WIDGET_FAILURE,
  isFetching: false,
  message,
});

export function createWidget(widget) {
  return (dispatcher) => {
    createRequest();
    return axios({
      url: `${WIDGET_PATH}/widget`,
      method: 'POST',
      responseType: 'json',
      data: widget,
    })
      .then(response => dispatcher(createSuccess(response.data)))
      .catch((error, reject) => {
        dispatcher(createFailure(error));
        reject(error);
      });
  };
}

export const FETCH_ACTIVATED_WIDGET_REQUEST = 'FETCH_ACTIVATED_WIDGET_REQUEST';
export const FETCH_ACTIVATED_WIDGET_SUCCESS = 'FETCH_ACTIVATED_WIDGET_SUCCESS';
export const FETCH_ACTIVATED_WIDGET_FAILURE = 'FETCH_ACTIVATED_WIDGET_FAILURE';

const fetchActivatedRequest = () => ({
  type: FETCH_ACTIVATED_WIDGET_REQUEST,
  isFetching: true,
});

const fetchActivatedSuccess = widgets => ({
  type: FETCH_ACTIVATED_WIDGET_SUCCESS,
  isFetching: false,
  widgets,
});

const fetchActivatedFailure = message => ({
  type: FETCH_ACTIVATED_WIDGET_FAILURE,
  isFetching: false,
  message,
});

export function fetchAllActivated() {
  return (dispatcher) => {
    dispatcher(fetchActivatedRequest());
    axios({
      url: `${WIDGET_PATH}/activated/widgets`,
      method: 'GET',
      responseType: 'json',
    })
      .then((response) => {
        dispatcher(fetchActivatedSuccess(response.data));
      })
      .catch((error) => {
        dispatcher(fetchActivatedFailure(error.message));
        return error;
      });
  };
}

export const UPDATE_WIDGET_REQUEST = 'UPDATE_WIDGET_REQUEST';
export const UPDATE_WIDGET_SUCCESS = 'UPDATE_WIDGET_SUCCESS';
export const UPDATE_WIDGET_FAILURE = 'UPDATE_WIDGET_FAILURE';

const updateRequest = () => ({
  type: UPDATE_WIDGET_REQUEST,
  isFetching: true,
});

const updateSuccess = widget => ({
  type: UPDATE_WIDGET_SUCCESS,
  isFetching: false,
  widget,
});

const updateFailure = message => ({
  type: UPDATE_WIDGET_FAILURE,
  isFetching: false,
  message,
});

export function updateWidget(widget) {
  return (dispatcher) => {
    updateRequest();
    return axios({
      url: `${WIDGET_PATH}/widget`,
      method: 'PUT',
      responseType: 'json',
      data: widget,
    })
      .then(response => dispatcher(updateSuccess(response.data)))
      .catch((error, reject) => {
        dispatcher(updateFailure(error));
        reject(error);
      });
  };
}
