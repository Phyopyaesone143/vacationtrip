import API from "./api";
import endpoints from "./endpoint";

export const tripList = () => API.get(endpoints.TRIP.LIST);
export const vacationList = () => API.get(endpoints.VACATION.LIST);
export const createBooking = (data) => API.post(endpoints.BOOKING.CREATE, data);