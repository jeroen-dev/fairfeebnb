import axiosService from 'services/AxiosService';
import { extractApiErrors, deleteResource } from './index';
const { houseshareAxios } = axiosService;

export const createBooking = (booking) => {
  return houseshareAxios
    .post('/bookings', booking)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
};

export const getBookings = (rentalId) => {
  return houseshareAxios
    .get(`/bookings?rental=${rentalId}`)
    .then((res) => res.data);
};

export const fetchUserBookings = () => (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-bookings' });
  return houseshareAxios
    .get('/bookings/me')
    .then((res) => res.data)
    .then((bookings) => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: bookings,
        resource: 'manage-bookings',
      });
    });
};

export const fetchReceivedBookings = () => (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'received-bookings' });
  return houseshareAxios
    .get('/bookings/received')
    .then((res) => res.data)
    .then((bookings) => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: bookings,
        resource: 'received-bookings',
      });
    });
};

export const deleteBooking = (bookingId) => (dispatch) => {
  return dispatch(
    deleteResource({
      url: `/bookings/${bookingId}`,
      resource: 'manage-bookings',
    })
  );
};
