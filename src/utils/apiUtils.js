import { log, errorLog } from './commonUtils';

const handleRequest = request =>
  request
    .then(
      res => res.data, // Successful response
    )
    .catch(error => {
      if (error.response) {
        // Axios API Error Response
      } else if (error.message || error.config) {
        // Network Error Case
      }

      if (error.message === 'canceled') {
        // Handle cancellation gracefully
      } else if (error.response) {
        // Request was made and server responded with an error status
        // Handle different HTTP error statuses (4xx, 5xx) as needed
      } else if (error.request) {
        // Request was made but no response was received
        // Handle network-related errors
      } else {
        // Something else happened
        // Handle unexpected errors
      }
      throw error; // Rethrow the error for further handling
    });

const addRequestInterceptor = ({ axiosInstance }) => {
  axiosInstance.interceptors.request.use(
    request => {
      log('Starting request -> ', request);
      const newRequest = { ...request };
      newRequest.metadata = { startTime: new Date() };
      return newRequest;
    },
    error => {
      errorLog('Request returned with error -> ', error);
      throw error;
    },
  );
};

const addResponseInterceptor = ({ axiosInstance }) => {
  axiosInstance.interceptors.response.use(
    response => {
      log('Returning response -> ', response);
      const newResponse = { ...response };
      newResponse.config.metadata.endTime = new Date();
      newResponse.responseTime =
        newResponse.config.metadata.endTime -
        newResponse.config.metadata.startTime;
      return newResponse;
    },
    error => {
      const newError = { ...error };
      newError.config.metadata.endTime = new Date();
      newError.responseTime =
        newError.config.metadata.endTime - newError.config.metadata.startTime;
      errorLog('Response returned with error -> ', newError);
      throw newError;
    },
  );
};

export { handleRequest, addRequestInterceptor, addResponseInterceptor };
